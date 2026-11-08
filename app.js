
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();

const PORT = process.env.PORT || 3000;

// IMPORTANT: Middleware must be before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;

// Initialize database and server
const initializeDBAndServer = async () => {
  try {
    // Connect to database
    db = await open({
      filename: "./books.db",
      driver: sqlite3.Database
    });

    console.log("Database connected successfully");

    // Create table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price REAL NOT NULL
      )
    `);

    console.log("Book table created successfully");

    // Insert initial 10 books if table is empty
    const result = await db.get(
      "SELECT COUNT(*) AS count FROM book"
    );

    if (result.count === 0) {
      await db.run(`
        INSERT INTO book (title, author, price)
        VALUES
        ('Harry Potter', 'J.K. Rowling', 500),
        ('The Alchemist', 'Paulo Coelho', 350),
        ('Wings of Fire', 'A.P.J. Abdul Kalam', 250),
        ('Atomic Habits', 'James Clear', 450),
        ('Rich Dad Poor Dad', 'Robert Kiyosaki', 400),
        ('The Hobbit', 'J.R.R. Tolkien', 550),
        ('Ikigai', 'Hector Garcia', 300),
        ('Think and Grow Rich', 'Napoleon Hill', 350),
        ('The Psychology of Money', 'Morgan Housel', 450),
        ('Deep Work', 'Cal Newport', 400)
      `);

      console.log("10 books inserted successfully");
    }

    // GET all books with query parameters
    app.get("/books/", async (request, response) => {
      try {
        const {
          search_q = "",
          order_by = "id",
          order = "ASC",
          limit = "10",
          offset = "0",
          min_price,
          max_price
        } = request.query;

        // Validate sorting column
        const allowedColumns = [
          "id",
          "title",
          "author",
          "price"
        ];

        const column = allowedColumns.includes(order_by)
          ? order_by
          : "id";

        // Validate sorting order
        const sortOrder =
          order.toUpperCase() === "DESC" ? "DESC" : "ASC";

        // Validate limit and offset
        const bookLimit = Number(limit);
        const bookOffset = Number(offset);

        if (
          !Number.isInteger(bookLimit) ||
          bookLimit <= 0 ||
          !Number.isInteger(bookOffset) ||
          bookOffset < 0
        ) {
          return response.status(400).json({
            message: "Invalid limit or offset"
          });
        }

        let query = "SELECT * FROM book WHERE 1 = 1";

        const values = [];

        // Search books by title
        if (search_q.trim() !== "") {
          query += " AND title LIKE ?";
          values.push(`%${search_q}%`);
        }

        // Minimum price
        if (min_price !== undefined) {
          const minimum = Number(min_price);

          if (!Number.isFinite(minimum)) {
            return response.status(400).json({
              message: "min_price must be a valid number"
            });
          }

          query += " AND price >= ?";
          values.push(minimum);
        }

        // Maximum price
        if (max_price !== undefined) {
          const maximum = Number(max_price);

          if (!Number.isFinite(maximum)) {
            return response.status(400).json({
              message: "max_price must be a valid number"
            });
          }

          query += " AND price <= ?";
          values.push(maximum);
        }

        // Sorting
        query += ` ORDER BY ${column} ${sortOrder}`;

        // Pagination
        query += " LIMIT ? OFFSET ?";

        values.push(bookLimit, bookOffset);

        const books = await db.all(query, values);

        return response.status(200).json(books);

      } catch (error) {
        console.log("GET BOOKS ERROR:", error.message);

        return response.status(500).json({
          message: "Internal Server Error"
        });
      }
    });

    // GET book by ID
    app.get("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;

        const book = await db.get(
          "SELECT * FROM book WHERE id = ?",
          [bookId]
        );

        if (book === undefined) {
          return response.status(404).json({
            message: "Book not found"
          });
        }

        return response.status(200).json(book);

      } catch (error) {
        console.log("GET BOOK BY ID ERROR:", error.message);

        return response.status(500).json({
          message: "Internal Server Error"
        });
      }
    });

    // POST add new book
    app.post("/books/", async (request, response) => {
      try {
        // Log request body for debugging
        console.log("POST BODY:", request.body);

        // Safely handle missing request body
        const body = request.body || {};

        const title = body.title;
        const author = body.author;
        const price = body.price;

        // Check required fields
        if (
          title === undefined ||
          author === undefined ||
          price === undefined
        ) {
          return response.status(400).json({
            message: "Title, author and price are required"
          });
        }

        // Validate title and author
        if (
          typeof title !== "string" ||
          title.trim() === "" ||
          typeof author !== "string" ||
          author.trim() === ""
        ) {
          return response.status(400).json({
            message: "Title and author must be valid strings"
          });
        }

        // Validate price
        if (
          typeof price !== "number" ||
          !Number.isFinite(price) ||
          price < 0
        ) {
          return response.status(400).json({
            message: "Price must be a valid non-negative number"
          });
        }

        // Insert book into database
        const result = await db.run(
          `INSERT INTO book (title, author, price)
           VALUES (?, ?, ?)`,
          [title.trim(), author.trim(), price]
        );

        return response.status(201).json({
          message: "Book added successfully",
          bookId: result.lastID
        });

      } catch (error) {
        console.log("POST BOOK ERROR:", error.message);

        return response.status(500).json({
          message: "Internal Server Error"
        });
      }
    });

    // PUT update existing book
    app.put("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;

        const body = request.body || {};

        const title = body.title;
        const author = body.author;
        const price = body.price;

        // Check required fields
        if (
          title === undefined ||
          author === undefined ||
          price === undefined
        ) {
          return response.status(400).json({
            message: "Title, author and price are required"
          });
        }

        // Validate title and author
        if (
          typeof title !== "string" ||
          title.trim() === "" ||
          typeof author !== "string" ||
          author.trim() === ""
        ) {
          return response.status(400).json({
            message: "Title and author must be valid strings"
          });
        }

        // Validate price
        if (
          typeof price !== "number" ||
          !Number.isFinite(price) ||
          price < 0
        ) {
          return response.status(400).json({
            message: "Price must be a valid non-negative number"
          });
        }

        // Check book exists
        const existingBook = await db.get(
          "SELECT * FROM book WHERE id = ?",
          [bookId]
        );

        if (existingBook === undefined) {
          return response.status(404).json({
            message: "Book not found"
          });
        }

        // Update book
        await db.run(
          `UPDATE book
           SET title = ?, author = ?, price = ?
           WHERE id = ?`,
          [title.trim(), author.trim(), price, bookId]
        );

        return response.status(200).json({
          message: "Book updated successfully"
        });

      } catch (error) {
        console.log("PUT BOOK ERROR:", error.message);

        return response.status(500).json({
          message: "Internal Server Error"
        });
      }
    });

    // DELETE book
    app.delete("/books/:bookId/", async (request, response) => {
      try {
        const { bookId } = request.params;

        // Check book exists
        const existingBook = await db.get(
          "SELECT * FROM book WHERE id = ?",
          [bookId]
        );

        if (existingBook === undefined) {
          return response.status(404).json({
            message: "Book not found"
          });
        }

        // Delete book
        await db.run(
          "DELETE FROM book WHERE id = ?",
          [bookId]
        );

        return response.status(200).json({
          message: "Book deleted successfully"
        });

      } catch (error) {
        console.log("DELETE BOOK ERROR:", error.message);

        return response.status(500).json({
          message: "Internal Server Error"
        });
      }
    });

    // Start server
    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.log(
      "DATABASE INITIALIZATION ERROR:",
      error.message
    );
  }
};

// Start application
initializeDBAndServer();

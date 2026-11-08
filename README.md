# 📚 Books REST API – Backend Lab 3

**Student Name:** Bolla Pradhyumna  
Registration Number : 252U1R5027
Section: 106, AI&DE-2A
Subject: Backend Development


**Deployed API:**  https://pradhyumnalab3-production.up.railway.app/books/ 


**GitHub Repository:**  https://github.com/bollapradhyumna1409-collab/Pradhyumna_Lab_3.git



---

## 🚀 Project Overview

A RESTful Books API developed using **Node.js, Express.js, and SQLite** to perform CRUD (Create, Read, Update, and Delete) operations on book records.

This project demonstrates REST API development, query parameters, search functionality, sorting, filtering, pagination, request validation, and error handling.

## 🛠️ Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Git and GitHub
- Railway (Deployment)

## ✨ Features

- Create new book records.
- Retrieve all books and individual books by ID.
- Search books using partial title matching (`LIKE`).
- Sort books in ascending or descending order.
- Filter books using minimum and maximum prices.
- Implement pagination using `limit` and `offset`.
- Update existing book details.
- Delete book records.
- Validate POST request data.
- Handle missing records and invalid requests with appropriate HTTP status codes.
- Return consistent JSON error messages.

## 📁 Project Structure

```text
Pradhyumna_Lab_3/
│
├── screenshots/
│   ├── 01-Get-All-Books.png
│   ├── 02-Search-Books.png
│   ├── 03-Price-Filter.png
│   ├── 04-Pagination.png
│   ├── 05-Get-book-by ID.png
│   ├── 06-Create-Book.png
│   ├── 
│   ├── 07-Update-Book.png
│   ├── 08-Update-Not-Found.png
│   ├── 09-Delete-Book.png
│   └── 10-Delete-Not-Found.png
│
├── app.js
├── db.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md




**Note:** Place all your Postman screenshots inside the `screenshots/` folder in the main project directory.

Do not upload `.env` or `node_modules` to GitHub. The SQLite database file should only be included if required by your project setup and deployment configuration.

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bollapradhyumna1409-collab/Pradhyumna_Lab_3.git
```

### 2. Navigate to the Project Folder

```bash
cd Pradhyumna_Lab_3
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project directory:

```env
PORT=3000
```

### 5. Start the Server

```bash
npm start
```

The API will run locally at:

```text
http://localhost:3000
```

## 🌐 Live Deployment

The project is deployed using **Railway** and connected to the GitHub repository.

**Base URL:**

```text
https://pradhyumnalab3-production.up.railway.app
```

**Books API:**

[https://pradhyumnalab3-production.up.railway.app/books/](https://pradhyumnalab3-production.up.railway.app/books/)

## 🔗 API Endpoints

| HTTP Method | Endpoint | Description | Status Code |
|---|---|---|---|
| GET | `/books` | Retrieve all books | 200 |
| GET | `/books/:id` | Retrieve a book by ID | 200 / 404 |
| POST | `/books` | Create a new book | 201 / 400 |
| PUT | `/books/:id` | Update an existing book | 200 / 404 |
| DELETE | `/books/:id` | Delete a book | 200 / 404 |

## 🔍 Query Parameters

The `GET /books` endpoint supports the following query parameters:

| Parameter | Description |
|---|---|
| `search_q` | Search books by partial title |
| `order_by` | Field used for sorting |
| `order` | Sorting order (`ASC` or `DESC`) |
| `limit` | Maximum number of records |
| `offset` | Number of records to skip |
| `min_price` | Minimum book price |
| `max_price` | Maximum book price |

## 📚 Book Data

The following books are used in the API examples:

```json
[
    {
        "id": 1,
        "title": "Harry Potter Updated",
        "author": "J.K. Rowling",
        "price": 600
    },
    {
        "id": 2,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 350
    },
    {
        "id": 3,
        "title": "Wings of Fire - Updated",
        "author": "A.P.J. Abdul Kalam",
        "price": 300
    },
    {
        "id": 4,
        "title": "Atomic Habits",
        "author": "James Clear",
        "price": 450
    },
    {
        "id": 5,
        "title": "Rich Dad Poor Dad",
        "author": "Robert Kiyosaki",
        "price": 400
    },
    {
        "id": 6,
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "price": 550
    },
    {
        "id": 7,
        "title": "Ikigai",
        "author": "Hector Garcia",
        "price": 300
    },
    {
        "id": 8,
        "title": "Think and Grow Rich",
        "author": "Napoleon Hill",
        "price": 350
    },
    {
        "id": 9,
        "title": "The Psychology of Money",
        "author": "Morgan Housel",
        "price": 450
    },
    {
        "id": 12,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 350
    }
]
```

## 🔍 API Request Examples

### 1. Get All Books – GET `/books`

**Request:**

```text
GET /books
```

Returns all available books from the database.

### 2. Search, Sorting and Pagination

**Example Request:**

```text
GET /books?search_q=Harry&order_by=price&order=ASC&limit=5&offset=0
```

**Explanation:**
- `search_q=Harry` – Searches for books with Harry in the title.
- `order_by=price` – Sorts the results by price.
- `order=ASC` – Sorts prices from lowest to highest.
- `limit=5` – Returns a maximum of 5 records.
- `offset=0` – Starts from the first record.

**Expected Result:**

```json
[
    {
        "id": 1,
        "title": "Harry Potter Updated",
        "author": "J.K. Rowling",
        "price": 600
    }
]
```

### 3. Price Filter Example

**Example Request:**

```text
GET /books?min_price=300&max_price=500
```

**Explanation:**
- `min_price=300` – Returns books costing at least 300.
- `max_price=500` – Returns books costing at most 500.

**Expected Result:**

```json
[
    {
        "id": 2,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 350
    },
    {
        "id": 3,
        "title": "Wings of Fire - Updated",
        "author": "A.P.J. Abdul Kalam",
        "price": 300
    },
    {
        "id": 4,
        "title": "Atomic Habits",
        "author": "James Clear",
        "price": 450
    },
    {
        "id": 5,
        "title": "Rich Dad Poor Dad",
        "author": "Robert Kiyosaki",
        "price": 400
    },
    {
        "id": 7,
        "title": "Ikigai",
        "author": "Hector Garcia",
        "price": 300
    },
    {
        "id": 8,
        "title": "Think and Grow Rich",
        "author": "Napoleon Hill",
        "price": 350
    },
    {
        "id": 9,
        "title": "The Psychology of Money",
        "author": "Morgan Housel",
        "price": 450
    },
    {
        "id": 12,
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 350
    }
]
```

### 4. Create a Book – POST `/books`

**Request Body:**

```json
{
    "title": "Python Programming",
    "author": "John Smith",
    "price": 500
}
```

**Expected Status:** `201 Created`

**Expected Response:**

```json
{
    "message": "Book added successfully"
}
```

### 5. Update a Book – PUT `/books/:id`

**Example Request:**

```text
PUT /books/3
```

**Request Body:**

```json
{
    "title": "Wings of Fire - Updated",
    "author": "A.P.J. Abdul Kalam",
    "price": 300
}
```

**Expected Status:** `200 OK`

### 6. Delete a Book – DELETE `/books/:id`

**Example Request:**

```text
DELETE /books/12
```

Deletes the book with ID 12 if it exists.

**Expected Status:** `200 OK`

---

**Note:** The expected responses above assume the database contains the listed records and has not been changed by additional POST, PUT, or DELETE requests. The create and delete examples are illustrative; running them will modify the database.
## ⚠️ Validation and Error Handling

The API implements the following validations:

- Missing title returns `400 Bad Request`.
- Missing author returns `400 Bad Request`.
- Non-numeric price returns `400 Bad Request`.
- Non-existing book ID returns `404 Not Found`.
- Successful book creation returns `201 Created`.
- Successful update returns `200 OK`.
- Successful deletion returns `200 OK`.

Error responses follow a consistent JSON format:

```json
{
  "message": "Book not found"
}
```

## 🧪 Postman Testing and Screenshots

The Books REST API was tested using **Postman** with the Railway deployed API.

All 11 Postman testing screenshots are available in the `screenshots/` folder.

| Screenshot | Test Case |
|---|---|
| 01 | Retrieve all books |
<img width="1917" height="1022" alt="ALL BOOKS " src="https://github.com/user-attachments/assets/6ce92cf5-9579-4eed-bae1-36e3d9687129" />

| 02 | Search books by title |
<img width="1580" height="986" alt="SEARCH-BOOK" src="https://github.com/user-attachments/assets/41a5ebc3-e04d-40ff-9c24-144f181cfc20" />

| 03 | Filter books by price |
<img width="1917" height="1023" alt="FILTERING" src="https://github.com/user-attachments/assets/d3e14672-8d97-4892-82ba-05fbe7bacbcb" />

| 04 | Pagination using limit and offset |
<img width="1917" height="1025" alt="OFF-SET" src="https://github.com/user-attachments/assets/e3f4cbeb-74ca-4c71-89b2-fe652d26ef8d" />

| 05 | get book by ID|
<img width="1917" height="1026" alt="BY ID-GET" src="https://github.com/user-attachments/assets/cc7a76dd-f210-472a-99d2-6f2c963c31e2" />


| 06 | Create a new book successfully |
<img width="1482" height="926" alt="ADD-POST" src="https://github.com/user-attachments/assets/7efe965e-3f2b-4479-94b4-a45c6054471a" />


| 07 | Update an existing book |
<img width="1516" height="1020" alt="UPDATE-PUT" src="https://github.com/user-attachments/assets/a538f381-ddfc-49f3-9b62-02e8e066f977" />

| 08 | Update a non-existing book (404) |
<img width="1545" height="1006" alt="NOT FOUND-PUT" src="https://github.com/user-attachments/assets/a34c3ff1-e022-4130-a1f0-ffbf4f39300f" />

| 09 | Delete an existing book |
<img width="1517" height="1030" alt="DELETE" src="https://github.com/user-attachments/assets/8f6a6afc-58c9-41f3-9081-8db45f8d1555" />

| 10 | Delete a non-existing book (404) |
<img width="1536" height="1022" alt="DELETE-NOT FOUND" src="https://github.com/user-attachments/assets/37779e8d-63f1-47fe-a2a4-2d455979717e" />


Each screenshot provides evidence of the corresponding API request and response, including the HTTP method, request URL, response body, and status code where applicable.

**Note:** The POST validation screenshot may demonstrate multiple validation cases if missing title, missing author, and invalid price were captured together or included in a combined testing screenshot.
## 🐛 Debugging and Fixes

The following debugging issues were addressed during development:

- **EADDRINUSE:** Resolved port conflicts by using an available port.
- **Wrong import path:** Corrected module import paths.
- **No such table:** Fixed SQLite table-name mismatches.
- **Missing await:** Added proper `await` statements for asynchronous database operations.

## 👨‍💻 Author

**Bolla Pradhyumna**

GitHub: https://github.com/bollapradhyumna1409-collab/Pradhyumna_Lab_3.git

## 🎯 Project Objective

To gain practical experience in REST API development using Node.js, Express.js, and SQLite, including CRUD operations, query parameters, filtering, sorting, pagination, request validation, debugging, deployment, and API testing using Postman.

---

**Backend Lab 3 – Books REST API**  
*Developed by Bolla Pradhyumna*

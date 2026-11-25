
# N5 – Books REST API

**Name:** John Nicole R Adolfo  
**Section:** IV-BSIT A  
**Course:** ELEC 3 – Node.js

## Description

A REST-style Books API developed using the built-in Node.js HTTP module. It supports retrieving, adding, updating, and deleting books stored in an array.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/books | Retrieve all books |
| GET | /api/books/:id | Retrieve a book by ID |
| POST | /api/books | Add a new book |
| PUT | /api/books/:id | Update an existing book |
| DELETE | /api/books/:id | Delete a book |

## How to Run

From the repository root:

`node set2/n5-api/server.js`

Server URL: `http://localhost:8000`

## Sample JSON Body

For POST and PUT requests:

```json
{
  "title": "Banaag at Sikat",
  "author": "Lope K. Santos"
}
```

## Status Codes

- 200 – Successful request
- 201 – Book successfully created
- 400 – Invalid request data
- 404 – Book or route not found

## Note

Books are stored in memory. Added or updated records reset when the server restarts.


/*
Name: John Nicole R Adolfo
Section: IV-BSIT A
Activity: N5 - REST API
Date: November 26, 2026
*/

const http = require("http");

const PORT = 8000;

// Sample books stored in an array
let books = [
    { id: 1, title: "Noli Me Tangere", author: "Jose Rizal" },
    { id: 2, title: "El Filibusterismo", author: "Jose Rizal" },
    { id: 3, title: "Florante at Laura", author: "Francisco Balagtas" }
];

// Send a response in JSON format
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    // GET all books
    if (req.method === "GET" && url.pathname === "/api/books") {
        return sendJSON(res, 200, books);
    }

    // GET one book by ID
    if (req.method === "GET" && /^\/api\/books\/\d+$/.test(url.pathname)) {
        const id = Number(url.pathname.split("/")[3]);
        const book = books.find(item => item.id === id);

        if (!book) {
            return sendJSON(res, 404, {
                error: "Book not found"
            });
        }

        return sendJSON(res, 200, book);
    }

    return sendJSON(res, 404, {
        error: "Route not found"
    });
});

server.listen(PORT, () => {
    console.log("=== N5 Books REST API ===");
    console.log("Name: John Nicole R Adolfo");
    console.log("Section: IV-BSIT A");
    console.log(`Server running at http://localhost:${PORT}`);
});

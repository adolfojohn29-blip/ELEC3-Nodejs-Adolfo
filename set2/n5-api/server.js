
/*
Name: John Nicole R Adolfo
Section: IV-BSIT A
Activity: N5 - REST API
Date: November 26, 2026
*/

const http = require("http");

const PORT = 8000;

// Sample books
let books = [
    { id: 1, title: "Noli Me Tangere", author: "Jose Rizal" },
    { id: 2, title: "El Filibusterismo", author: "Jose Rizal" },
    { id: 3, title: "Florante at Laura", author: "Francisco Balagtas" }
];

// Send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data, null, 2));
}

// Read and parse JSON request body
function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;

            if (body.length > 100000) {
                reject(new Error("Request body too large"));
                req.destroy();
            }
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("Invalid JSON body"));
            }
        });

        req.on("error", reject);
    });
}

// Validate book details
function validBook(data) {
    return data &&
        typeof data.title === "string" &&
        typeof data.author === "string" &&
        data.title.trim() !== "" &&
        data.author.trim() !== "";
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    const match = pathname.match(/^\/api\/books\/(\d+)$/);
    const id = match ? Number(match[1]) : null;

    try {
        // GET all books
        if (req.method === "GET" && pathname === "/api/books") {
            return sendJSON(res, 200, books);
        }

        // GET book by ID
        if (req.method === "GET" && match) {
            const book = books.find(item => item.id === id);

            if (!book) {
                return sendJSON(res, 404, {
                    error: "Book not found"
                });
            }

            return sendJSON(res, 200, book);
        }

        // POST - Add new book
        if (req.method === "POST" && pathname === "/api/books") {
            const data = await readBody(req);

            if (!validBook(data)) {
                return sendJSON(res, 400, {
                    error: "Valid title and author are required"
                });
            }

            const newBook = {
                id: Math.max(0, ...books.map(book => book.id)) + 1,
                title: data.title.trim(),
                author: data.author.trim()
            };

            books.push(newBook);

            return sendJSON(res, 201, newBook);
        }

        // PUT - Update existing book
        if (req.method === "PUT" && match) {
            const book = books.find(item => item.id === id);

            if (!book) {
                return sendJSON(res, 404, {
                    error: "Book not found"
                });
            }

            const data = await readBody(req);

            if (!validBook(data)) {
                return sendJSON(res, 400, {
                    error: "Valid title and author are required"
                });
            }

            book.title = data.title.trim();
            book.author = data.author.trim();

            return sendJSON(res, 200, book);
        }

        // DELETE - Remove book
        if (req.method === "DELETE" && match) {
            const index = books.findIndex(item => item.id === id);

            if (index === -1) {
                return sendJSON(res, 404, {
                    error: "Book not found"
                });
            }

            const deletedBook = books.splice(index, 1)[0];

            return sendJSON(res, 200, {
                message: "Book deleted successfully",
                book: deletedBook
            });
        }

        // Unknown endpoint
        return sendJSON(res, 404, {
            error: "Route not found"
        });

    } catch (error) {
        return sendJSON(res, 400, {
            error: error.message
        });
    }
});

server.listen(PORT, () => {
    console.log("=== N5 Books REST API ===");
    console.log("Name: John Nicole R Adolfo");
    console.log("Section: IV-BSIT A");
    console.log(`Server running at http://localhost:${PORT}`);
});

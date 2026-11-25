
/*
Name: John Nicole R Adolfo
Section: IV-BSIT A
Activity: N6 - Middleware and API Testing
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

// Logger middleware - records the method, URL, and date/time
function loggerMiddleware(req, res, next) {
    const dateTime = new Date().toLocaleString();

    console.log(`[${dateTime}] ${req.method} ${req.url}`);

    next();
}

// JSON middleware - sets the response header
function jsonMiddleware(req, res, next) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    next();
}

// Execute middleware functions in order
function runMiddleware(req, res, middlewares, done) {
    let index = 0;

    function next() {
        if (index < middlewares.length) {
            const middleware = middlewares[index++];
            middleware(req, res, next);
        } else {
            done();
        }
    }

    next();
}

// Send JSON response without repeating Content-Type
function sendJSON(res, statusCode, data) {
    res.statusCode = statusCode;
    res.end(JSON.stringify(data, null, 2));
}

// Read and parse JSON request body
function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        let tooLarge = false;

        req.on("data", chunk => {
            if (tooLarge) return;

            body += chunk;

            if (Buffer.byteLength(body, "utf8") > 100000) {
                tooLarge = true;
                reject(new Error("Request body too large"));
            }
        });

        req.on("end", () => {
            if (tooLarge) return;

            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("Invalid JSON body"));
            }
        });

        req.on("error", reject);
    });
}

// Check if the book has valid title and author
function validBook(data) {
    return data &&
        typeof data.title === "string" &&
        typeof data.author === "string" &&
        data.title.trim() !== "" &&
        data.author.trim() !== "";
}

// Main API route handler
async function handleRequest(req, res) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    const match = pathname.match(/^\/api\/books\/(\d+)$/);
    const id = match ? Number(match[1]) : null;

    try {
        // GET - Retrieve all books
        if (req.method === "GET" && pathname === "/api/books") {
            return sendJSON(res, 200, books);
        }

        // GET - Retrieve a book by ID
        if (req.method === "GET" && match) {
            const book = books.find(item => item.id === id);

            if (!book) {
                return sendJSON(res, 404, {
                    error: "Book not found"
                });
            }

            return sendJSON(res, 200, book);
        }

        // POST - Add a new book
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

        // PUT - Update an existing book
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

        // DELETE - Remove a book
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
        const statusCode = error.message === "Request body too large"
            ? 413 : 400;

        return sendJSON(res, statusCode, {
            error: error.message
        });
    }
}

// Create server and pass each request through the middleware
const server = http.createServer((req, res) => {
    runMiddleware(
        req,
        res,
        [loggerMiddleware, jsonMiddleware],
        () => {
            handleRequest(req, res).catch(error => {
                console.error("Server error:", error);

                if (!res.headersSent) {
                    sendJSON(res, 500, {
                        error: "Internal server error"
                    });
                }
            });
        }
    );
});

server.listen(PORT, () => {
    console.log("=== N6 Middleware and API Testing ===");
    console.log("Name: John Nicole R Adolfo");
    console.log("Section: IV-BSIT A");
    console.log(`Server running at http://localhost:${PORT}`);
});

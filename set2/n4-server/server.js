
/*
Name: John Nicole R Adolfo
Section: IV-BSIT A
Activity: N4 - Basic HTTP Server
Date: November 26, 2026
*/

const http = require("http");

const PORT = 8000;

const server = http.createServer((req, res) => {
    let statusCode = 200;
    let content = "";

    if (req.url === "/") {
        content = `
            <h1>Welcome to My Node.js Server</h1>
            <p>Name: John Nicole R Adolfo</p>
            <p>Section: IV-BSIT A</p>
            <a href="/about">About</a> |
            <a href="/contact">Contact</a>
        `;
    } else if (req.url === "/about") {
        content = `
            <h1>About Me</h1>
            <p>I am John Nicole R Adolfo, a BSIT student.</p>
            <p>This website is part of my ELEC 3 activity.</p>
            <a href="/">Home</a>
        `;
    } else if (req.url === "/contact") {
        content = `
            <h1>Contact Page</h1>
            <p>Name: John Nicole R Adolfo</p>
            <p>Section: IV-BSIT A</p>
            <a href="/">Home</a>
        `;
    } else {
        statusCode = 404;
        content = `
            <h1>404 - Page Not Found</h1>
            <p>The page you requested does not exist.</p>
            <a href="/">Back to Home</a>
        `;
    }

    res.writeHead(statusCode, {
        "Content-Type": "text/html; charset=utf-8"
    });

    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ELEC 3 - N4</title>
</head>
<body>
    ${content}
</body>
</html>`);
});

server.listen(PORT, () => {
    console.log("=== N4 Basic HTTP Server ===");
    console.log("Name: John Nicole R Adolfo");
    console.log("Section: IV-BSIT A");
    console.log(`Server running at http://localhost:${PORT}`);
});


/*
Name: John Nicole R Adolfo
Section: IV-BSIT A
Activity: N3 - File Manager with fs and path
Date: November 25, 2026
*/

const fs = require("fs");
const path = require("path");

const filesFolder = path.join(__dirname, "files");

if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder, { recursive: true });
}

function getFilePath(filename) {
    if (!filename || path.basename(filename) !== filename ||
        filename === "." || filename === "..") {
        throw new Error("Invalid file name.");
    }

    return path.join(filesFolder, filename);
}

function createFile(filename, content) {
    const filePath = getFilePath(filename);

    if (fs.existsSync(filePath)) {
        console.log("Error: File already exists.");
        return;
    }

    fs.writeFileSync(filePath, content, "utf8");
    console.log("File created successfully:", filename);
}

function readFile(filename) {
    const filePath = getFilePath(filename);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File not found.");
        return;
    }

    console.log("File contents:", fs.readFileSync(filePath, "utf8"));
}

function updateFile(filename, content) {
    const filePath = getFilePath(filename);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File not found.");
        return;
    }

    fs.appendFileSync(filePath, "\n" + content, "utf8");
    console.log("File updated successfully:", filename);
}

function deleteFile(filename) {
    const filePath = getFilePath(filename);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File not found.");
        return;
    }

    fs.unlinkSync(filePath);
    console.log("File deleted successfully:", filename);
}

function listFiles() {
    const filenames = fs.readdirSync(filesFolder);

    if (filenames.length === 0) {
        console.log("No files found.");
        return;
    }

    for (const filename of filenames) {
        const filePath = getFilePath(filename);

        if (!fs.statSync(filePath).isFile()) {
            continue;
        }

        console.log("\nFull Path:", filePath);
        console.log("File Name:", path.basename(filePath));
        console.log("Extension:", path.extname(filePath));
        console.log("Contents:", fs.readFileSync(filePath, "utf8"));
    }
}

const [command, filename, ...contentParts] = process.argv.slice(2);
const content = contentParts.join(" ");

console.log("=== N3 File Manager ===");
console.log("Name: John Nicole R Adolfo");
console.log("Section: IV-BSIT A");

try {
    switch (command) {
        case "create":
            createFile(filename, content);
            break;
        case "read":
            readFile(filename);
            break;
        case "update":
            updateFile(filename, content);
            break;
        case "delete":
            deleteFile(filename);
            break;
        case "list":
            listFiles();
            break;
        default:
            console.log("Usage: node index.js <create|read|update|delete|list> [filename] [content]");
    }
} catch (error) {
    console.log("Error:", error.message);
}


/*
Name: John Nicole R Adolfo
Section: IV-BSIT A
Activity: N2 - Modular Calculator
Date: November 25, 2026
*/

const operations = require("./operations");
const { formatResult } = require("./formatter");
const path = require("path");

// Read the operation and numbers from the command line.
const args = process.argv.slice(2);
const operation = args[0];
const numbers = args.slice(1).map(Number);

console.log("=== N2 Modular Calculator ===");
console.log("Name: John Nicole R Adolfo");
console.log("Section: IV-BSIT A");
console.log(`Program: ${path.basename(__filename)}`);

if (!operation || numbers.length < 2 ||
    args.slice(1).some(value => value.trim() === "" || !Number.isFinite(Number(value)))) {
    console.log("Usage: node index.js <operation> <num1> <num2>");
    console.log("Operations: add, subtract, multiply, divide, average");
    process.exit(1);
}

try {
    if (typeof operations[operation] !== "function") {
        throw new Error("Unknown operation: " + operation);
    }

    const result = operations[operation](numbers[0], numbers[1]);

    console.log(formatResult(operation, numbers.slice(0, 2), result));

} catch (error) {
    console.log("Error: " + error.message);
}

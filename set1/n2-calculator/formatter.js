/*
Name: John Nicole R Adolfo
Section: IV-BSIT A
Activity: N2 - Modular Calculator
Date: November 25, 2026
*/

// Format the calculator result for display
function formatResult(operation, numbers, result) {
    return `${operation}(${numbers.join(", ")}) = ${result}`;
}

module.exports = { formatResult };
const fs = require('fs');

// Function to convert number from given base to decimal
function convertToDecimal(value, base) {
    if (base < 2 || base > 16) {
        throw new Error("Base must be between 2 and 16");
    }

    const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    value = value.toUpperCase();
    let result = 0;

    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        const digitValue = digits.indexOf(char);

        if (digitValue === -1 || digitValue >= base) {
            throw new Error(`Invalid digit ${char} for base ${base}`);
        }

        result = result * base + digitValue;
    }

    return result;
}

// Simple way for conversion
// function convertToDecimal(value, base) {
//     return parseInt(value, base);
// }

// Function for Lagrange interpolation
function lagrangeInterpolation(points) {
    let result = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i][1];
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= -points[j][0] / (points[i][0] - points[j][0]);
            }
        }
        result += term;
    }

    return result;
}

function solvePolynomial(data) {
    const n = data.keys.n;
    const k = data.keys.k;

    const points = [];

    for (const [key, value] of Object.entries(data)) {
        if (key !== "keys") {
            const x = parseInt(key);
            const base = parseInt(value.base);
            const y = convertToDecimal(value.value, base);
            points.push([x, y]);
        }
    }

    // Error if we have less than k points
    if (points.length < k) {
        throw new Error("Not enough points to solve the polynomial!");
    }

    // Using only the first k points for interpolation
    points.length = k;

    // Calculating the constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(points);

    // Rounding the result
    return Math.round(constantTerm);
}

// Reading the JSON file
const NUM_TEST_CASES = 2;
for (let index = 1; index <= 2; index++) {
    fs.readFile(`test${index}.json`, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        try {
            const data = JSON.parse(jsonString);
            const result = solvePolynomial(data);
            console.log(`The constant term 'c' of the polynomial in test case ${index} is:`, result);
        } catch(err) {
            console.log('Error parsing JSON string:', err);
        }
    });
}
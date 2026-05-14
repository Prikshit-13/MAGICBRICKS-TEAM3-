const { execSync } = require('child_process');

console.log("Starting full test execution...");

try {
    // Run cucumber tests for all features
    execSync('npx cucumber-js tests/Features/**/*.feature', { stdio: 'inherit' });
} catch (error) {
    console.log("\nTests completed with some failures. Generating report anyway...");
}

// Automatically generate the HTML report after tests finish
console.log("Building HTML Dashboard...");
require('./generateReport.js');
console.log("Done! You can find your dashboard in reports/html-report/index.html");

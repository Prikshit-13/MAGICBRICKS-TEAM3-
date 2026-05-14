const fs = require("fs");
const path = require("path");
const report = require("multiple-cucumber-html-reporter");

const sourceDir = "./test-results";
const validDir = "./test-results/valid-json";

if (!fs.existsSync(validDir)) {
    fs.mkdirSync(validDir, { recursive: true });
}

fs.readdirSync(sourceDir).forEach(file => {
    if (file.endsWith(".json")) {
        const sourcePath = path.join(sourceDir, file);

        try {
            const rawData = fs.readFileSync(sourcePath, "utf8");
            const parsedData = JSON.parse(rawData);

            if (Array.isArray(parsedData)) {
                fs.writeFileSync(
                    path.join(validDir, file),
                    JSON.stringify(parsedData, null, 2)
                );
                console.log(`${file} added`);
            } else {
                console.log(`${file} skipped (not cucumber array format)`);
            }
        } catch (error) {
            console.log(`${file} skipped (invalid JSON)`);
        }
    }
});

report.generate({
    jsonDir: validDir,
    reportPath: "test-results/html-report",

    reportName: "Sprint Automation Execution Report",
    pageTitle: "Sprint Automation Report",
    displayDuration: true,
    displayReportTime: true,
    openReportInBrowser: true,
    saveCollectedJSON: true,

    metadata: {
        browser: {
            name: "chrome",
            version: "latest"
        },
        device: "Local test machine",
        platform: {
            name: "windows",
            version: "11"
        }
    },

    customData: {
        title: "Execution Info",
        data: [
            { label: "Project", value: "Sprint Automation" },
            { label: "Tester 1", value: "Vatan" },
            { label: "Tester 2", value: "Justina" },
            { label: "Tester 3", value: "Prikshit" },
            { label: "Tester 4", value: "Harsh" },
            { label: "Tester 5", value: "Aryan" }
        ]
    }
});
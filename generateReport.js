const report = require('multiple-cucumber-html-reporter');

report.generate({

    jsonDir: 'reports',

    reportPath: 'reports/html-report',

    metadata: {

        browser: {
            name: 'chromium'
        },

        device: 'Local machine',

        platform: {
            name: 'windows'
        }
    }
});
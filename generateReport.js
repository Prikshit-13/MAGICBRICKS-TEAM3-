const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './reports',
    reportPath: './reports/html_report',
    metadata:{
        browser: {
            name: 'chrome',
            version: '120'
        },
        device: 'Local test machine',
        platform: {
            name: 'windows',
            version: '11'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'MagicBricks Automation'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Cycle', value: 'B11221.34321'}
        ]
    }
});

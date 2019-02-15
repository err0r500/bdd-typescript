/* eslint-disable @typescript-eslint/no-var-requires */
const reporter = require('cucumber-html-reporter')
const fs = require('fs')

var options = {
    theme: 'bootstrap',
    jsonFile: 'cucumber.json',
    output: 'cucumber.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
}
reporter.generate(options)

// fs.watchFile(options.jsonFile, (curr, prev) => {
//     reporter.generate(options);
// });


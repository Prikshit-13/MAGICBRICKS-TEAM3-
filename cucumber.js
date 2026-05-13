module.exports = {
  // Default profile — runs all feature files (for the whole team)
  default: {
    paths: ['tests/Features/*.feature'],
    require: ['tests/Steps/*.js'],
    format: [
      'progress',
      'json:reports/report.json'
    ]
  },

  // Justina's profile — runs ONLY Justina.feature
  // Run with: npx cucumber-js --profile justina
  // justina: {
  //   paths: ['tests/Features/Justina.feature'],
  //   require: ['tests/Steps/*.js'],
  //   format: [
  //     'progress',
  //     'json:reports/justina-report.json'
  //   ]
  // },

  // Home Loan profile — runs ONLY homeLoan.feature
  // Run with: npx cucumber-js --profile homeLoan
  homeLoan: {
    paths: ['tests/Features/homeLoan.feature'],
    require: ['tests/Steps/*.js'],
    format: [
      'progress',
      'json:reports/homeLoan-report.json'
    ]
  }
};
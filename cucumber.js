module.exports = {
  default: {
    require: ['tests/Steps/*.js'],

    format: [
      'progress',
      'json:reports/report.json'
    ]
  }
};
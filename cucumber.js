module.exports = {
  default: {

    paths: ['tests/Features/*.feature'],

    require: ['tests/Steps/*.js'],

    format: [
      'progress',
      'json:reports/report.json'
    ]
  }
};
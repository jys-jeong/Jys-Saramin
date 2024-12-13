const expressWinston = require('express-winston');
const logger = require('../utils/logger');

const errorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
});

module.exports = errorLogger;

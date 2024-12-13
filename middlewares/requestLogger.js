const expressWinston = require('express-winston');
const logger = require('../utils/logger');

const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true, // 메타데이터 포함
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  expressFormat: true, // Express 형식 출력
  colorize: false, // 로그 컬러 비활성화
  responseWhitelist: ['statusCode', 'responseTime'], // 응답에서 로깅할 데이터
});

module.exports = requestLogger;

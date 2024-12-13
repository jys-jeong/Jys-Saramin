const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// 로그 형식 설정
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Logger 생성
const logger = createLogger({
  level: 'info', // 로그 레벨 기본값
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console({ format: combine(colorize(), logFormat) }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // 에러 로그
    new transports.File({ filename: 'logs/combined.log' }) // 모든 로그
  ],
});

// 로그 레벨을 동적으로 변경할 수 있는 메서드 추가
logger.setLogLevel = (level) => {
  logger.level = level;
};

module.exports = logger;

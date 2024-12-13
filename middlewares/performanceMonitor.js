const logger = require('../utils/logger');

const performanceMonitor = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Performance: ${req.method} ${req.url} - ${duration}ms`);
    if (duration > 1000) { 
      logger.warn(`Slow response detected: ${req.method} ${req.url} - ${duration}ms`);
    }
  });
  
  next();
};

module.exports = performanceMonitor;

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // 서버 콘솔에 에러 로그 출력
  
    if (!err.isOperational) {
      // 예상하지 못한 에러
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  
    // 예상된 에러 처리
    res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  };
  
  module.exports = { AppError, globalErrorHandler };
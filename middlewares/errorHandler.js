
class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err); // 에러 로깅 (콘솔에 출력)

  // 커스텀 에러가 아니면 기본 서버 에러로 처리
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // 400, 404, 500 등 기타 에러 처리
  return res.status(500).json({
    success: false,
    message: '서버 오류 발생. 나중에 다시 시도해주세요.',
  });
};

// 커스텀 에러 클래스를 사용하는 예시
const createError = (statusCode, message) => {
  return new CustomError(statusCode, message);
};

module.exports = { errorHandler, createError };

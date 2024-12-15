/**
 * 성공 응답 핸들러
 * @param {Object} res - Express Response 객체
 * @param {Object} data - 실제 데이터
 * @param {Object} [pagination] - 페이지네이션 정보
 */
const successResponse = (res, data, pagination = null,message=null) => {
    const response = {
      status: 'success',
      data,
    };
  
    if (pagination) {
        response.pagination = pagination;
    }
    if(message){
        response.message=message;
    }
    res.status(200).json(response);
  };
  
  /**
   * 실패 응답 핸들러
   * @param {Object} res - Express Response 객체
   * @param {String} message - 에러 메시지
   * @param {String} code - 에러 코드
   * @param {Number} statusCode - HTTP 상태 코드 (기본값 400)
   */
  const errorResponse = (res, message, code, statusCode = 400) => {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    });
  };
  
  module.exports = { successResponse, errorResponse };
  
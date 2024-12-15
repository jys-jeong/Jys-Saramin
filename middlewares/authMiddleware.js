// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET } = require('../config/jwt');
const { successResponse, errorResponse } = require('../utils/responseHandler');
exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Authorization 헤더에서 토큰 추출
  console.log(token);

  if (!token) {
    return errorResponse(res, 'Authentication required', 'UNAUTHORIZED', 401);
  }

  // JWT 토큰 검증
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return errorResponse(res, 'Invalid token', 'FORBIDDEN', 403);
    }

    // 토큰에서 추출한 사용자 정보
    const { id, email, name, role } = decoded;

    try {
      // DB에서 사용자 정보 확인
      const user = await User.findByPk(id); // ID로 사용자 조회

      if (!user) {
        return errorResponse(res, '사용자가 존재하지 않습니다.', 'FORBIDDEN', 403); // DB에서 사용자 찾을 수 없으면 403 반환
      }

      // DB와 토큰 정보가 일치하는지 확인
      if (user.email !== email || user.name !== name || user.role !== role) {
        return errorResponse(res, '유효하지 않은 토큰입니다.', 'FORBIDDEN', 403);
      }

      // 인증된 사용자 정보 설정
      req.user = decoded; // 인증된 사용자 정보를 req.user에 설정
      next(); // 다음 미들웨어로 진행
    } catch (error) {
      console.error(error);
      return errorResponse(res, '서버 오류', 'SERVER_ERROR', 500);
    }
  });
};

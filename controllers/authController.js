const jwt = require('jsonwebtoken');
const User = require('../models').User;
const LoginHistory =require('../models').LoginHistory;
const RefreshToken = require('../models').RefreshToken;
const Bookmark = require('../models').Bookmark;
const { createError } = require('../middlewares/errorHandler');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/jwt.js');
const { successResponse, errorResponse } = require('../utils/responseHandler');
exports.register = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    const hashedPassword = Buffer.from(password).toString('base64');

    // 사용자 정보 저장
    const newUser = await User.create({ email, password: hashedPassword, name, role });
    return successResponse(res, { user: newUser }, null, '회원가입 완료');
  } catch (error) {
    console.error(error);  // 에러 로그를 콘솔에 출력
    return errorResponse(res, '서버 에러 발생', 'SERVER_ERROR', 500);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user.id);
    console.log(email,password);
    if (!user) {
      return errorResponse(res, '존재하지 않는 사용자입니다.', 'USER_NOT_FOUND', 401);
    }

    // 2. 비밀번호 검증
    const encryptedPassword = Buffer.from(password).toString('base64');
    if (user.password !== encryptedPassword) {
      return errorResponse(res, '입력하신 비밀번호가 틀렸습니다.', 'INVALID_PASSWORD', 401);
    }

    // Access Token 발급
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, name:user.name, role: user.role },
      JWT_SECRET, 
      { expiresIn: '1h' } // 1시간 유효
    );

    // Refresh Token 발급
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, name:user.name, role: user.role },
      JWT_REFRESH_SECRET, // 별도의 비밀 키로 Refresh Token 생성
      { expiresIn: '7d' } // 7일 유효
    );

    // 로그인 기록 저장
    await LoginHistory.create({
      userId: user.id,
      loginTime: new Date(),
    });
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      createdAt: new Date(),  
      expiresAt: (new Date()) + 7
    });

    return successResponse(res, { accessToken, refreshToken }, null, '로그인 성공');
  } catch (error) {
    console.error('Error during login:', error);
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return errorResponse(res, '잘못된 입력, 파라미터 오류', 'INVALID_INPUT', 400);
    }

    // 데이터베이스에서 Refresh 토큰 확인
    const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      return errorResponse(res, '특정 자원에 대한 접근 권한 없음', 'FORBIDDEN', 403);
    }

    // Refresh 토큰 검증
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'default_secret', async (err, decoded) => {
      if (err) {
        await RefreshToken.destroy({ where: { token: refreshToken } });
        return errorResponse(res, '특정 자원에 대한 접근 권한 없음, 로그인 해주세요', 'FORBIDDEN', 403);
      }

      // 새로운 Access 토큰 발급
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email, name:decoded.name, role: decoded.role },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' }
      );

      return successResponse(res, { accessToken: newAccessToken }, null, 'Access Token 재발급 성공');
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};

exports.updateProfile = async (req, res,next) => {
  try {
    const userId = req.user.id;  // 인증 미들웨어에서 설정한 값
    const { email, password, name } = req.body;

    // 비밀번호 변경 (선택적)
    const hashedPassword = password ? Buffer.from(password).toString('base64') : undefined;

    const updatedUser = await User.update(
      { email, password: hashedPassword, name },
      { where: { id: userId } }
    );
    
    if (updatedUser[0] === 0) {
      return errorResponse(res, '잘못된 입력, 파라미터 오류', 'INVALID_INPUT', 400);
    }
    console.log(name);
    const newAccessToken = jwt.sign(
      { id: userId, email: email, name:name,role: req.user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { id: userId, email: email, name:name,role: req.user.role },
      JWT_REFRESH_SECRET, // 별도의 비밀 키로 Refresh Token 생성
      { expiresIn: '7d' } // 7일 유효
    );
    await RefreshToken.create({
      token: refreshToken,
      userId: userId,
      createdAt: new Date(),  
      expiresAt: (new Date()) + 7
    });
    return successResponse(res, {  accessToken: newAccessToken, refreshToken: refreshToken }, null, '프로필 업데이트 성공');
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};
exports.getProfile = async (req, res,next) => {
  try {
    const userId = req.user.id; // 인증 미들웨어에서 설정한 값 (사용자 ID)

    // 사용자 정보 조회
    const user = await User.findOne({ where: { id: userId } });
    
    if (!user) {
      return errorResponse(res, '사용자가 존재하지 않습니다.', 'NOT_FOUND', 404);
    }

    // 비밀번호 제외한 사용자 정보 반환
    const { password, ...userData } = user.toJSON();
    return successResponse(res, userData, null, '프로필 조회 성공');
  } catch (error) {
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};
// 회원 탈퇴 API
exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id; // 인증된 사용자 ID
    const targetUserId = req.params.id; // URL 파라미터에서 대상 사용자 ID

    // 사용자가 존재하는지 확인
    const user = await User.findOne({ where: { id: targetUserId } });
    if (!user) {
      return errorResponse(res, '사용자가 존재하지 않습니다.', 'NOT_FOUND', 404);
    }

    // 관련 데이터 삭제 (예: 로그인 기록)
    await LoginHistory.destroy({ where: { userId: targetUserId } });
    await Bookmark.destroy({ where: { userId: targetUserId } });
    // 사용자 삭제
    await User.destroy({ where: { id: targetUserId } });
    
    return successResponse(res, null, null, '유저 삭제 완료');
  } catch (error) {
    console.error(error);
    return errorResponse(res, '서버 오류 발생', 'SERVER_ERROR', 500);
  }
};
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const LoginHistory =require('../models').LoginHistory;
const RefreshToken = require('../models').RefreshToken;
const { createError } = require('../middlewares/errorHandler');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/jwt.js');

exports.register = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    const hashedPassword = Buffer.from(password).toString('base64');

    // 사용자 정보 저장
    const newUser = await User.create({ email, password: hashedPassword, name, role });
    res.status(201).json({ message: '회원가입 완료', user: newUser });
  } catch (error) {
    console.error(error);  // 에러 로그를 콘솔에 출력
    next(createError(500, '서버 에러 발생'));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);
    console.log(email,password);
    if (!user) {
      return next(createError(401, '인증 실패, 권한 없음: 회원가입 해주세요'));
    }

    // 2. 비밀번호 검증
    const encryptedPassword = Buffer.from(password).toString('base64');
    if (user.password !== encryptedPassword) {
      return next(createError(401, '인증 실패, 권한 없음: 입력하신 비밀번호가 틀렸습니다.'));
    }

    // Access Token 발급
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET, 
      { expiresIn: '1h' } // 1시간 유효
    );

    // Refresh Token 발급
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
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

    res.status(200).json({
      accessToken, 
      refreshToken,  // Refresh Token을 클라이언트에게 전달
    });
  } catch (error) {
    console.error('Error during login:', error);
    next(createError(500, '서버 오류 발생'));
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(createError(400, '잘못된 입력, 파라미터 오류'));
    }

    // 데이터베이스에서 Refresh 토큰 확인
    const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      return next(createError(403, '특정 자원에 대한 접근 권한 없음'));
    }

    // Refresh 토큰 검증
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'default_secret', async (err, decoded) => {
      if (err) {
        await RefreshToken.destroy({ where: { token: refreshToken } });
        return next(createError(403, '특정 자원에 대한 접근 권한 없음, 로그인 해주세요'));
      }

      // 새로운 Access 토큰 발급
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' }
      );

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    next(createError(500, '서버 오류 발생'));
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
      return res.status(400).json({ message: '잘못된 입력, 파라미터 오류' });
    }
    const newAccessToken = jwt.sign(
      { id: req.user.id, email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: '프로필 업데이트 성공', accessToken:newAccessToken });
  } catch (error) {
    console.error(error);
      next(createError(500, '서버 오류 발생:',error));
  }
};
exports.getProfile = async (req, res,next) => {
  try {
    const userId = req.user.id; // 인증 미들웨어에서 설정한 값 (사용자 ID)

    // 사용자 정보 조회
    const user = await User.findOne({ where: { id: userId } });
    
    if (!user) {
      next(createError(404, '요청한 자원 없음'));
    }

    // 비밀번호 제외한 사용자 정보 반환
    const { password, ...userData } = user.toJSON();
    res.status(200).json({ user: userData });
  } catch (error) {
    next(createError(500, '서버 오류 발생'));
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
      return next(createError(404, '요청한 자원 없음'));
    }

    // 관련 데이터 삭제 (예: 로그인 기록)
    await LoginHistory.destroy({ where: { userId: targetUserId } });

    // 사용자 삭제
    await User.destroy({ where: { id: targetUserId } });

    res.status(200).json({ message: '유저 삭제 완료' });
  } catch (error) {
    console.error(error);
    next(createError(500, '서버 오류 발생'));
  }
};
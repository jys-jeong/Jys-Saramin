const jwt = require('jsonwebtoken');
const User = require('../models').User;
const LoginHistory =require('../models').LoginHistory;
const RefreshToken = require('../models').RefreshToken;
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/jwt.js');

exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    console.log(req.body);
    // 이메일 형식 검증
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // 비밀번호 길이 검증 (최소 6자 이상)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    if(name.length<1){
      return res.status(400).json({message:'Please input name than longer length 1'});
    }
    if(role!=='admin'&&role!=='user'&&role!=='manager'){
      return res.status(400).json({message:'Please input role with admin or user or manager'})
    }
    // 중복 회원 검사
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    
    const hashedPassword = Buffer.from(password).toString('base64');

    // 사용자 정보 저장
    const newUser = await User.create({ email, password: hashedPassword,name, role });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);  // 에러 로그를 콘솔에 출력
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    // 2. 비밀번호 검증
    const encryptedPassword = Buffer.from(password).toString('base64');
    if (user.password !== encryptedPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Access Token 발급
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET, 
      { expiresIn: '1h' } // 1시간 유효
    );

    // Refresh Token 발급
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_REFRESH_SECRET, // 별도의 비밀 키로 Refresh Token 생성
      { expiresIn: '7d' } // 7일 유효
    );

    // 로그인 기록 저장
    await LoginHistory.create({
      userId: user.id,
      loginTime: new Date(),
    });
    await RefreshToken.create({
      token:refreshToken,
      userId:user.id,
      createdAt: new Date(),  // createdAt 값 추가
      expiresAt:(new Date())+7
    })
    // Refresh Token은 클라이언트의 안전한 장소에 저장되어야 합니다 (예: HTTPOnly 쿠키)
    res.status(200).json({
      accessToken, 
      refreshToken,  // Refresh Token을 클라이언트에게 전달
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required' });
    }

    // 데이터베이스에서 Refresh 토큰 확인
    const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Refresh 토큰 검증
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'default_secret', async (err, decoded) => {
      if (err) {
        // 유효하지 않은 토큰은 삭제
        await RefreshToken.destroy({ where: { token: refreshToken } });
        // 403 응답을 보내고 클라이언트에서 로그아웃 처리하도록 유도
        return res.status(403).json({ message: 'Invalid or expired refresh token, Login Please' });
      }

      // 새로운 Access 토큰 발급
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' }
      );

      // 응답으로 새 Access 토큰 반환
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
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
      return res.status(400).json({ message: 'Profile update failed' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // 인증 미들웨어에서 설정한 값 (사용자 ID)

    // 사용자 정보 조회
    const user = await User.findOne({ where: { id: userId } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 비밀번호 제외한 사용자 정보 반환
    const { password, ...userData } = user.toJSON();
    res.status(200).json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// 회원 탈퇴 API
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // 인증 미들웨어에서 설정한 값 (사용자 ID)

    // 사용자가 존재하는지 확인
    const user = await User.findOne({ where: { id: userId } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 관련 데이터 삭제 (예: 로그인 기록)
    await LoginHistory.destroy({ where: { userId: userId } });

    // 사용자 삭제
    await User.destroy({ where: { id: userId } });

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

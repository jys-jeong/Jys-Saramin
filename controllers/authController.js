const jwt = require('jsonwebtoken');
const User = require('../models').User;
const LoginHistory =require('../models').LoginHistory;
const { JWT_SECRET } = require('../config/jwt.js');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // 이메일 형식 검증
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // 비밀번호 길이 검증 (최소 6자 이상)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // 중복 회원 검사
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    
    const hashedPassword = Buffer.from(password).toString('base64');

    // 사용자 정보 저장
    const newUser = await User.create({ email, password: hashedPassword });
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

    // JWS 토큰 발급
    console.log(JWT_SECRET);
    const token = jwt.sign({ id: user.id,email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    await LoginHistory.create({
      userId: user.id,
      loginTime: new Date(),
    });
    res.status(200).json({ token });
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

    // Refresh 토큰 검증
    jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const newAccessToken = jwt.sign({ userId: decoded.id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;  // 인증 미들웨어에서 설정한 값
    const { email, password } = req.body;

    // 비밀번호 변경 (선택적)
    const hashedPassword = password ? Buffer.from(password).toString('base64') : undefined;

    const updatedUser = await User.update(
      { email, password: hashedPassword },
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

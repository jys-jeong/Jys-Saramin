require('dotenv').config();
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET, // 환경 변수에서 JWT_SECRET 가져오기
  };
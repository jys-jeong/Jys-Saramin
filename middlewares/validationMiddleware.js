const { body, validationResult } = require('express-validator');
const { User } = require('../models'); // User 모델 가져오기
const { errorResponse } = require('../utils/responseHandler');
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errorResponse(res, errors, null, 400);
  }

  next();
};

exports.registerValidation = [
  // 이메일 형식 확인
  body('email')
    .isEmail()
    .withMessage('이메일 형식에 맞게 입력해주세요')
    .custom(async (email) => {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('이메일은 이미 사용 중입니다.');
      }
      return true;
    }),

  // 패스워드 길이 확인
  body('password')
    .isLength({ min: 6 })
    .withMessage('적어도 6자 이상 입력해주세요'),

  // 이름 길이 확인
  body('name')
    .isLength({ min: 2, max: 10 })
    .withMessage('2자 이상 10자 이하로 입력해주세요'),

  // role 값 검증
  body('role')
    .isIn(['admin', 'manager', 'user'])
    .withMessage('admin, manager, user 중에 하나만 입력해주세요'),
];

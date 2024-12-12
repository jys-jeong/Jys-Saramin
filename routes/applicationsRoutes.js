const express = require('express');
const router = express.Router();
const { createApplication, getApplications, cancelApplication } = require('../controllers/applicationsController');
const authMiddleware = require('../middlewares/authMiddleware');  // 인증 미들웨어

// 지원하기
router.post('/', authMiddleware, createApplication);

// 지원 내역 조회
router.get('/', authMiddleware, getApplications);

// 지원 취소
router.delete('/:id', authMiddleware, cancelApplication);

module.exports = router;

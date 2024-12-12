const express = require('express');
const router = express.Router();
const { createApplication, getApplications, cancelApplication } = require('../controllers/applicationsController');
const { authenticate } = require('../middlewares/authMiddleware');

// 지원하기
router.post('/', authenticate, createApplication);

// 지원 내역 조회
router.get('/', authenticate, getApplications);

// 지원 취소
router.delete('/:id', authenticate, cancelApplication);

module.exports = router;

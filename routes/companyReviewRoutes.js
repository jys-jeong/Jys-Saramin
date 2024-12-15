// routes/companyReviewRoutes.js
const express = require('express');
const { createReview, getReviews, deleteReview } = require('../controllers/companyReviewController');
const { authenticate } = require('../middlewares/authMiddleware'); // 인증 미들웨어
const authorize = require('../middlewares/permissionMiddleware');
const router = express.Router();

// 리뷰 등록
router.post('/', authenticate, createReview);

// 리뷰 조회
router.get('/', authenticate, getReviews);

// 리뷰 삭제
router.delete('/:id', authenticate, authorize(['admin']), deleteReview);

module.exports = router;

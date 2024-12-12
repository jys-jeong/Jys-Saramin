// routes/bookmarkRoutes.js
const express = require('express');
const { toggleBookmark, getBookmarks } = require('../controllers/bookmarkController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// 북마크 추가/제거 (토글 처리)
router.post('/', authenticate, toggleBookmark);

// 사용자별 북마크 목록 조회
router.get('/', authenticate, getBookmarks);

module.exports = router;

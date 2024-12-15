const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/permissionMiddleware');
const jobController = require('../controllers/jobController');

// 채용 공고 목록 조회 (GET /jobs)
router.get('/', jobController.getJobPostings);

// 채용 공고 상세 조회 (GET /jobs/:id)
router.get('/:id', jobController.getJobPostingById);

// 채용 공고 등록 (POST /jobs)
router.post('/', authenticate,jobController.createJobPosting);

// 채용 공고 수정 (PUT /jobs/:id)
router.put('/:id', authenticate, jobController.updateJobPosting);

// 채용 공고 삭제 (DELETE /jobs/:id)
router.delete('/:id', authenticate,authorize(['admin']),jobController.deleteJobPosting);

module.exports = router;

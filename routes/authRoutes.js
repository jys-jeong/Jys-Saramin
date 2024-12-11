const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const { registerValidation, validate } = require('../middlewares/validationMiddleware');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.put('/profile', authenticate, authController.updateProfile);

module.exports = router;

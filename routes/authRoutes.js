const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/permissionMiddleware');
const { registerValidation, validate } = require('../middlewares/validationMiddleware');

router.post('/register', registerValidation,validate, authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.put('/profile', authenticate, authController.updateProfile);
router.get('/user/profile',authenticate, authController.getProfile);
router.delete('/user/:id', authenticate, authorize(['admin']), authController.deleteAccount);

module.exports = router;

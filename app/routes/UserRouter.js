const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);
router.delete('/:id', authMiddleware, UserController.deleteUser);


module.exports = router;
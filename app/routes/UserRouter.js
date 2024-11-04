const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.patch('/:id', authMiddleware, UserController.updateProfile);
router.get('/detail/:id', authMiddleware, UserController.getdetailUser);

module.exports = router;
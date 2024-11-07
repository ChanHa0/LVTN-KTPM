const express = require('express');
const UserController = require('../controllers/UserController');
// // const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/all', UserController.getAllUsers);

module.exports = router;
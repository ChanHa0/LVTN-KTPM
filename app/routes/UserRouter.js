const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/all', UserController.getAllUser);
router.get('/:id', UserController.getDetailUser);

module.exports = router;
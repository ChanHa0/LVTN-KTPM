const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/all', UserController.getAllUsers);
router.get('/:id', UserController.getDetailUser);
router.put('/:id', UserController.updateProfile);

module.exports = router;
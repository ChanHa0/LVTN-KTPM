const express = require('express');
const CartController = require('../controllers/CartController');

const router = express.Router();
router.post('/', CartController.addToCart);
router.patch('/:id', CartController.editToCart);
router.delete('/:id', CartController.deleteToCart);
router.get('/', CartController.getCart);
router.post('/order', CartController.order);

module.exports = router;
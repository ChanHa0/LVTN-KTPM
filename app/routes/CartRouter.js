const express = require('express');
const CartController = require('../controllers/CartController');
const router = express.Router();

router.post('/', CartController.addToCart);
router.put('/:id/:prId', CartController.updateCartItem);
router.delete('/:id/:prId', CartController.removeFromCart);
router.get('/:uId', CartController.getCart);
router.post('/multiple', CartController.addMultipleToCart);

module.exports = router;
const express = require('express');
const CartController = require('../controllers/CartController');

const router = express.Router();
router.post('/', CartController.addToCart);
router.put('/:id/:prId', CartController.editToCart);
router.delete('/:id/:prId', CartController.deleteToCart);
router.get('/:uId', CartController.getCart);

module.exports = router;
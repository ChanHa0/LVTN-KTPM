const express = require('express');
const OrderController = require('../controllers/OrderController');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', OrderController.createOrder);
router.patch('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.get('/all', OrderController.getAllOrders);

module.exports = router;
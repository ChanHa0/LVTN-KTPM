const express = require('express');
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', authMiddleware, OrderController.createOrder);
router.patch('/:id', authMiddleware, OrderController.updateOrder);
router.delete('/:id', authMiddleware, OrderController.deleteOrder);
router.get('/all', OrderController.getAllOrders);
router.get('/detail/:id', OrderController.getOrderDetail);

module.exports = router;
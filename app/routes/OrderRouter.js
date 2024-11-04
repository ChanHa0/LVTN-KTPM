const express = require('express');
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/create', authMiddleware, OrderController.createOrder);
router.put('/update/:id', authMiddleware, OrderController.updateOrder);
router.delete('/delete/:id', authMiddleware, OrderController.deleteOrder);
router.get('/get-all-orders', OrderController.getAllOrders);
router.get('/get-order-detail/:id', OrderController.getOrderDetail);

module.exports = router;
const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();
router.post('/', OrderController.createOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.put('/confirm/:id', OrderController.confirmOrder);
router.put('/cancel/:id', OrderController.cancelOrder);
router.get('/all', OrderController.getAllOrders);
router.get('/:id', OrderController.getDetailOrder);

module.exports = router;

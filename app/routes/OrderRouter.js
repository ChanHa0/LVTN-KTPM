const express = require('express')
const OrderController = require('../controllers/OrderController')

const router = express.Router()
router.post('/', OrderController.createOrder)
router.put('/:id', OrderController.updateOrder)
router.delete('/:id', OrderController.cancelOrder)
router.get('/all', OrderController.getAllOrder)
router.get('/:id', OrderController.getDetailOrder)

module.exports = router
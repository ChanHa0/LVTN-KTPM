const express = require('express');
const router = express.Router();
const StatisticController = require('../controllers/StatisticController');

router.get('/revenue', StatisticController.getTotalRevenue);
router.get('/orders', StatisticController.getTotalOrder);
router.get('/products-sold', StatisticController.getTotalProductSold);
router.get('/product-inventory', StatisticController.getProductInventory);

module.exports = router;
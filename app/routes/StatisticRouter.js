const express = require('express');
const router = express.Router();
const StatisticController = require('../controllers/StatisticController');

router.get('/revenue', StatisticController.getRevenue);
router.get('/top-products', StatisticController.getTopProducts);
router.get('/dashboard', StatisticController.getDashboardStats);

module.exports = router;
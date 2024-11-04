const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const OrderRouter = require('./OrderRouter');
const express = require('express');
const router = express.Router();
// Thêm các route

router.use('/users', UserRouter);
router.use('/products', ProductRouter);
router.use('/orders', OrderRouter);

module.exports = (app) => {
    app.use('/api', router);
};
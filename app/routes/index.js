const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const express = require('express');
const router = express.Router();
// Thêm các route
router.use('/users', UserRouter);
router.use('/products', ProductRouter);

module.exports = (app) => {
    app.use('/api', router);
};
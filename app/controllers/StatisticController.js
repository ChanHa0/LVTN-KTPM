const StatisticService = require('../services/StatisticService');

const StatisticController = {
    // Lấy thống kê doanh thu
    getTotalRevenue: async (req, res) => {
        try {
            const { status, message, data } = await StatisticService.getTotalRevenue();
            return res.status(200).json({ status, message, data });
        } catch (error) {
            return res.status(500).json({ status: 'ERR', message: 'Lỗi lấy thống kê doanh thu', error: error.message });
        }
    },
    // Lấy thống kê số lượng đơn hàng
    getTotalOrder: async (req, res) => {
        try {
            const { status, message, data } = await StatisticService.getTotalOrder();
            return res.status(200).json({ status, message, data });
        } catch (error) {
            return res.status(500).json({ status: 'ERR', message: 'Lỗi lấy thống kê số lượng đơn hàng', error: error.message });
        }
    },
    // Lấy thống kê số lượng sản phẩm đã bán
    getTotalProductSold: async (req, res) => {
        try {
            const { status, message, data } = await StatisticService.getTotalProductSold();
            return res.status(200).json({ status, message, data });
        } catch (error) {
            return res.status(500).json({ status: 'ERR', message: 'Lỗi lấy thống kê số lượng sản phẩm đã bán', error: error.message });
        }
    },
    // Lấy thống kê số lượng sản phẩm tồn kho
    getProductInventory: async (req, res) => {
        try {
            const { status, message, data } = await StatisticService.getProductInventory();
            return res.status(200).json({ status, message, data });
        } catch (error) {
            return res.status(500).json({ status: 'ERR', message: 'Lỗi lấy thống kê số lượng sản phẩm tồn kho', error: error.message });
        }
    },
};

module.exports = StatisticController;
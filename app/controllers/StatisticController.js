const StatisticService = require('../services/StatisticService');

const StatisticController = {
    async getRevenue(req, res) {
        try {
            const result = await StatisticService.getRevenue(req.query);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    async getTopProducts(req, res) {
        try {
            const result = await StatisticService.getTopProducts(req.query);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    async getDashboardStats(req, res) {
        try {
            const result = await StatisticService.getDashboardStats();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
};

module.exports = StatisticController;
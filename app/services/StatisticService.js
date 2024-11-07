const { Order, Product, User, sequelize } = require('../models');
const { Op } = require('sequelize');

const StatisticService = {
    getRevenue: async (query) => {
        try {
            const { startDate, endDate, groupBy = 'day' } = query;

            let dateFormat;
            switch (groupBy) {
                case 'month':
                    dateFormat = '%Y-%m';
                    break;
                case 'year':
                    dateFormat = '%Y';
                    break;
                default:
                    dateFormat = '%Y-%m-%d';
            }

            const revenue = await Order.findAll({
                attributes: [
                    [sequelize.fn('DATE_FORMAT', sequelize.col('oOrderdate'), dateFormat), 'date'],
                    [sequelize.fn('SUM', sequelize.col('oTotalamount')), 'total'],
                    [sequelize.fn('COUNT', sequelize.col('oId')), 'orderCount']
                ],
                where: {
                    oOrderdate: {
                        [Op.between]: [startDate, endDate]
                    },
                    oStatus: true
                },
                group: [sequelize.fn('DATE_FORMAT', sequelize.col('oOrderdate'), dateFormat)],
                order: [[sequelize.col('date'), 'ASC']]
            });

            return {
                status: 'OK',
                message: 'Lấy thống kê doanh thu thành công',
                data: revenue
            };
        } catch (error) {
            return {
                status: 'ERR',
                message: 'Lỗi khi lấy thống kê doanh thu',
                error: error.message
            };
        }
    },

    getTopProducts: async (query) => {
        try {
            const { limit = 10, startDate, endDate } = query;

            const topProducts = await Product.findAll({
                attributes: [
                    'prId',
                    'prTitle',
                    'prAuthor',
                    'prPrice',
                    [sequelize.fn('COUNT', sequelize.col('Orders.oId')), 'orderCount'],
                    [sequelize.fn('SUM', sequelize.col('Orders.oTotalamount')), 'revenue']
                ],
                include: [{
                    model: Order,
                    attributes: [],
                    where: {
                        oOrderdate: {
                            [Op.between]: [startDate, endDate]
                        },
                        oStatus: true
                    }
                }],
                group: ['Product.prId'],
                order: [[sequelize.literal('orderCount'), 'DESC']],
                limit: parseInt(limit)
            });

            return {
                status: 'OK',
                message: 'Lấy thống kê sản phẩm bán chạy thành công',
                data: topProducts
            };
        } catch (error) {
            return {
                status: 'ERR',
                message: 'Lỗi khi lấy thống kê sản phẩm',
                error: error.message
            };
        }
    },

    getDashboardStats: async () => {
        try {
            const totalRevenue = await Order.sum('oTotalamount', {
                where: { oStatus: true }
            });

            const totalOrders = await Order.count({
                where: { oStatus: true }
            });

            const totalProducts = await Product.count();

            const totalUsers = await User.count({
                where: { uIsadmin: false }
            });

            return {
                status: 'OK',
                message: 'Lấy thống kê tổng quan thành công',
                data: {
                    totalRevenue,
                    totalOrders,
                    totalProducts,
                    totalUsers
                }
            };
        } catch (error) {
            return {
                status: 'ERR',
                message: 'Lỗi khi lấy thống kê tổng quan',
                error: error.message
            };
        }
    }
};

module.exports = StatisticService;
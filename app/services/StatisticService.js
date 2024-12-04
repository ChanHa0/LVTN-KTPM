const Order = require('../models/Orders');
const Product = require('../models/Products');

const StatisticService = {
    getTotalRevenue: async () => {
        try {
            const orders = await Order.find();
            const totalRevenue = orders.reduce((sum, order) => sum + order.oTotalPrice, 0);
            return { status: 'OK', message: 'Lấy thống kê doanh thu thành công', data: totalRevenue };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê doanh thu', error: error.message };
        }
    },

    getTotalOrder: async () => {
        try {
            const totalOrder = await Order.countDocuments();
            return { status: 'OK', message: 'Lấy thống kê số lượng đơn hàng thành công', data: totalOrder };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê số lượng đơn hàng', error: error.message };
        }
    },

    getTotalProductSold: async () => {
        try {
            const orders = await Order.find();
            const totalProductSold = orders.reduce((sum, order) => {
                return sum + order.oItems.reduce((itemSum, item) => itemSum + item.prQuantity, 0);
            }, 0);
            return { status: 'OK', message: 'Lấy thống kê số lượng sản phẩm đã bán thành công', data: totalProductSold };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê số lượng sản phẩm đã bán', error: error.message };
        }
    },

    getProductInventory: async () => {
        try {
            const products = await Product.find();
            const totalProductInventory = products.reduce((sum, product) => sum + product.prStockQuantity, 0);
            return { status: 'OK', message: 'Lấy thống kê số lượng sản phẩm tồn kho thành công', data: totalProductInventory };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê số lượng sản phẩm tồn kho', error: error.message };
        }
    }
}

module.exports = StatisticService;
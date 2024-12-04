const Order = require('../models/Orders');
const Product = require('../models/Products');

const StatisticService = {
    getTotalRevenue: async () => {
        try {
            const orders = await Order.find();
            const totalRevenue = orders.reduce((sum, order) => sum + order.oTotal, 0);
            if (!totalRevenue) {
                return { status: 'ERR', message: 'Không có doanh thu' };
            }
            return { status: 'OK', message: 'Lấy thống kê doanh thu thành công', data: totalRevenue };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê doanh thu', error: error.message };
        }
    },

    getTotalOrder: async () => {
        try {
            const orders = await Order.find();
            const totalOrder = orders.length;
            if (!totalOrder) {
                return { status: 'ERR', message: 'Không có đơn hàng' };
            }
            return { status: 'OK', message: 'Lấy thống kê số lượng đơn hàng thành công', data: totalOrder };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê số lượng đơn hàng', error: error.message };
        }
    },

    getTotalProductSold: async () => {
        try {
            const orders = await Order.find();
            const totalProductSold = orders.reduce((sum, order) => sum + order.oQuantity, 0);
            if (!totalProductSold) {
                return { status: 'ERR', message: 'Không có sản phẩm đã bán' };
            }
            return { status: 'OK', message: 'Lấy thống kê số lượng sản phẩm đã bán thành công', data: totalProductSold };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê số lượng sản phẩm đã bán', error: error.message };
        }
    },

    getProductInventory: async () => {
        try {
            const products = await Product.find();
            const totalProductInventory = products.reduce((sum, product) => sum + product.prStockQuantity, 0);
            if (!totalProductInventory) {
                return { status: 'ERR', message: 'Không có sản phẩm tồn kho' };
            }
            return { status: 'OK', message: 'Lấy thống kê số lượng sản phẩm tồn kho thành công', data: totalProductInventory };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy thống kê số lượng sản phẩm tồn kho', error: error.message };
        }
    }
}

module.exports = StatisticService;
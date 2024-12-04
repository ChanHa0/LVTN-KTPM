const Order = require('../models/Orders');
const Product = require('../models/Products');

const OrderService = {
    createOrder: async (orderData) => {
        const { uId, oItems, oTotalPrice, oShippingAddress, oShippingMethod, oPaymentMethod } = orderData;
        try {
            // Tạo đơn hàng mới
            const newOrder = await Order.create({
                uId,
                oItems,
                oTotalPrice,
                oShippingAddress,
                oShippingMethod,
                oPaymentMethod,
                oStatus: 'PENDING', // Đơn hàng mới thường có trạng thái PENDING
            });

            return { status: 'OK', message: 'Tạo đơn hàng thành công', data: newOrder };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi tạo đơn hàng', error: error.message };
        }
    },

    updateOrder: async (id, orderData) => {
        try {
            const order = await Order.findById(id);
            if (!order) {
                return { status: 'ERR', message: 'Đơn hàng không tồn tại' };
            }

            // Cập nhật thông tin đơn hàng
            Object.assign(order, orderData);
            await order.save();

            return { status: 'OK', message: 'Cập nhật đơn hàng thành công', data: order };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi cập nhật đơn hàng', error: error.message };
        }
    },

    deleteOrder: async (id) => {
        try {
            const order = await Order.findById(id);
            if (!order) {
                return { status: 'ERR', message: 'Đơn hàng không tồn tại' };
            }

            // Xóa đơn hàng
            await Order.findByIdAndDelete(id);

            return { status: 'OK', message: 'Xóa đơn hàng thành công' };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi xóa đơn hàng', error: error.message };
        }
    },

    confirmOrder: async (id) => {
        try {
            await Order.findByIdAndUpdate(id, { oStatus: 'CONFIRMED' });
            return { status: 'OK', message: 'Xác nhận đơn hàng thành công' };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi xác nhận đơn hàng', error: error.message };
        }
    },

    cancelOrder: async (id) => {
        try {
            await Order.findByIdAndUpdate(id, { oStatus: 'CANCELLED' });
            return { status: 'OK', message: 'Hủy đơn hàng thành công' };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi hủy đơn hàng', error: error.message };
        }
    },

    getAllOrders: async () => {
        try {
            const orders = await Order.find().populate('oItems.prId');
            return { status: 'OK', message: 'Lấy danh sách đơn hàng thành công', data: orders };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy danh sách đơn hàng', error: error.message };
        }
    },

    getDetailOrder: async (id) => {
        try {
            const order = await Order.findById(id).populate('oItems.prId');
            if (!order) {
                return { status: 'ERR', message: 'Đơn hàng không tồn tại' };
            }
            return { status: 'OK', message: 'Lấy chi tiết đơn hàng thành công', data: order };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy chi tiết đơn hàng', error: error.message };
        }
    },
};

module.exports = OrderService;
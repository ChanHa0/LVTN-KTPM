const Order = require('../models/order');

const OrderService = {
    createOrder: async (orderData) => {
        const { uId, cId, oTotalamount, oShippingaddress, oShippingmethod } = orderData;
        try {
            const newOrder = await Order.create({
                uId,
                cId,
                oTotalamount,
                oShippingaddress,
                oShippingmethod,
                oStatus: true, // Đơn hàng mới thường có trạng thái true (đã đặt)
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
            Object.assign(order, orderData);
            await order.save();
            return { status: 'OK', message: 'Cập nhật đơn hàng thành công', data: order };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi cập nhật đơn hàng', error: error.message };
        }
    },

    cancelOrder: async (id) => {
        try {
            const order = await Order.findById(id);
            if (!order) {
                return { status: 'ERR', message: 'Đơn hàng không tồn tại' };
            }
            order.oStatus = false; // Cập nhật trạng thái đơn hàng thành false (hủy)
            await order.save();
            return { status: 'OK', message: 'Hủy đơn hàng thành công' };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi hủy đơn hàng', error: error.message };
        }
    },

    getAllOrder: async () => {
        try {
            const orders = await Order.find().populate('uId').populate('cId');
            return { status: 'OK', message: 'Lấy danh sách đơn hàng thành công', data: orders };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy danh sách đơn hàng', error: error.message };
        }
    },

    getDetailOrder: async (id) => {
        try {
            const order = await Order.findById(id).populate('uId').populate('cId');
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
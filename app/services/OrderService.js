const Order = require('../models/order');
const OrderDetail = require('../models/orderdetail');
const Product = require('../models/product');

const OrderService = {
    createOrder: async (orderData) => {
        const { uId, oTotalamount, oShippingaddress, oShippingmethod, items } = orderData;
        try {
            // Tạo đơn hàng mới
            const newOrder = await Order.create({
                uId,
                oTotalamount,
                oShippingaddress,
                oShippingmethod,
                oStatus: 'PENDING', // Đơn hàng mới thường có trạng thái PENDING
            });

            // Tạo OrderDetail cho từng sản phẩm
            for (const item of items) {
                const orderDetail = new OrderDetail({
                    oId: newOrder._id,
                    prId: item.prId,
                    odQuantity: item.quantity,
                    odPrice: item.price
                });
                await orderDetail.save();
            }

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

            // Cập nhật OrderDetail nếu cần
            if (orderData.items) {
                for (const item of orderData.items) {
                    let orderDetail = await OrderDetail.findOne({ oId: id, prId: item.prId });
                    if (orderDetail) {
                        orderDetail.odQuantity = item.quantity;
                        orderDetail.odPrice = item.price;
                        await orderDetail.save();
                    } else {
                        // Nếu không tìm thấy OrderDetail, tạo mới
                        orderDetail = new OrderDetail({
                            oId: id,
                            prId: item.prId,
                            odQuantity: item.quantity,
                            odPrice: item.price
                        });
                        await orderDetail.save();
                    }
                }
            }

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

            // Xóa các OrderDetail liên quan
            await OrderDetail.deleteMany({ oId: id });

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
            const orders = await Order.find().populate('orderDetails');
            return { status: 'OK', message: 'Lấy danh sách đơn hàng thành công', data: orders };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy danh sách đơn hàng', error: error.message };
        }
    },

    getDetailOrder: async (id) => {
        try {
            const order = await Order.findById(id).populate('orderDetails');
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
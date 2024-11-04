const DB = require('../models');
const Order = DB.Order;
const OrderItem = DB.OrderItem; // Giả sử bạn có mô hình OrderItem

const createOrder = async (orderData) => {
    try {
        const { customerId, items, total } = orderData;
        const order = await Order.create({ customerId, total });

        for (const item of items) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            });
        }

        return {
            status: 'OK',
            message: 'Tạo đơn hàng thành công',
            data: order
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateOrder = async (id, data) => {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy đơn hàng'
            };
        }

        await order.update(data);
        return {
            status: 'OK',
            message: 'Cập nhật đơn hàng thành công',
            data: order
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteOrder = async (id) => {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy đơn hàng'
            };
        }

        await order.destroy();
        return {
            status: 'OK',
            message: 'Xóa đơn hàng thành công'
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllOrders = async () => {
    try {
        const orders = await Order.findAll();
        return {
            status: 'OK',
            message: 'Lấy danh sách đơn hàng thành công',
            data: orders
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getOrderDetail = async (id) => {
    try {
        const order = await Order.findByPk(id, {
            include: [{ model: OrderItem }] // Giả sử bạn có mô hình OrderItem
        });
        if (!order) {
            return {
                status: 'ERR',
                message: 'Không tìm thấy đơn hàng'
            };
        }

        return {
            status: 'OK',
            message: 'Lấy chi tiết đơn hàng thành công',
            data: order
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderDetail
};
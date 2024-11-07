const { Order, User, Cart } = require('../models');

const OrderService = {
    createOrder: async (orderData) => {
        try {
            const { uId, cId, oTotalamount, oShippingaddress, oShippingmethod } = orderData;

            // Kiểm tra user tồn tại
            const user = await User.findByPk(uId);
            if (!user) {
                return { status: 'ERR', message: 'Không tìm thấy người dùng' };
            }

            // Kiểm tra cart tồn tại
            const cart = await Cart.findByPk(cId);
            if (!cart) {
                return { status: 'ERR', message: 'Không tìm thấy giỏ hàng' };
            }

            // Tạo đơn hàng mới
            const order = await Order.create({
                uId,
                cId,
                oOrderdate: new Date(),
                oTotalamount,
                oStatus: true,
                oShippingaddress,
                oShippingmethod
            });

            return { status: 'OK', message: 'Tạo đơn hàng thành công', data: order };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi tạo đơn hàng', error: error.message };
        }
    },

    updateOrder: async (id, updateData) => {
        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return { status: 'ERR', message: 'Không tìm thấy đơn hàng' };
            }

            await order.update(updateData);

            return { status: 'OK', message: 'Cập nhật đơn hàng thành công', data: order };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi cập nhật đơn hàng', error: error.message };
        }
    },

    deleteOrder: async (id) => {
        try {
            const order = await Order.findByPk(id);
            if (!order) {
                return { status: 'ERR', message: 'Không tìm thấy đơn hàng' };
            }

            await order.destroy();
            return { status: 'OK', message: 'Xóa đơn hàng thành công' };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi xóa đơn hàng', error: error.message };
        }
    },

    getAllOrders: async (query = {}) => {
        try {
            const { page = 1, limit = 10, status } = query;
            const offset = (page - 1) * limit;

            let queryOptions = {
                offset,
                limit: parseInt(limit),
                include: [
                    { model: User },
                    { model: Cart }
                ],
                order: [['oOrderdate', 'DESC']]
            };

            if (status !== undefined) {
                queryOptions.where = { oStatus: status };
            }

            const orders = await Order.findAndCountAll(queryOptions);

            return {
                status: 'OK',
                message: 'Lấy danh sách đơn hàng thành công',
                data: {
                    orders: orders.rows,
                    pagination: {
                        total: orders.count,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(orders.count / limit)
                    }
                }
            };
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi lấy danh sách đơn hàng', error: error.message };
        }
    },

    getOrderById: async (id) => {
        try {
            const order = await Order.findByPk(id, {
                include: [
                    { model: User },
                    { model: Cart }
                ]
            });

            if (!order) {
                return { status: 'ERR', message: 'Không tìm thấy đơn hàng' };
            }

            return { status: 'OK', message: 'Lấy chi tiết đơn hàng thành công', data: order };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi lấy chi tiết đơn hàng', error: error.message };
        }
    }
};

module.exports = OrderService;
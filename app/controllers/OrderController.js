const { OrderService } = require('../services/OrderService');

const OrderController = {
    createOrder: async (req, res) => {
        try {
            const { customerId, items, total } = req.body;
            const order = await OrderService.createOrder({ customerId, items, total });
            res.status(201).json({
                status: 'OK',
                message: 'Tạo đơn hàng thành công',
                data: order
            });
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedOrder = await OrderService.updateOrder(id, req.body);
            res.json({
                status: 'OK',
                message: 'Cập nhật đơn hàng thành công',
                data: updatedOrder
            });
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;
            await OrderService.deleteOrder(id);
            res.json({
                status: 'OK',
                message: 'Xóa đơn hàng thành công'
            });
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const orders = await OrderService.getAllOrders();
            res.json({
                status: 'OK',
                message: 'Lấy danh sách đơn hàng thành công',
                data: orders
            });
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },
    getOrderDetail: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderDetail(id);
            res.json({
                status: 'OK',
                message: 'Lấy chi tiết đơn hàng thành công',
                data: order
            });
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
};

module.exports = OrderController;
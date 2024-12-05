const OrderService = require('../services/OrderService');

const OrderController = {
    // Tạo đơn hàng
    createOrder: async (req, res) => {
        try {
            const result = await OrderService.createOrder(req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Cập nhật đơn hàng
    updateOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await OrderService.updateOrder(id, req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Xóa đơn hàng
    deleteOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await OrderService.deleteOrder(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Xác nhận đơn hàng
    confirmOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await OrderService.confirmOrder(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Hủy đơn hàng
    cancelOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await OrderService.cancelOrder(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Lấy tất cả đơn hàng
    getAllOrders: async (req, res) => {
        try {
            const result = await OrderService.getAllOrders();
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Lấy chi tiết đơn hàng
    getDetailOrder: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await OrderService.getDetailOrder(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    paypalTransactionComplete: async (req, res) => {
        try {
            const { orderID } = req.body;
            console.log(`Transaction completed with order ID: ${orderID}`);
            res.status(200).send('Transaction completed');
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
};

module.exports = OrderController;


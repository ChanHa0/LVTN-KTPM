const OrderService = require('../services/OrderService');

const OrderController = {
    // Create order
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
    // Update order
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
    // Delete order
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
    // Confirm order
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
    // Cancel order
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
    // Get all order
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
    // Get detail order
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
};

module.exports = OrderController;


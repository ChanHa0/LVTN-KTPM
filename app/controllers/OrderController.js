const OrderService = require('../services/OrderService');

const OrderController = {
    async createOrder(req, res) {
        try {
            const result = await OrderService.createOrder(req.body);
            if (result.status === 'ERR') {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await OrderService.updateOrder(id, req.body);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const result = await OrderService.deleteOrder(id);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async getAllOrders(req, res) {
        try {
            const { page = 1, limit = 10, status } = req.query;
            const result = await OrderService.getAllOrders({ page, limit, status });

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const result = await OrderService.getOrderById(id);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    }
};

module.exports = OrderController;
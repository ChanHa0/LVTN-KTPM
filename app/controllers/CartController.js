const CartService = require('../services/CartService');

const CartController = {
    addToCart: async (req, res) => {
        try {
            const result = await CartService.addToCart(req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(201).json(result);

        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    editToCart: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await CartService.editToCart(id, req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    deleteToCart: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await CartService.deleteToCart(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    getCart: async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await CartService.getCart(userId);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    order: async (req, res) => {
        try {
            const result = await CartService.order(req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(201).json(result);

        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    }
};

module.exports = CartController;
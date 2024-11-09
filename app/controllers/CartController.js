const CartService = require('../services/CartService');

const CartController = {
    addToCart: async (req, res) => {
        try {
            const result = await CartService.addToCart(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    editToCart: async (req, res) => {
        try {
            const result = await CartService.editToCart(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    deleteToCart: async (req, res) => {
        try {
            const result = await CartService.deleteToCart(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    getCart: async (req, res) => {
        try {
            const result = await CartService.getCart(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    order: async (req, res) => {
        try {
            const result = await CartService.order(req.body);
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    }
};

module.exports = CartController;
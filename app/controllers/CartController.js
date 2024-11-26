const CartService = require('../services/CartService');

const CartController = {
    // Add to cart
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
    // Edit to cart
    editToCart: async (req, res) => {
        try {
            const { id, prId } = req.params;
            const result = await CartService.editToCart(id, prId, req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Delete to cart
    deleteToCart: async (req, res) => {
        try {
            const { id, prId } = req.params;
            const result = await CartService.deleteToCart(id, prId);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Get cart
    getCart: async (req, res) => {
        try {
            const { uId } = req.params;
            const result = await CartService.getCart(uId);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
};

module.exports = CartController;
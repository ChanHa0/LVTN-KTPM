const CartService = require('../services/CartService');

const CartController = {
    // Thêm sản phẩm vào giỏ hàng
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
    // Sửa sản phẩm trong giỏ hàng
    updateCartItem: async (req, res) => {
        try {
            const { id, prId } = req.params;
            const result = await CartService.updateCartItem(id, prId, req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Xóa sản phẩm trong giỏ hàng
    removeFromCart: async (req, res) => {
        try {
            const { id, prId } = req.params;
            const result = await CartService.removeFromCart(id, prId);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Lấy giỏ hàng
    getCart: async (req, res) => {
        try {
            const uId = req.params.uId;
            if (!uId) {
                return res.status(404).json({ status: 'ERR', message: 'Id không tồn tại' });
            }
            const result = await CartService.getCart(uId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: "ERR", message: "Lỗi server", error: error.message });
        }
    },
    // Thêm nhiều sản phẩm vào giỏ hàng
    addMultipleToCart: async (req, res) => {
        try {
            const result = await CartService.addMultipleToCart(req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: "ERR", message: "Lỗi server", error: error.message });
        }
    }
};

module.exports = CartController;
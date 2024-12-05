const ProductService = require('../services/ProductService');

const ProductController = {
    // Tạo sản phẩm
    createProduct: async (req, res) => {
        try {
            const result = await ProductService.createProduct(req.body);
            if (result.status === 'ERR') {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Cập nhật sản phẩm
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductService.updateProduct(id, req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Xóa sản phẩm
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductService.deleteProduct(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Lấy tất cả sản phẩm
    getAllProducts: async (req, res) => {
        try {
            const result = await ProductService.getAllProducts();
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Lấy chi tiết sản phẩm
    getDetailProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductService.getDetailProduct(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Tìm kiếm sản phẩm
    searchProducts: async (req, res) => {
        try {
            const result = await ProductService.searchProducts(req.query);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Tạo đánh giá sản phẩm
    createProductReview: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductService.createProductReview(id, req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    getProductReviews: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductService.getProductReviews(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    }
};

module.exports = ProductController;





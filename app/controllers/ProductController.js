const ProductService = require('../services/ProductService');

const ProductController = {
    // Create product
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
    // Update product
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
    // Delete product
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
    // Get all product
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
    // Get detail product
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
    // Search product
    searchProduct: async (req, res) => {
        try {
            const result = await ProductService.searchProduct(req.query);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Get statistics
    getStatisticsProduct: async (req, res) => {
        try {
            const result = await ProductService.getStatisticsProduct();
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
};

module.exports = ProductController;





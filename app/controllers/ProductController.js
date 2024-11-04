const { ProductService } = require('../services/ProductService');

const ProductController = {
    async createProduct(req, res) {
        try {
            const adminId = req.user.id;
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    status: 'ERR',
                    message: 'Không có quyền thực hiện'
                });
            }

            const result = await ProductService.createProduct(req.body, adminId);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductService.updateProduct(id, req.body);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductService.deleteProduct(id);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    async getAllProducts(req, res) {
        try {
            const { page = 1, limit = 10, sort, filter } = req.query;
            const result = await ProductService.getAllProducts({ page, limit, sort, filter });

            res.json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    async getProductDetail(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductService.getProductDetail(id);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },

    async getFeaturedBooks(req, res) {
        try {
            const result = await ProductService.getFeaturedBooks();
            res.json(result);
        } catch (error) {
            console.error('Lỗi getFeaturedBooks:', error);
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    }
};
module.exports = ProductController;
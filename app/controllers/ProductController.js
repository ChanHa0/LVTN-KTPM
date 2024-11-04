const DB = require('../models');
const Product = DB.Product;

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
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'Không tìm thấy sản phẩm'
                });
            }

            await product.update(req.body);

            res.json({
                status: 'OK',
                message: 'Cập nhật sản phẩm thành công',
                data: product
            });
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
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'Không tìm thấy sản phẩm'
                });
            }

            await product.destroy();

            res.json({
                status: 'OK',
                message: 'Xóa sản phẩm thành công'
            });
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
            const offset = (page - 1) * limit;

            let queryOptions = {
                offset,
                limit: parseInt(limit)
            };

            if (sort) {
                const [field, order] = sort.split(',');
                queryOptions.order = [[field, order.toUpperCase()]];
            }

            if (filter) {
                const [field, value] = filter.split(',');
                queryOptions.where = {
                    [field]: value
                };
            }

            const products = await Product.findAndCountAll(queryOptions);

            res.json({
                status: 'OK',
                message: 'Lấy danh sách sản phẩm thành công',
                data: products.rows,
                pagination: {
                    total: products.count,
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(products.count / limit)
                }
            });
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
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'Không tìm thấy sản phẩm'
                });
            }

            res.json({
                status: 'OK',
                message: 'Lấy chi tiết sản phẩm thành công',
                data: product
            });
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
            const products = await Product.findAll({
                where: {
                    PR_FEATURED: 1
                },
                limit: 10,
                order: [['PR_CREATEDAT', 'DESC']]
            });

            const formattedProducts = products.map(product => ({
                ...product.toJSON(),
                PR_PRICE: Number(product.PR_PRICE) || 0
            }));

            res.json({
                status: 'OK',
                message: 'Lấy danh sách sách nổi bật thành công',
                data: formattedProducts
            });
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
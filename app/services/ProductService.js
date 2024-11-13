const { Product } = require('../models');
const { Op } = require('sequelize');

const ProductService = {
    createProduct: async (productData) => {
        const { prTitle, prAuthor, prCategory, prImage, prStockQuanlity, prDescription, prPrice } = productData;
        try {
            // Kiểm tra xem sản phẩm đã tồn tại 
            const existingProduct = await Product.findOne({ where: { prTitle: prTitle } });
            if (existingProduct) {
                return { status: 'ERR', message: 'Sản phẩm đã tồn tại' };
            };
            // Kiểm tra tiêu đề
            if (!prTitle) {
                return { status: 'ERR', message: 'Tiêu đề sản phẩm không được để trống' };
            };
            // Tạo sản phẩm mới
            const newProduct = await Product.create({
                prTitle,
                prAuthor,
                prCategory,
                prImage,
                prDescription,
                prStockQuanlity,
                prPrice
            });
            return { status: 'OK', message: 'Tạo sản phẩm thành công', data: newProduct };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi tạo sản phẩm', error: error.message };
        };
    },

    updateProduct: async (id, productData) => {
        try {
            // Kiểm tra xem sản phẩm có tồn tại 
            const product = await Product.findByPk(id);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            // Cập nhật sản phẩm
            await product.update(productData);
            return { status: 'OK', message: 'Cập nhật sản phẩm thành công', data: product };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi cập nhật sản phẩm', error: error.message };
        }
    },

    deleteProduct: async (id) => {
        try {
            // Kiểm tra xem sản phẩm có tồn tại 
            const product = await Product.findByPk(id);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            // Xóa sản phẩm
            await product.destroy();
            return { status: 'OK', message: 'Xóa sản phẩm thành công' };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi xóa sản phẩm', error: error.message };
        }
    },

    getAllProduct: async () => {
        try {
            // Lấy tất cả sản phẩm mà không cần phân trang
            const product = await Product.findAll();
            return { status: 'OK', message: 'Lấy danh sách sản phẩm thành công', data: product };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy danh sách sản phẩm', error: error.message };
        }
    },

    getDetailProduct: async (id) => {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            return { status: 'OK', message: 'Lấy chi tiết sản phẩm thành công', data: product };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy chi tiết sản phẩm', error: error.message };
        }
    },

    searchProducts: async (query) => {
        try {
            const { keyword, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = query;
            const offset = (page - 1) * limit;
            // Xây dựng điều kiện tìm kiếm
            let whereClause = {};
            // Tìm theo từ khóa
            if (keyword) {
                whereClause = {
                    [Op.or]: [
                        { prTitle: { [Op.like]: `%${keyword}%` } },
                        { prAuthor: { [Op.like]: `%${keyword}%` } },
                        { prDescription: { [Op.like]: `%${keyword}%` } }
                    ]
                };
            }
            // Lọc theo danh mục
            if (category) {
                whereClause.prCategory = category;
            }

            // Lọc theo giá
            if (minPrice || maxPrice) {
                whereClause.prPrice = {};
                if (minPrice) whereClause.prPrice[Op.gte] = minPrice;
                if (maxPrice) whereClause.prPrice[Op.lte] = maxPrice;
            }
            // Xây dựng điều kiện sắp xếp
            let order = [];
            if (sort) {
                switch (sort) {
                    case 'price_asc':
                        order.push(['prPrice', 'ASC']);
                        break;
                    case 'price_desc':
                        order.push(['prPrice', 'DESC']);
                        break;
                    case 'newest':
                        order.push(['createdAt', 'DESC']);
                        break;
                }
            }
            // Thực hiện truy vấn
            const products = await Product.findAndCountAll({
                where: whereClause,
                order: order,
                offset: offset,
                limit: parseInt(limit)
            });

            return {
                status: 'OK',
                message: 'Tìm kiếm sản phẩm thành công',
                data: {
                    products: products.rows,
                    pagination: {
                        total: products.count,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(products.count / limit)
                    }
                }
            };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi tìm kiếm sản phẩm', error: error.message };
        }
    },
};

module.exports = ProductService;
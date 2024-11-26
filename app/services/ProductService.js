const Product = require('../models/product');

const ProductService = {
    createProduct: async (productData) => {
        const { prTitle, prAuthor, prCategory, prImage, prStockQuantity, prDescription, prPrice } = productData;
        try {
            // Kiểm tra xem sản phẩm đã tồn tại
            const existingProduct = await Product.findOne({ prTitle });
            if (existingProduct) {
                return { status: 'ERR', message: 'Sản phẩm đã tồn tại' };
            }
            // Kiểm tra tiêu đề
            if (!prTitle) {
                return { status: 'ERR', message: 'Tiêu đề sản phẩm không được để trống' };
            }
            // Tạo sản phẩm mới
            const newProduct = await Product.create({
                prTitle,
                prAuthor,
                prCategory,
                prImage,
                prDescription,
                prStockQuantity,
                prPrice
            });
            return { status: 'OK', message: 'Tạo sản phẩm thành công', data: newProduct };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi tạo sản phẩm', error: error.message };
        }
    },

    updateProduct: async (id, productData) => {
        try {
            // Kiểm tra xem sản phẩm có tồn tại
            const product = await Product.findById(id);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            // Cập nhật sản phẩm
            Object.assign(product, productData);
            await product.save();
            return { status: 'OK', message: 'Cập nhật sản phẩm thành công', data: product };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi cập nhật sản phẩm', error: error.message };
        }
    },

    deleteProduct: async (id) => {
        try {
            // Kiểm tra xem sản phẩm có tồn tại
            const product = await Product.findById(id);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            // Xóa sản phẩm
            await Product.findByIdAndDelete(id);
            return { status: 'OK', message: 'Xóa sản phẩm thành công' };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi xóa sản phẩm', error: error.message };
        }
    },

    getAllProduct: async () => {
        try {
            // Lấy tất cả sản phẩm
            const products = await Product.find();
            return { status: 'OK', message: 'Lấy danh sách sản phẩm thành công', data: products };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy danh sách sản phẩm', error: error.message };
        }
    },

    getDetailProduct: async (id) => {
        try {
            const product = await Product.findById(id);
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
            const skip = (page - 1) * limit;
            // Xây dựng điều kiện tìm kiếm
            let filter = {};
            // Tìm theo từ khóa
            if (keyword) {
                filter.$or = [
                    { prTitle: { $regex: keyword, $options: 'i' } },
                    { prAuthor: { $regex: keyword, $options: 'i' } },
                    { prDescription: { $regex: keyword, $options: 'i' } }
                ];
            }
            // Lọc theo danh mục
            if (category) {
                filter.prCategory = category;
            }
            // Lọc theo giá
            if (minPrice || maxPrice) {
                filter.prPrice = {};
                if (minPrice) filter.prPrice.$gte = minPrice;
                if (maxPrice) filter.prPrice.$lte = maxPrice;
            }
            // Xây dựng điều kiện sắp xếp
            let sortOption = {};
            if (sort) {
                switch (sort) {
                    case 'price_asc':
                        sortOption.prPrice = 1;
                        break;
                    case 'price_desc':
                        sortOption.prPrice = -1;
                        break;
                    case 'newest':
                        sortOption.createdAt = -1;
                        break;
                }
            }
            // Thực hiện truy vấn
            const products = await Product.find(filter)
                .sort(sortOption)
                .skip(skip)
                .limit(parseInt(limit));

            const total = await Product.countDocuments(filter);

            return {
                status: 'OK',
                message: 'Tìm kiếm sản phẩm thành công',
                data: {
                    products,
                    pagination: {
                        total,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(total / limit)
                    }
                }
            };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi tìm kiếm sản phẩm', error: error.message };
        }
    },
};

module.exports = ProductService;
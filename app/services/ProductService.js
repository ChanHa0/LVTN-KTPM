const Product = require('../models/Products');

const ProductService = {
    createProduct: async (productData) => {
        const { prTitle, prAuthor, prCategory, prImage, prStockQuantity, prDescription, prPrice, prRating, prComment } = productData;
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
                prPrice,
                prRating,
                prComment
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

    getAllProducts: async () => {
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
            // Xây dựng iều kiện tìm kiếm
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
    createProductReview: async (id, reviewData) => {
        try {
            const { uId, prRating, prComment } = reviewData;

            console.log('Received ID:', id); // Log ID nhận được
            console.log('Review Data:', reviewData); // Log dữ liệu đánh giá

            // Kiểm tra ID có đúng định dạng không
            if (!id || id.length !== 24) {
                return {
                    status: 'ERR',
                    message: 'ID sản phẩm không đúng định dạng'
                };
            }

            // Kiểm tra sản phẩm tồn tại
            const product = await Product.findById(id);
            console.log('Found Product:', product); // Log sản phẩm tìm thấy

            if (!product) {
                return {
                    status: 'ERR',
                    message: 'Sản phẩm không tồn tại'
                };
            }

            // Kiểm tra user ID
            if (!uId || uId.length !== 24) {
                return {
                    status: 'ERR',
                    message: 'ID người dùng không hợp lệ'
                };
            }

            // Kiểm tra đánh giá đã tồn tại
            const existingReview = await Review.findOne({
                prId: id,
                uId: uId
            });

            if (existingReview) {
                return {
                    status: 'ERR',
                    message: 'Bạn đã đánh giá sản phẩm này'
                };
            }

            // Tạo đánh giá mới
            const newReview = await Review.create({
                prId: id,
                uId: uId,
                prRating,
                prComment
            });

            console.log('Created Review:', newReview); // Log đánh giá mới tạo

            // Cập nhật rating trung bình
            const allReviews = await Review.find({ prId: id });
            const avgRating = allReviews.reduce((sum, review) => sum + review.prRating, 0) / allReviews.length;

            await Product.findByIdAndUpdate(id, {
                prRating: avgRating
            });

            // Lấy review với thông tin user
            const populatedReview = await Review.findById(newReview._id)
                .populate('uId', 'uName')
                .lean();

            return {
                status: 'OK',
                message: 'Đánh giá sản phẩm thành công',
                data: populatedReview
            };

        } catch (error) {
            console.error('Service Error:', error); // Log lỗi chi tiết
            return {
                status: 'ERR',
                message: 'Lỗi khi tạo đánh giá',
                error: error.message
            };
        }
    },

    getProductReviews: async (id) => {
        try {
            console.log('Getting reviews for ID:', id); // Log ID

            // Kiểm tra ID có đúng định dạng không
            if (!id || id.length !== 24) {
                return {
                    status: 'ERR',
                    message: 'ID sản phẩm không đúng định dạng'
                };
            }

            // Kiểm tra sản phẩm tồn tại
            const product = await Product.findById(id);

            if (!product) {
                return {
                    status: 'ERR',
                    message: 'Sản phẩm không tồn tại'
                };
            }

            // Lấy danh sách đánh giá
            const reviews = await Review.find({ prId: id })
                .populate('uId', 'uName')
                .sort({ createdAt: -1 })
                .lean();

            console.log('Found Reviews:', reviews); // Log reviews tìm thấy

            return {
                status: 'OK',
                message: 'Lấy danh sách đánh giá thành công',
                data: reviews
            };

        } catch (error) {
            console.error('Service Error:', error); // Log lỗi chi tiết
            return {
                status: 'ERR',
                message: 'Lỗi khi lấy đánh giá',
                error: error.message
            };
        }
    }
};

module.exports = ProductService;
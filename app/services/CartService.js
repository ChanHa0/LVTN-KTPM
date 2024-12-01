const Cart = require('../models/cart');
const CartDetail = require('../models/cartdetail');
const Product = require('../models/product');
const User = require('../models/user');
const mongoose = require('mongoose');

const CartService = {
    addToCart: async (cartData) => {
        try {
            const { uId, prId, cdQuantity } = cartData;

            // Kiểm tra user có tồn tại
            const user = await User.findById(uId);
            if (!user) {
                return { status: 'ERR', message: 'Người dùng không tồn tại' };
            }

            // Kiểm tra sản phẩm có tồn tại và còn hàng
            const product = await Product.findById(prId);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            if (product.prStockQuantity < cdQuantity) {
                return {
                    status: 'ERR',
                    message: 'Số lượng sản phẩm trong kho không đủ',
                    available: product.prStockQuantity
                };
            }

            // Tìm hoặc tạo giỏ hàng cho user
            let cart = await Cart.findOne({ uId: uId, cStatus: 'active' });
            if (!cart) {
                cart = await Cart.create({
                    uId: uId,
                    cStatus: 'active'
                });
            }

            // Tạo CartDetail mới
            const cartDetail = new CartDetail({
                cId: cart._id,
                prId: prId,
                cdQuantity: cdQuantity,
                cdTotalPrice: product.prPrice * cdQuantity
            });
            await cartDetail.save();

            return {
                status: 'OK',
                message: 'Thêm sản phẩm vào giỏ hàng thành công',
                data: cartDetail
            };

        } catch (error) {
            console.error('Lỗi addToCart:', error);
            return {
                status: 'ERR',
                message: 'Lỗi khi thêm sản phẩm vào giỏ hàng',
                error: error.message
            };
        }
    },

    editToCart: async (id, prId, cartData) => {
        try {
            const { cdQuantity } = cartData;

            // Kiểm tra CartDetail
            const cartDetail = await CartDetail.findOne({ cId: id, prId: prId });
            if (!cartDetail) {
                return { status: 'ERR', message: 'Không tìm thấy chi tiết giỏ hàng' };
            }

            // Kiểm tra sản phẩm có tồn tại và còn hàng
            const product = await Product.findById(prId);
            if (product.prStockQuantity < cdQuantity) {
                return {
                    status: 'ERR',
                    message: 'Số lượng sản phẩm trong kho không đủ',
                    available: product.prStockQuantity
                };
            }

            // Cập nhật CartDetail
            cartDetail.cdQuantity = cdQuantity;
            cartDetail.cdTotalPrice = product.prPrice * cdQuantity;
            await cartDetail.save();

            return {
                status: 'OK',
                message: 'Cập nhật chi tiết giỏ hàng thành công',
                data: cartDetail
            };
        } catch (error) {
            console.error('Lỗi editToCart:', error);
            return {
                status: 'ERR',
                message: 'Lỗi khi sửa chi tiết giỏ hàng',
                error: error.message
            };
        }
    },

    deleteToCart: async (id, prId) => {
        try {
            const cartDetail = await CartDetail.findOne({ cId: id, prId: prId });

            if (!cartDetail) {
                return {
                    status: 'ERR',
                    message: 'Không tìm thấy chi tiết giỏ hàng'
                };
            }

            await cartDetail.remove();

            return {
                status: 'OK',
                message: 'Xóa sản phẩm khỏi giỏ hàng thành công'
            };
        } catch (error) {
            console.error('Lỗi deleteToCart:', error);
            return {
                status: 'ERR',
                message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
                error: error.message
            };
        }
    },

    getCart: async (userId) => {
        try {
            // Kiểm tra nếu userId là một ObjectId hợp lệ
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return {
                    status: 'ERR',
                    message: 'uId không hợp lệ'
                };
            }

            const cart = await Cart.findOne({
                uId: mongoose.Types.ObjectId(userId),
                cStatus: 'active'
            });

            if (!cart) {
                return {
                    status: 'OK',
                    message: 'Giỏ hàng trống',
                    data: null
                };
            }

            const cartDetails = await CartDetail.find({ cId: cart._id }).populate('prId');

            return {
                status: 'OK',
                message: 'Lấy thông tin giỏ hàng thành công',
                data: cartDetails
            };
        } catch (error) {
            console.error('Lỗi getCart:', error);
            return {
                status: 'ERR',
                message: 'Lỗi khi lấy giỏ hàng',
                error: error.message
            };
        }
    },
};

module.exports = CartService;
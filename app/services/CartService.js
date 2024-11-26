const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');

const CartService = {
    addToCart: async (cartData) => {
        try {
            const { uId, prId, cQuantity } = cartData;

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
            if (product.prStockQuantity < cQuantity) {
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
                    cStatus: 'active',
                    cQuantity: 0,
                    cPrice: 0
                });
            }

            // Cập nhật giỏ hàng
            cart.cQuantity += cQuantity;
            cart.cPrice += product.prPrice * cQuantity;
            await cart.save();

            return {
                status: 'OK',
                message: 'Thêm sản phẩm vào giỏ hàng thành công',
                data: cart
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

    editToCart: async (id, cartData) => {
        try {
            const { cQuantity } = cartData;

            // Kiểm tra giỏ hàng
            const cart = await Cart.findById(id);
            if (!cart) {
                return { status: 'ERR', message: 'Không tìm thấy giỏ hàng' };
            }

            // Kiểm tra sản phẩm có tồn tại và còn hàng
            const product = await Product.findById(cart.prId);
            if (product.prStockQuantity < cQuantity) {
                return {
                    status: 'ERR',
                    message: 'Số lượng sản phẩm trong kho không đủ',
                    available: product.prStockQuantity
                };
            }

            // Cập nhật giỏ hàng
            cart.cQuantity = cQuantity;
            cart.cPrice = product.prPrice * cQuantity;
            await cart.save();

            return {
                status: 'OK',
                message: 'Cập nhật giỏ hàng thành công',
                data: cart
            };
        } catch (error) {
            console.error('Lỗi editToCart:', error);
            return {
                status: 'ERR',
                message: 'Lỗi khi sửa giỏ hàng',
                error: error.message
            };
        }
    },

    deleteToCart: async (id) => {
        try {
            const cart = await Cart.findById(id);

            if (!cart) {
                return {
                    status: 'ERR',
                    message: 'Không tìm thấy giỏ hàng'
                };
            }

            await cart.remove();

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
            const cart = await Cart.findOne({
                uId: userId,
                cStatus: 'active'
            }).populate('prId');

            if (!cart) {
                return {
                    status: 'OK',
                    message: 'Giỏ hàng trống',
                    data: null
                };
            }

            return {
                status: 'OK',
                message: 'Lấy thông tin giỏ hàng thành công',
                data: cart
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
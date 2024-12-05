const User = require('../models/Users');
const Product = require('../models/Products');
const Cart = require('../models/Carts');

const CartService = {
    addToCart: async (cartData) => {
        try {
            const { uId, products } = cartData;

            // Kiểm tra user có tồn tại
            const user = await User.findById(uId);
            if (!user) {
                return { status: 'ERR', message: 'Người dùng không tồn tại' };
            }

            // Tìm hoặc tạo giỏ hàng cho user
            let cart = await Cart.findOne({ uId: uId });
            if (!cart) {
                cart = await Cart.create({
                    uId: uId,
                    cItems: [],
                    cTotalPrice: 0
                });
            }

            let totalPrice = cart.cTotalPrice;
            for (const { prId, prQuantity } of products) {
                // Kiểm tra sản phẩm có tồn tại và còn hàng
                const product = await Product.findById(prId);
                if (!product) {
                    return { status: 'ERR', message: `Sản phẩm với ID ${prId} không tồn tại` };
                }
                if (product.prStockQuantity < prQuantity) {
                    return {
                        status: 'ERR',
                        message: `Số lượng sản phẩm ${prId} trong kho không đủ`,
                        available: product.prStockQuantity
                    };
                }

                // Tính toán giá và cập nhật giỏ hàng
                const itemPrice = product.prPrice * prQuantity;
                totalPrice += itemPrice;

                // Thêm sản phẩm vào giỏ hàng
                const existingItemIndex = cart.cItems.findIndex(item => item.prId.toString() === prId.toString());
                if (existingItemIndex > -1) {
                    // Cập nhật số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
                    cart.cItems[existingItemIndex].prQuantity += prQuantity;
                    cart.cItems[existingItemIndex].prPrice += itemPrice;
                } else {
                    // Thêm sản phẩm mới vào giỏ hàng
                    cart.cItems.push({
                        prId: prId,
                        prQuantity: prQuantity,
                        prPrice: itemPrice
                    });
                }
            }

            cart.cTotalPrice = totalPrice;
            await cart.save();

            return { status: 'OK', message: 'Thêm sản phẩm vào giỏ hàng thành công', data: cart };

        } catch (error) {
            console.error('Lỗi addToCart:', error);
            return { status: 'ERR', message: 'Lỗi khi thêm sản phẩm vào giỏ hàng', error: error.message };
        }
    },

    updateCartItem: async (uId, prId, cartData) => {
        try {
            const { prQuantity } = cartData;

            // Tìm giỏ hàng và sản phẩm
            const cart = await Cart.findOne({ uId: uId });
            if (!cart) {
                return { status: 'ERR', message: 'Không tìm thấy giỏ hàng' };
            }

            const product = await Product.findById(prId);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }

            if (product.prStockQuantity < prQuantity) {
                return { status: 'ERR', message: 'Số lượng sản phẩm trong kho không đủ', available: product.prStockQuantity };
            }

            // Cập nhật sản phẩm trong giỏ hàng
            const itemIndex = cart.cItems.findIndex(item => item.prId.toString() === prId.toString());
            if (itemIndex > -1) {
                cart.cItems[itemIndex].prQuantity = prQuantity;
                cart.cItems[itemIndex].prPrice = product.prPrice * prQuantity;
            } else {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại trong giỏ hàng' };
            }

            // Cập nhật tổng giá
            cart.cTotalPrice = cart.cItems.reduce((total, item) => total + item.prPrice, 0);
            await cart.save();

            return { status: 'OK', message: 'Cập nhật chi tiết giỏ hàng thành công', data: cart };
        } catch (error) {
            console.error('Lỗi updateCartItem:', error);
            return { status: 'ERR', message: 'Lỗi khi sửa chi tiết giỏ hàng', error: error.message };
        }
    },

    removeFromCart: async (uId, prId) => {
        try {
            const cart = await Cart.findOneAndUpdate(
                { uId: uId },
                { $pull: { cItems: { prId: prId } } },
                { new: true }
            );

            if (!cart) {
                return { status: 'ERR', message: 'Không tìm thấy giỏ hàng' };
            }

            // Cập nhật tổng giá
            cart.cTotalPrice = cart.cItems.reduce((total, item) => total + item.prPrice, 0);
            await cart.save();

            return { status: 'OK', message: 'Xóa sản phẩm khỏi giỏ hàng thành công' };
        } catch (error) {
            console.error('Lỗi removeFromCart:', error);
            return { status: 'ERR', message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng', error: error.message };
        }
    },

    getCart: async (uId) => {
        try {
            const cart = await Cart.findOne({ uId: uId }).populate('cItems.prId');
            if (!cart) {
                return { status: 'ERR', message: 'Giỏ hàng trống', data: null };
            }
            return { status: 'OK', message: 'Lấy thông tin giỏ hàng thành công', data: cart };
        } catch (error) {
            console.error('Lỗi getCart:', error);
            return { status: 'ERR', message: 'Lỗi khi lấy giỏ hàng', error: error.message };
        }
    },
};

module.exports = CartService;
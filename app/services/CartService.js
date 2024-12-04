const User = require('../models/Users');
const Product = require('../models/Products');
const Cart = require('../models/Carts');
const CartDetail = require('../models/CartDetails');

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
            let cart = await Cart.findOne({ uId: uId, cStatus: 'active' });
            if (!cart) {
                cart = await Cart.create({
                    uId: uId,
                    cStatus: 'active',
                    cdItems: [],
                    cTotalPrice: 0
                });
            }

            let totalPrice = cart.cTotalPrice;
            for (const { prId, cdQuantity } of products) {
                // Kiểm tra sản phẩm có tồn tại và còn hàng
                const product = await Product.findById(prId);
                if (!product) {
                    return { status: 'ERR', message: `Sản phẩm với ID ${prId} không tồn tại` };
                }
                if (product.prStockQuantity < cdQuantity) {
                    return {
                        status: 'ERR',
                        message: `Số lượng sản phẩm ${prId} trong kho không đủ`,
                        available: product.prStockQuantity
                    };
                }

                // Tính toán giá và cập nhật giỏ hàng
                const itemPrice = product.prPrice * cdQuantity;
                totalPrice += itemPrice;

                // Thêm sản phẩm vào giỏ hàng
                cart.cdItems.push({
                    prId: prId,
                    cdQuantity: cdQuantity,
                    cdPrice: itemPrice
                });
            }

            cart.cTotalPrice = totalPrice;
            await cart.save();

            return { status: 'OK', message: 'Thêm sản phẩm vào giỏ hàng thành công', data: cart };

        } catch (error) {
            console.error('Lỗi addToCart:', error);
            return { status: 'ERR', message: 'Lỗi khi thêm sản phẩm vào giỏ hàng', error: error.message };
        }
    },

    updateCartItem: async (id, prId, cartData) => {
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
                return { status: 'ERR', message: 'Số lượng sản phẩm trong kho không đủ', available: product.prStockQuantity };
            }

            // Cập nhật CartDetail
            cartDetail.cdQuantity = cdQuantity;
            cartDetail.cdTotalPrice = product.prPrice * cdQuantity;
            await cartDetail.save();

            return { status: 'OK', message: 'Cập nhật chi tiết giỏ hàng thành công', data: cartDetail };
        } catch (error) {
            console.error('Lỗi editToCart:', error);
            return { status: 'ERR', message: 'Lỗi khi sửa chi tiết giỏ hàng', error: error.message };
        }
    },

    removeFromCart: async (id, prId) => {
        try {
            const cartDetail = await CartDetail.findOne({ cId: id, prId: prId });

            if (!cartDetail) {
                return { status: 'ERR', message: 'Không tìm thấy chi tiết giỏ hàng' };
            }

            await cartDetail.remove();

            return { status: 'OK', message: 'Xóa sản phẩm khỏi giỏ hàng thành công' };
        } catch (error) {
            console.error('Lỗi deleteToCart:', error);
            return { status: 'ERR', message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng', error: error.message }
        };
    },

    getCart: async (uId) => {
        try {
            // Tìm giỏ hàng của người dùng với trạng thái 'active'
            const cart = await Cart.findOne({ uId: uId, cStatus: 'active' });

            if (!cart) {
                return { status: 'OK', message: 'Giỏ hàng trống', data: null };
            }

            // Lấy chi tiết giỏ hàng và thông tin sản phẩm
            const cartDetails = await CartDetail.find({ cId: cart._id }).populate('prId');

            return { status: 'OK', message: 'Lấy thông tin giỏ hàng thành công', data: cartDetails };
        } catch (error) {
            console.error('Lỗi getCart:', error);
            return { status: 'ERR', message: 'Lỗi khi lấy giỏ hàng', error: error.message };
        }
    },

    addMultipleToCart: async (cartData) => {
        try {
            const { uId, products } = cartData;
            const result = await CartService.addToCart(uId, products);
            return result;
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi thêm nhiều sản phẩm vào giỏ hàng', error: error.message };
        }
    }
};

module.exports = CartService;
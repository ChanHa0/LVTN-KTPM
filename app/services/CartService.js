const { Cart, Product, User, CartDetail } = require('../models');

const CartService = {
    addToCart: async (cartData) => {
        try {
            const { U_ID, PR_ID, CD_QUANTITY } = cartData;

            // Kiểm tra user có tồn tại
            const user = await User.findByPk(U_ID);
            if (!user) {
                return { status: 'ERR', message: 'Người dùng không tồn tại' };
            }

            // Kiểm tra sản phẩm có tồn tại và còn hàng
            const product = await Product.findByPk(PR_ID);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            if (product.prStockQuanlity < CD_QUANTITY) {
                return {
                    status: 'ERR',
                    message: 'Số lượng sản phẩm trong kho không đủ',
                    available: product.prStockQuanlity
                };
            }

            // Tìm hoặc tạo giỏ hàng cho user
            const [cart] = await Cart.findOrCreate({
                where: {
                    uId: U_ID,
                    cStatus: 'active'
                },
                defaults: {
                    uId: U_ID,
                    cStatus: 'active',
                    cTotalprice: 0 // Thêm tổng giá trị giỏ hàng
                }
            });

            // Xử lý chi tiết giỏ hàng
            let cartDetail = await CartDetail.findOne({
                where: {
                    cId: cart.cId,
                    prId: PR_ID
                }
            });

            const itemPrice = product.prPrice;
            if (cartDetail) {
                // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
                const newQuantity = cartDetail.cdQuantity + CD_QUANTITY;
                const newTotalPrice = newQuantity * itemPrice;

                await cartDetail.update({
                    cdQuantity: newQuantity,
                    cdTotalprice: newTotalPrice
                });
            } else {
                // Tạo mới nếu sản phẩm chưa có trong giỏ
                cartDetail = await CartDetail.create({
                    cId: cart.cId,
                    prId: PR_ID,
                    cdQuantity: CD_QUANTITY,
                    cdTotalprice: CD_QUANTITY * itemPrice
                });
            }

            // Cập nhật tổng giá trị giỏ hàng
            const allCartDetails = await CartDetail.findAll({
                where: { cId: cart.cId }
            });
            const cartTotal = allCartDetails.reduce((sum, detail) => sum + detail.cdTotalprice, 0);
            await cart.update({ cTotalprice: cartTotal });

            return {
                status: 'OK',
                message: 'Thêm sản phẩm vào giỏ hàng thành công',
                data: {
                    cart: {
                        ...cart.dataValues,
                        totalPrice: cartTotal
                    },
                    cartDetail
                }
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
            const { CD_QUANTITY } = cartData;

            // Kiểm tra chi tiết giỏ hàng
            const cartDetail = await CartDetail.findByPk(id, {
                include: [{ model: Cart }]
            });
            if (!cartDetail) {
                return { status: 'ERR', message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
            }

            // Kiểm tra số lượng tồn kho
            const product = await Product.findByPk(cartDetail.prId);
            if (product.prStockQuanlity < CD_QUANTITY) {
                return {
                    status: 'ERR',
                    message: 'Số lượng sản phẩm trong kho không đủ',
                    available: product.prStockQuanlity
                };
            }

            // Cập nhật chi tiết giỏ hàng
            const newTotalPrice = CD_QUANTITY * product.prPrice;
            await cartDetail.update({
                cdQuantity: CD_QUANTITY,
                cdTotalprice: newTotalPrice
            });

            // Cập nhật tổng giá trị giỏ hàng
            const allCartDetails = await CartDetail.findAll({
                where: { cId: cartDetail.cId }
            });
            const cartTotal = allCartDetails.reduce((sum, detail) => sum + detail.cdTotalprice, 0);
            await cartDetail.Cart.update({ cTotalprice: cartTotal });

            return {
                status: 'OK',
                message: 'Cập nhật giỏ hàng thành công',
                data: {
                    cartDetail,
                    cartTotal
                }
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

    getCart: async (userId) => {
        try {
            const cart = await Cart.findOne({
                where: {
                    uId: userId,
                    cStatus: 'active'
                },
                include: [{
                    model: CartDetail,
                    include: [{
                        model: Product,
                        attributes: [
                            'prId',
                            'prTitle',
                            'prAuthor',
                            'prPrice',
                            'prImage',
                            'prStockQuanlity'
                        ]
                    }]
                }],
                order: [[CartDetail, 'createdAt', 'DESC']]
            });

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

    deleteToCart: async (id) => {
        try {
            const cartDetail = await CartDetail.findByPk(id, {
                include: [{ model: Cart }]
            });

            if (!cartDetail) {
                return {
                    status: 'ERR',
                    message: 'Không tìm thấy sản phẩm trong giỏ hàng'
                };
            }

            const cartId = cartDetail.cId;
            await cartDetail.destroy();

            // Cập nhật tổng giá trị giỏ hàng
            const remainingDetails = await CartDetail.findAll({
                where: { cId: cartId }
            });
            const newTotal = remainingDetails.reduce((sum, detail) => sum + detail.cdTotalprice, 0);
            await cartDetail.Cart.update({ cTotalprice: newTotal });

            return {
                status: 'OK',
                message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
                data: { cartTotal: newTotal }
            };
        } catch (error) {
            console.error('Lỗi deleteToCart:', error);
            return {
                status: 'ERR',
                message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng',
                error: error.message
            };
        }
    }
};

module.exports = CartService;
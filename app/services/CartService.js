const { Cart, Product, User, CartDetail } = require('../models');

const CartService = {
    addToCart: async (data) => {
        try {
            const { uId, prId, quantity } = data;

            // Kiểm tra user và product đồng thời
            const [user, product] = await Promise.all([
                User.findByPk(uId),
                Product.findByPk(prId)
            ]);

            if (!user) {
                return { status: 'ERR', message: 'Người dùng không tồn tại' };
            }
            // Kiểm tra sản phẩm có tồn tại
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            // Kiểm tra số lượng trong kho
            if (product.prStockquanlity < quantity) {
                return { status: 'ERR', message: 'Số lượng sản phẩm trong kho không đủ' };
            }

            // Tìm hoặc tạo giỏ hàng
            const [cart] = await Cart.findOrCreate({
                where: {
                    uId: uId,
                    cStatus: 'active'
                },
                defaults: {
                    uId: uId,
                    cStatus: 'active'
                }
            });

            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const cartDetail = await CartDetail.findOne({
                where: {
                    cId: cart.cId,
                    prId: prId
                }
            });

            if (cartDetail) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng
                await cartDetail.update({
                    cdQuantity: cartDetail.cdQuantity + quantity,
                    cdTotalprice: (cartDetail.cdQuantity + quantity) * product.prPrice
                });
            } else {
                // Nếu chưa có, tạo mới
                await CartDetail.create({
                    cId: cart.cId,
                    prId: prId,
                    cdQuantity: quantity,
                    cdTotalprice: quantity * product.prPrice
                });
            }

            return {
                status: 'OK',
                message: 'Thêm sản phẩm vào giỏ hàng thành công',
                data: { cart, cartDetail }
            };

        } catch (error) {
            console.error('Lỗi addToCart:', error);
            return { status: 'ERR', message: 'Lỗi khi thêm sản phẩm vào giỏ hàng', error: error.message };
        }
    },

    editToCart: async (cartDetailId, quantity) => {
        try {
            const cartDetail = await CartDetail.findByPk(cartDetailId);
            if (!cartDetail) {
                return { status: 'ERR', message: 'Không tìm thấy sản phẩm trong giỏ hàng' };
            }

            const product = await Product.findByPk(cartDetail.prId);
            if (product.prStockquanlity < quantity) {
                return { status: 'ERR', message: 'Số lượng sản phẩm trong kho không đủ' };
            }

            await cartDetail.update({
                cdQuantity: quantity,
                cdTotalprice: quantity * product.prPrice
            });

            return {
                status: 'OK',
                message: 'Cập nhật giỏ hàng thành công',
                data: cartDetail
            };
        } catch (error) {
            console.error('Lỗi editToCart:', error);
            return { status: 'ERR', message: 'Lỗi khi sửa giỏ hàng', error: error.message };
        }
    },

    deleteToCart: async (cartDetailId) => {
        try {
            const result = await CartDetail.destroy({
                where: { cdId: cartDetailId }
            });

            return {
                status: 'OK',
                message: 'Xóa sản phẩm khỏi giỏ hàng thành công'
            };
        } catch (error) {
            console.error('Lỗi deleteToCart:', error);
            return { status: 'ERR', message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng', error: error.message };
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
                        attributes: ['prId', 'prName', 'prPrice', 'prImage']
                    }]
                }]
            });

            return {
                status: 'OK',
                message: 'Lấy thông tin giỏ hàng thành công',
                data: cart
            };
        } catch (error) {
            console.error('Lỗi getCart:', error);
            return { status: 'ERR', message: 'Lỗi khi lấy giỏ hàng', error: error.message };
        }
    }
};

module.exports = CartService;
const { Cart, Product, User } = require('../models');
const { Op } = require('sequelize');

const CartService = {
    addToCart: async (data) => {
        try {
            const { uId, prId, quantity } = data;
            // Kiểm tra user có tồn tại
            const user = await User.findByPk(uId);
            if (!user) {
                return { status: 'ERR', message: 'Người dùng không tồn tại' };
            }
            // Kiểm tra sản phẩm có tồn tại
            const product = await Product.findByPk(prId);
            if (!product) {
                return { status: 'ERR', message: 'Sản phẩm không tồn tại' };
            }
            // Kiểm tra số lượng trong kho
            if (product.prStockquanlity < quantity) {
                return { status: 'ERR', message: 'Số lượng sản phẩm trong kho không đủ' };
            }
            // Kiểm tra giỏ hàng hiện tại của user
            let cart = await Cart.findOne({
                where: {
                    uId: uId,
                    cStatus: 'active'
                }
            });

            // Nếu chưa có giỏ hàng, tạo giỏ hàng mới
            if (!cart) {
                cart = await Cart.create({
                    uId: uId,
                    cStatus: 'active'
                });
            }
            // Thêm sản phẩm vào giỏ hàng
            const cartDetail = await CartDetail.create({
                cId: cart.cId,
                prId: prId,
                cdQuantity: quantity,
                cdTotalprice: quantity * product.prPrice
            });

            return {
                status: 'OK',
                message: 'Thêm sản phẩm vào giỏ hàng thành công',
                data: {
                    cart: cart,
                    cartDetail: cartDetail
                }
            };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi thêm sản phẩm vào giỏ hàng', error: error.message };
        }
    },

    editToCart: async (id, data) => {
        try {
            const result = await Cart.update(data, { where: { id } });
            return result;
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi sửa giỏ hàng', error: error.message };
        }
    },

    deleteToCart: async (id) => {
        try {
            const result = await Cart.destroy({ where: { id } });
            return result;
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi xóa giỏ hàng', error: error.message };
        }
    },

    getCart: async (data) => {
        try {
            const result = await Cart.findAll({ where: data });
            return result;
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi lấy giỏ hàng', error: error.message };
        }
    },

    order: async (data) => {
        try {
            const result = await Cart.create(data);
            return result;
        } catch (error) {
            return { status: 'ERR', message: 'Lỗi khi đặt hàng', error: error.message };
        }
    },
};

module.exports = CartService;
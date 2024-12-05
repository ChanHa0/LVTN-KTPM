import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import cartApi from '../api/cartApi';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user?._id) {
            setLoading(false);
            return;
        }
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await cartApi.getCart(user._id);
            if (response && response.cItems) {
                setCartItems(response.cItems);
                localStorage.setItem(`cart_${user._id}`, JSON.stringify(
                    response.cItems.map(item => ({
                        id: item.prId._id,
                        title: item.prId.prTitle,
                        price: item.prId.prPrice,
                        quantity: item.prQuantity,
                        image: item.prId.prImage
                    }))
                ));
            } else {
                throw new Error('Không tìm thấy giỏ hàng');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Không tìm thấy giỏ hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const response = await cartApi.updateCartItem(user._id, productId, newQuantity);
            if (response.status === 'OK') {
                await fetchCart();
                toast.success('Cập nhật số lượng thành công');
            } else {
                toast.error(response.message || 'Không thể cập nhật số lượng');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Không thể cập nhật số lượng');
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const response = await cartApi.removeFromCart(user._id, productId);
            if (response.status === 'OK') {
                await fetchCart();
                toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
            } else {
                toast.error(response.message || 'Không thể xóa sản phẩm');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error('Không thể xóa sản phẩm');
        }
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.error('Giỏ hàng trống');
            return;
        }
        navigate(`/checkout`);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(`cart_${user._id}`);
    };

    const CartItem = ({ item }) => (
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-4">
            <img
                src={item.prId.prImage}
                alt={item.prId.prTitle}
                className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-grow">
                <h3 className="font-medium">{item.prId.prTitle}</h3>
                <p className="text-gray-600">{item.prId.prPrice.toLocaleString()}đ</p>
                <div className="flex items-center mt-2">
                    <button
                        onClick={() => handleUpdateQuantity(item.prId._id, item.prQuantity - 1)}
                        disabled={item.prQuantity <= 1}
                        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        -
                    </button>
                    <span className="mx-2">{item.prQuantity}</span>
                    <button
                        onClick={() => handleUpdateQuantity(item.prId._id, item.prQuantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={() => handleRemoveItem(item.prId._id)}
                    className="mt-2 text-red-500 hover:text-red-700"
                >
                    Xóa
                </button>
            </div>
            <div className="text-right font-medium">
                {(item.prQuantity * item.prId.prPrice).toLocaleString()}đ
            </div>
        </div>
    );

    const CartSummary = () => {
        const subtotal = cartItems.reduce((sum, item) =>
            sum + (item.prQuantity * item.prId.prPrice), 0);
        const shipping = 30000;
        const total = subtotal + shipping;

        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-medium mb-4">Tổng giỏ hàng</h3>
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                        <span>Tạm tính:</span>
                        <span>{subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phí vận chuyển:</span>
                        <span>{shipping.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg pt-2 border-t">
                        <span>Tổng cộng:</span>
                        <span className="text-blue-600">{total.toLocaleString()}</span>
                    </div>
                </div>
                <button
                    onClick={handleCheckout}
                    className={`w-full text-center py-2 px-4 rounded-lg ${cartItems.length > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
                    disabled={cartItems.length === 0}
                >
                    Tiến hành thanh toán
                </button>
            </div>
        );
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h2>

            {!cartItems || cartItems.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống</p>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Tiếp tục mua sắm
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <CartItem key={item.prId} item={item} />
                        ))}
                    </div>
                    <div>
                        <CartSummary />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

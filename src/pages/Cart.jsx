import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/main/LoadingSpinner';
import { toast } from 'react-toastify';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy giỏ hàng từ localStorage
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        setLoading(false);
    }, []);

    // Cập nhật số lượng
    const updateQuantity = (cartDetailId, quantity) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === cartDetailId) {
                item.quantity = quantity;
            }
            return item;
        });
        setCartItems(updatedCart);

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (cartDetailId) => {
        const updatedCart = cartItems.filter(item => item.id !== cartDetailId);
        setCartItems(updatedCart);

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };

    const CartItem = ({ item }) => (
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow mb-4">
            <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-grow">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-blue-600">{item.price.toLocaleString()}đ</p>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                    >
                        Xóa
                    </button>
                </div>
            </div>
            <div className="text-right">
                <div className="font-medium text-blue-600">
                    {(item.quantity * item.price).toLocaleString()}đ
                </div>
            </div>
        </div>
    );

    const CartSummary = () => {
        const subtotal = cartItems.reduce((sum, item) =>
            sum + (item.quantity * item.price), 0);
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
                        <span className="text-blue-600">{total.toLocaleString()}đ</span>
                    </div>
                </div>
                <Link
                    to="/checkout"
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Tiến hành thanh toán
                </Link>
            </div>
        );
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h2>

            {cartItems.length === 0 ? (
                <div className="text-center text-lg font-medium text-gray-600">Giỏ hàng của bạn trống</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} />
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

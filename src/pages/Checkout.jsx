import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../api/orderApi';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingMethod, setShippingMethod] = useState('cod');
    const [loading, setLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        console.log('Cart Items:', cart);
        setCartItems(cart);

        const storedCartId = localStorage.getItem(`cartId_${userId}`);
        if (!storedCartId) {
            const newCartId = generateCartId();
            localStorage.setItem(`cartId_${userId}`, newCartId);
        }
    }, [userId]);

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log('Submitting order...');

        if (!userId) {
            console.log('User ID not found');
            toast.error('Vui lòng đăng nhập để tiếp tục.');
            setLoading(false);
            return;
        }

        if (cartItems.length === 0) {
            console.log('Cart is empty');
            toast.error('Giỏ hàng của bạn trống!');
            setLoading(false);
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const userAddress = user?.address || shippingAddress;

        if (!userAddress.trim()) {
            console.log('Shipping address is empty');
            toast.error('Vui lòng nhập địa chỉ giao hàng.');
            setLoading(false);
            return;
        }

        const totalAmount = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const cartId = localStorage.getItem(`cartId_${userId}`);

        if (!cartId) {
            console.log('Cart ID not found');
            toast.error('Không tìm thấy ID giỏ hàng.');
            setLoading(false);
            return;
        }

        const formattedItems = cartItems.map(item => {
            const productId = item.id || item.prId;

            if (!productId) {
                console.error('Product ID is missing for item:', item);
                toast.error('Có lỗi xảy ra với sản phẩm trong giỏ hàng.');
                return null;
            }

            return {
                prId: productId,
                odQuantity: String(item.quantity),
                odPrice: String(item.price)
            };
        }).filter(item => item !== null);

        console.log('Formatted Items:', formattedItems);

        const orderData = {
            uId: userId,
            cId: cartId,
            oStatus: "PENDING",
            oTotalAmount: String(totalAmount + 30000),
            oShippingAddress: userAddress.trim(),
            oShippingMethod: shippingMethod.trim(),
            items: formattedItems
        };

        console.log('Order Data:', orderData);

        try {
            const response = await orderApi.createOrder(orderData);

            console.log('Response:', response);

            if (response.status === 'OK') {
                toast.success('Đơn hàng đã được tạo thành công!');
                localStorage.removeItem(`cart_${userId}`);
                navigate('/');
            } else {
                toast.error(response.message || 'Không nhận được phản hồi hợp lệ từ API!');
            }
        } catch (error) {
            console.error('Chi tiết lỗi:', error.response?.data || error);
            toast.error('Lỗi khi tạo đơn hàng, vui lòng thử lại!');
        } finally {
            setLoading(false);
            console.log('Order submission completed.');
        }
    };

    const generateCartId = () => {
        return `cart_${Math.random().toString(36).substr(2, 9)}`;
    };

    if (loading) return <div>Đang xử lý...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Thông tin thanh toán</h2>

            {cartItems.length === 0 ? (
                <div className="text-center text-lg font-medium text-gray-600">Giỏ hàng của bạn trống</div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Giỏ hàng của bạn</h3>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between border-b py-2">
                                <span>{item.title} x {item.quantity}</span>
                                <span>{(item.quantity * item.price).toLocaleString()}đ</span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleOrderSubmit} className="lg:w-1/2 bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={shippingMethod === 'cod'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <span>Thanh toán khi nhận hàng (COD)</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="banking"
                                            checked={shippingMethod === 'banking'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <span>Chuyển khoản ngân hàng</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paypal"
                                            checked={shippingMethod === 'paypal'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <span>PayPal</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            <div className="flex justify-between">
                                <span>Tạm tính:</span>
                                <span>{totalAmount ? totalAmount.toLocaleString() : 'N/A'}đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span>30.000đ</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                <span>Tổng cộng:</span>
                                <span className="text-blue-600">{totalAmount ? (totalAmount + 30000).toLocaleString() : 'N/A'}đ</span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
                        >
                            Đặt hàng
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Checkout;
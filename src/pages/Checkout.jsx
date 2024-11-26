import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../api/orderApi'; // Import API tạo đơn hàng

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingMethod, setShippingMethod] = useState('cod'); // Default payment method: COD
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Lấy giỏ hàng từ localStorage
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        const total = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        setTotalAmount(total);
    }, []);

    // Lấy userId từ localStorage (hoặc từ context/Redux nếu bạn sử dụng)
    const userId = JSON.parse(localStorage.getItem('user'))?.id;  // Giả sử bạn lưu ID người dùng trong localStorage

    // Cập nhật địa chỉ giao hàng
    const handleAddressChange = (e) => {
        setShippingAddress(e.target.value);
    };

    // Cập nhật phương thức giao hàng
    const handleShippingMethodChange = (e) => {
        setShippingMethod(e.target.value);
    };

    // Gửi thông tin đơn hàng qua API
    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        // Đặt lại trạng thái loading trước khi xử lý đơn hàng
        setLoading(true);
        console.log('Trạng thái Loading trước khi gửi đơn:', true); // Sẽ hiển thị là true trước khi bắt đầu xử lý đơn

        // Kiểm tra người dùng và giỏ hàng
        if (!userId) {
            toast.error('Vui lòng đăng nhập để tiếp tục.');
            setLoading(false);
            return;
        }

        if (cartItems.length === 0) {
            toast.error('Giỏ hàng của bạn trống!');
            setLoading(false);
            return;
        }

        // Dữ liệu đơn hàng
        const orderData = {
            cId: cartItems.map(item => item.id),
            uId: userId,
            oTotalamount: totalAmount,
            oShippingaddress: shippingAddress,
            oShippingmethod: shippingMethod,
        };

        try {
            console.log('Đang gửi dữ liệu đơn hàng:', orderData);
            const order = await orderApi.createOrder(orderData);
            console.log('Đơn hàng tạo thành công:', order);

            if (order && order.id) {
                toast.success('Đơn hàng đã được tạo thành công!');
                localStorage.removeItem('cart');
                navigate(`/order/${order.id}`);
            } else {
                toast.error('Không nhận được phản hồi hợp lệ từ API!');
            }
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            toast.error('Lỗi khi tạo đơn hàng, vui lòng thử lại!');
        } finally {
            // Đảm bảo loading được tắt sau khi hoàn thành
            setLoading(false);
            console.log('Trạng thái Loading sau khi xử lý đơn:', false);  // Sau khi xử lý xong, trạng thái loading sẽ là false
        }
    };

    if (loading) return <div>Đang xử lý...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Thông tin thanh toán</h2>

            {loading && (
                <div className="text-center text-lg font-medium text-gray-600">Đang xử lý...</div>
            )}

            {cartItems.length === 0 ? (
                <div className="text-center text-lg font-medium text-gray-600">Giỏ hàng của bạn trống</div>
            ) : (
                <div className="space-y-8">
                    {/* Thông tin giỏ hàng */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Giỏ hàng của bạn</h3>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between border-b py-2">
                                <span>{item.title} x {item.quantity}</span>
                                <span>{(item.quantity * item.price).toLocaleString()}đ</span>
                            </div>
                        ))}
                    </div>

                    {/* Địa chỉ và phương thức giao hàng */}
                    <form onSubmit={handleOrderSubmit} className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={shippingAddress}
                                    onChange={handleAddressChange}
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
                                            onChange={handleShippingMethodChange}
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
                                            onChange={handleShippingMethodChange}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <span>Chuyển khoản ngân hàng</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Tổng giỏ hàng */}
                        <div className="space-y-4 mt-6">
                            <div className="flex justify-between">
                                <span>Tạm tính:</span>
                                <span>{totalAmount.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span>30.000đ</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg pt-2 border-t">
                                <span>Tổng cộng:</span>
                                <span className="text-blue-600">{(totalAmount + 30000).toLocaleString()}đ</span>
                            </div>
                        </div>

                        {/* Nút đặt hàng */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-6"
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

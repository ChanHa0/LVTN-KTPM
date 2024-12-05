import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../api/orderApi';
import cartApi from '../api/cartApi';
import { PayPalButton } from "react-paypal-button-v2";

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingMethod, setShippingMethod] = useState('cash_on_delivery');
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user?._id) {
            toast.error('Vui lòng đăng nhập để tiếp tục');
            navigate('/login');
            return;
        }

        const savedCart = localStorage.getItem(`cart_${user._id}`);
        if (!savedCart) {
            toast.error('Không tìm thấy thông tin giỏ hàng');
            navigate('/cart');
            return;
        }

        setCartItems(JSON.parse(savedCart));
        if (user.address) {
            setShippingAddress(user.address);
        }
    }, []);

    const handleAddressChange = (e) => {
        setShippingAddress(e.target.value);
    };

    const totalAmount = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return sum + (price * quantity);
    }, 0);

    const createOrder = async () => {
        const orderData = {
            uId: user._id,
            oStatus: "PENDING",
            oTotalPrice: String(totalAmount + 30000),
            oShippingAddress: shippingAddress.trim(),
            oPaymentMethod: shippingMethod === 'paypal' ? 'PAYPAL' : 'COD',
            items: cartItems.map(item => ({
                prId: item.id,
                odQuantity: item.quantity,
                odPrice: item.price
            }))
        };

        try {
            console.log('Creating order with data:', orderData);
            const response = await orderApi.createOrder(orderData);
            if (response.status === 'OK') {
                try {
                    await Promise.all(
                        cartItems.map(item =>
                            cartApi.removeFromCart(user._id, item.id)
                        )
                    );
                } catch (error) {
                    console.error('Error clearing cart:', error);
                }

                localStorage.removeItem(`cart_${user._id}`);
                alert('Đặt hàng thành công!');
                navigate('/product');
            } else {
                console.error('Order creation failed:', response.message);
                alert(response.message || 'Đặt hàng thất bại');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Đặt hàng thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!shippingAddress.trim()) {
            toast.error('Vui lòng nhập địa chỉ giao hàng');
            setLoading(false);
            return;
        }

        if (shippingMethod === 'cash_on_delivery') {
            await createOrder();
        }
    };

    if (loading) return <div>Đang xử lý...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Thông tin thanh toán</h2>

            {cartItems.length === 0 ? (
                <div className="text-center text-lg font-medium text-gray-600">
                    Giỏ hàng của bạn trống
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-4">Giỏ hàng của bạn</h3>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row justify-between border-b py-3">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <h4 className="font-medium">{item.title}</h4>
                                            <p className="text-gray-600">
                                                {Number(item.price).toLocaleString()}đ x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right font-medium text-blue-600">
                                        {(Number(item.price) * item.quantity).toLocaleString()}đ
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập địa chỉ giao hàng"
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
                                            value="cash_on_delivery"
                                            checked={shippingMethod === 'cash_on_delivery'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <span>Thanh toán khi nhận hàng (COD)</span>
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
                                        <span>Thanh toán bằng PayPal</span>
                                    </label>
                                    {shippingMethod === 'paypal' && (
                                        <PayPalButton
                                            style={{
                                                layout: 'vertical',
                                                color: 'blue',
                                                shape: 'rect',
                                                label: 'paypal'
                                            }}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [{
                                                        amount: {
                                                            value: (totalAmount + 30000).toString()
                                                        }
                                                    }]
                                                });
                                            }}
                                            onApprove={async (data, actions) => {
                                                return actions.order.capture().then(async (details) => {
                                                    alert("Transaction completed by " + details.payer.name.given_name);

                                                    // Gửi thông tin giao dịch đến backend
                                                    await fetch("http://localhost:5000/api/order/paypal-transaction-complete", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({
                                                            orderID: data.orderID
                                                        })
                                                    });

                                                    // Tạo đơn hàng sau khi giao dịch PayPal thành công
                                                    await createOrder();
                                                });
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

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
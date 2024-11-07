import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    const statusText = {
        pending: 'Chờ xử lý',
        processing: 'Đang xử lý',
        shipped: 'Đã giao',
        cancelled: 'Đã hủy'
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/order/my-orders');
                setOrders(response.data.data.orders);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-6">
                    Đơn hàng của tôi ({orders.length})
                </h2>

                {orders.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <img src="/images/empty-order.png" alt="Chưa có đơn hàng"
                            className="mx-auto w-48 h-48 object-contain mb-4" />
                        <p className="text-gray-600 mb-4">Bạn chưa có đơn hàng nào</p>
                        <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Mua sắm ngay
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.oId} className="bg-white p-6 rounded-lg shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-medium">Đơn hàng #{order.oId}</h3>
                                        <p className="text-sm text-gray-600">
                                            Đặt ngày: {new Date(order.oOrderdate).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.oStatus]}`}>
                                        {statusText[order.oStatus]}
                                    </span>
                                </div>

                                <div className="border-t pt-4">
                                    {order.Cart.CartItems.map(item => (
                                        <div key={item.ciId} className="flex items-center gap-4 mb-4">
                                            <img src={item.Product.prImage} alt={item.Product.prTitle}
                                                className="w-16 h-16 object-cover rounded" />
                                            <div className="flex-grow">
                                                <h4 className="font-medium">{item.Product.prTitle}</h4>
                                                <p className="text-sm text-gray-600">
                                                    Số lượng: {item.ciQuantity} x {item.Product.prPrice.toLocaleString()}đ
                                                </p>
                                            </div>
                                            <div className="text-blue-600 font-medium">
                                                {(item.ciQuantity * item.Product.prPrice).toLocaleString()}đ
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span>Phí vận chuyển:</span>
                                        <span>30.000đ</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-lg">
                                        <span>Tổng cộng:</span>
                                        <span className="text-blue-600">{order.oTotalamount.toLocaleString()}đ</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-end gap-4">
                                    <Link
                                        to={`/don-hang/${order.oId}`}
                                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                    >
                                        Chi tiết
                                    </Link>
                                    {order.oStatus === 'pending' && (
                                        <button
                                            // onClick={() => handleCancelOrder(order.oId)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                        >
                                            Hủy đơn
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
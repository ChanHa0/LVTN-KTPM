import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBox, FaTruck, FaCheck, FaTimes } from 'react-icons/fa';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Tham chiếu từ AdminOrders.jsx
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

    const statusIcons = {
        pending: <FaBox />,
        processing: <FaTruck className="animate-bounce" />,
        shipped: <FaCheck />,
        cancelled: <FaTimes />
    };

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/order/${id}`);
                if (response.data.status === 'OK') {
                    setOrder(response.data.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Đang tải...</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-600">Không tìm thấy đơn hàng</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">
                        Chi tiết đơn hàng #{order.oId}
                    </h2>

                    {/* Trạng thái đơn hàng */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium">Trạng thái đơn hàng</h3>
                            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusColors[order.oStatus]}`}>
                                {statusIcons[order.oStatus]}
                                {statusText[order.oStatus]}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                <p>Ngày đặt: {new Date(order.oOrderdate).toLocaleDateString('vi-VN')}</p>
                                {order.oStatus === 'shipped' && (
                                    <p>Ngày giao: {new Date(order.oShipdate).toLocaleDateString('vi-VN')}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Thông tin giao hàng */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-medium mb-4">Thông tin giao hàng</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-600">Người nhận:</span> {order.oRecipientname}</p>
                            <p><span className="text-gray-600">Số điện thoại:</span> {order.oPhone}</p>
                            <p><span className="text-gray-600">Địa chỉ:</span> {order.oAddress}</p>
                            <p><span className="text-gray-600">Ghi chú:</span> {order.oNote || 'Không có'}</p>
                        </div>
                    </div>

                    {/* Chi tiết sản phẩm */}
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h3 className="text-lg font-medium mb-4">Chi tiết sản phẩm</h3>
                        <div className="space-y-4">
                            {order.Cart.CartItems.map(item => (
                                <div key={item.ciId} className="flex items-center gap-4 py-4 border-b last:border-0">
                                    <img
                                        src={item.Product.prImage}
                                        alt={item.Product.prTitle}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-grow">
                                        <h4 className="font-medium">{item.Product.prTitle}</h4>
                                        <p className="text-sm text-gray-600">
                                            {item.Product.prAuthor}
                                        </p>
                                        <div className="text-sm text-gray-600">
                                            Số lượng: {item.ciQuantity} x {item.Product.prPrice.toLocaleString()}đ
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-blue-600">
                                            {(item.ciQuantity * item.Product.prPrice).toLocaleString()}đ
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tổng cộng */}
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Tạm tính:</span>
                                <span>{(order.oTotalamount - 30000).toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Phí vận chuyển:</span>
                                <span>30.000đ</span>
                            </div>
                            <div className="flex justify-between text-lg font-medium text-blue-600 pt-2 border-t">
                                <span>Tổng cộng:</span>
                                <span>{order.oTotalamount.toLocaleString()}đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Nút hành động */}
                    {order.oStatus === 'pending' && (
                        <div className="flex justify-end">
                            <button
                                // onClick={() => handleCancelOrder(order.oId)}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Hủy đơn hàng
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
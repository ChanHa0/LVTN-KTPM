import React, { useEffect, useState } from 'react';
import orderApi from '../api/orderApi';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    console.error('No user found');
                    return;
                }

                const user = JSON.parse(userStr);
                const response = await orderApi.getDetailOrder(user._id);
                if (response && response.data) {
                    setOrders(response.data);
                    const total = response.data.reduce((sum, order) => sum + order.total, 0);
                    setTotalValue(total);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>
            {orders.length > 0 ? (
                <>
                    <ul className="space-y-4">
                        {orders.map(order => (
                            <li key={order._id} className="p-4 border rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold">Đơn hàng #{order._id}</h2>
                                <p className="text-gray-600">Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                                <p className="text-gray-800">Tổng tiền: {order.total.toLocaleString('vi-VN')}đ</p>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-xl font-bold mt-6">
                        Tổng giá trị đơn hàng: {totalValue.toLocaleString('vi-VN')}đ
                    </h2>
                </>
            ) : (
                <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào</p>
            )}
        </div>
    );
}

export default MyOrders;
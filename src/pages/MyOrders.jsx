import React, { useEffect, useState } from 'react';
import orderApi from '../api/orderApi';
const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        fetch('/api/orders')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                const total = data.reduce((sum, order) => sum + order.total, 0);
                setTotalValue(total);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <ul className="space-y-4">
                {orders.map(order => (
                    <li key={order._id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                        <p className="text-gray-600">Date: {order.createdAt}</p>
                        <p className="text-gray-800">Total: ${order.total}</p>
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-bold mt-6">Total Value of Orders: ${totalValue}</h2>
        </div>
    );
}

export default MyOrders;
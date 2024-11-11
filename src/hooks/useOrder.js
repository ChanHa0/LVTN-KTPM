import { useState, useEffect } from 'react';
import orderApi from '../api/orderApi';

const useOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await orderApi.getOrders();
            if (response.status === 'OK') {
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải đơn hàng:', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            const response = await orderApi.cancelOrder(orderId);
            if (response.status === 'OK') {
                fetchOrders();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Lỗi khi hủy đơn hàng:', error);
            return false;
        }
    };

    return { orders, loading, cancelOrder };
};

export default useOrder;
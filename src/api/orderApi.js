import axiosClient from './axiosClient';

const orderApi = {
    createOrder: async (orderData) => {
        try {
            const response = await axiosClient.post('api/order', orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    updateOrder: async (id, orderData) => {
        try {
            const response = await axiosClient.put(`api/order/${id}`, orderData);
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    },

    cancelOrder: async (id) => {
        try {
            const response = await axiosClient.delete(`api/order/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    },

    getAllOrders: async () => {
        try {
            const response = await axiosClient.get('api/order/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    getDetailOrder: async (id) => {
        try {
            const response = await axiosClient.get(`api/order/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    },
};

export default orderApi;
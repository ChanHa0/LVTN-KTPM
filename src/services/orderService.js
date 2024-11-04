import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

const orderService = {
    getAllOrders: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    getOrderById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    },

    createOrder: async (orderData) => {
        try {
            const response = await axios.post(API_URL, orderData);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    updateOrder: async (id, orderData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, orderData);
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    },

    deleteOrder: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
};

export default orderService;
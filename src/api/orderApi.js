import axiosClient from './axiosClient';

const orderApi = {
    createOrder: async (orderData) => {
        try {
            const response = await axiosClient.post('api/order/', orderData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateOrder: async (id, orderData) => {
        try {
            const response = await axiosClient.put(`api/order/${id}`, orderData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    deleteOrder: async (id) => {
        try {
            const response = await axiosClient.delete(`api/order/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    confirmOrder: async (id) => {
        try {
            const response = await axiosClient.put(`api/order/confirm/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    cancelOrder: async (id) => {
        try {
            const response = await axiosClient.put(`api/order/cancel/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getAllOrders: async () => {
        try {
            const response = await axiosClient.get('api/order/all');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getDetailOrder: async (id) => {
        try {
            const response = await axiosClient.get(`api/order/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default orderApi;
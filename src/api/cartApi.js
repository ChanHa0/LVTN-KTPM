import axiosClient from './axiosClient';

const cartApi = {
    addToCart: async (userId, productId, quantity) => {
        try {
            const response = await axiosClient.post('api/cart/', {
                userId,
                productId,
                quantity
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCartItem: async (cartItemId, quantity) => {
        try {
            const response = await axiosClient.put(`api/cart/${cartItemId}`, {
                quantity
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    removeFromCart: async (cartItemId) => {
        try {
            const response = await axiosClient.delete(`api/cart/${cartItemId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCart: async (userId) => {
        try {
            const response = await axiosClient.get(`api/cart/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default cartApi;
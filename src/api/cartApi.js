import axiosClient from './axiosClient';

const cartApi = {
    addToCart: async (uId, prId, cdQuantity) => {
        try {
            const response = await axiosClient.post('api/cart/', {
                uId,
                prId,
                cdQuantity
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateCartItem: async (cId, prId, cdQuantity) => {
        try {
            const response = await axiosClient.put(`api/cart/${cId}`, {
                prId,
                cdQuantity
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    removeFromCart: async (cId, prId) => {
        try {
            const response = await axiosClient.delete(`api/cart/${cId}/${prId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getCart: async (uId) => {
        try {
            const response = await axiosClient.get(`api/cart/${uId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    addMultipleToCart: async (uId, products) => {
        try {
            const response = await axiosClient.post('api/cart/multiple', {
                uId,
                products
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default cartApi;
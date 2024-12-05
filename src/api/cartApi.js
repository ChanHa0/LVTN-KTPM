import axiosClient from './axiosClient';

const cartApi = {
    addToCart: async (uId, products) => {
        try {
            const response = await axiosClient.post('api/cart/', {
                uId,
                products
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateCartItem: async (uId, prId, prQuantity) => {
        try {
            const response = await axiosClient.put(`api/cart/${uId}/${prId}`, {
                prQuantity
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    removeFromCart: async (uId, prId) => {
        try {
            const response = await axiosClient.delete(`api/cart/${uId}/${prId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCart: async (uId) => {
        try {
            const response = await axiosClient.get(`api/cart/${uId}`);
            if (response.status === 'OK' && response.data) {
                return response.data;
            } else {
                throw new Error('Không tìm thấy giỏ hàng');
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },
};

export default cartApi;
import axiosClient from './axiosClient';

const productApi = {
    createProduct: async (productData) => {
        try {
            const response = await axiosClient.post('api/product/', productData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const response = await axiosClient.put(`api/product/${id}`, productData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await axiosClient.delete(`api/product/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getAllProducts: async () => {
        try {
            const response = await axiosClient.get('api/product/all');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getDetailProduct: async (id) => {
        try {
            const response = await axiosClient.get(`api/product/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    searchProducts: async (params) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await axiosClient.get(`api/product/search?${queryString}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    createProductReview: async (prId, reviewData) => {
        try {
            const response = await axiosClient.post(`api/product/review/${prId}`, reviewData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getRatingProduct: async (id) => {
        try {
            const response = await axiosClient.get(`api/product/rating/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getCommentProduct: async (id) => {
        try {
            const response = await axiosClient.get(`api/product/comment/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default productApi;
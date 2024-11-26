import axiosClient from './axiosClient';

const productApi = {
    createProduct: async (productData) => {
        try {
            const response = await axiosClient.post('/api/product/', productData);
            return response;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const response = await axiosClient.put(`/api/product/${id}`, productData);
            return response;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await axiosClient.delete(`/api/product/${id}`);
            return response;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    getAllProducts: async () => {
        try {
            const response = await axiosClient.get('/api/product/all');
            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductDetail: async (id) => {
        try {
            const response = await axiosClient.get(`/api/product/${id}`);
            return response;
        } catch (error) {
            console.error('Error fetching product detail:', error);
            throw error;
        }
    },

    searchProducts: async (params) => {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await axiosClient.get(`/api/product/search?${queryString}`);
            return response;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },
};

export default productApi;
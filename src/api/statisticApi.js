import axiosClient from './axiosClient';

const statisticApi = {
    getTotalRevenue: async () => {
        try {
            const response = await axiosClient.get('api/statistics/revenue');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getTotalOrder: async () => {
        try {
            const response = await axiosClient.get('api/statistics/orders');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getTotalProductSold: async () => {
        try {
            const response = await axiosClient.get('api/statistics/products-sold');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getProductInventory: async () => {
        try {
            const response = await axiosClient.get('api/statistics/product-inventory');
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default statisticApi;
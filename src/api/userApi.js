import axiosClient from './axiosClient';

const userApi = {
    registerUser: async (userData) => {
        try {
            const response = await axiosClient.post('api/user/register', userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    loginUser: async (credentials) => {
        try {
            const response = await axiosClient.post('api/user/login', credentials);
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const response = await axiosClient.put(`api/user/${id}`, userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await axiosClient.delete(`api/user/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getAllUsers: async () => {
        try {
            const response = await axiosClient.get('api/user/all');
            return response;
        } catch (error) {
            throw error;
        }
    },

    getDetailUser: async (id) => {
        try {
            const response = await axiosClient.get(`api/user/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default userApi;
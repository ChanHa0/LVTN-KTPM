import axiosClient from '../services/api';

const authService = {
    register: async (userData) => {
        try {
            const response = await axiosClient.post('/users/register', userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axiosClient.post('/users/login', credentials);
            if (response.status === 'OK') {
                localStorage.setItem('token', response.data.accessToken);
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};

export default authService;

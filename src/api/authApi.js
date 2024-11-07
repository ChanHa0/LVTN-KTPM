import axiosClient from './axiosClient';

const authService = {
    register: async (userData) => {
        try {
            const response = await axiosClient.post('api/user/register', userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axiosClient.post('api/user/login', credentials);
            if (response.status === 'OK') {
                localStorage.setItem('user', JSON.stringify(response.data.data));
            }
            return response;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            localStorage.removeItem('user');
            const response = await axiosClient.post('api/user/logout');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // getCurrentUser: () => {
    //     try {
    //         const user = localStorage.getItem('user');
    //         return user ? JSON.parse(user) : null;
    //     } catch (error) {
    //         return null;
    //     }
    // },

    // updateProfile: async (userData) => {
    //     try {
    //         const response = await axiosClient.put('api/user/profile', userData);
    //         if (response.status === 'OK') {
    //             const currentUser = JSON.parse(localStorage.getItem('user'));
    //             const updatedUser = { ...currentUser, ...response.data.data };
    //             localStorage.setItem('user', JSON.stringify(updatedUser));
    //         }
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // changePassword: async (passwordData) => {
    //     try {
    //         const response = await axiosClient.put('api/user/change-password', passwordData);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // forgotPassword: async (email) => {
    //     try {
    //         const response = await axiosClient.post('api/user/forgot-password', { email });
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // resetPassword: async (resetData) => {
    //     try {
    //         const response = await axiosClient.post('api/user/reset-password', resetData);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // verifyEmail: async (token) => {
    //     try {
    //         const response = await axiosClient.get(`api/user/verify-email/${token}`);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // refreshToken: async () => {
    //     try {
    //         const response = await axiosClient.post('api/user/refresh-token');
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
};

export default authService;

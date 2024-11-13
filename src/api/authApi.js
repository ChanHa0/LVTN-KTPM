import axiosClient from './axiosClient';

const authApi = {
    register: async (userData) => {
        try {

            const response = await axiosClient.post('api/user/register', {
                uName: userData.uName,
                uEmail: userData.uEmail,
                uPassword: userData.uPassword
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    login: async (userData) => {
        try {
            const response = await axiosClient.post('api/user/login', {
                uEmail: userData.uEmail,
                uPassword: userData.uPassword
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
};

export default authApi;

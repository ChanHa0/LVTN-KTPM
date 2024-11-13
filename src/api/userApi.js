import axiosClient from './axiosClient';

const userService = {
    createUser: async (userData) => {
        try {
            const response = await axiosClient.post('/api/user/register', userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const response = await axiosClient.patch(`/api/user/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await axiosClient.delete(`/api/user/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    getAllUsers: async () => {
        try {
            const response = await axiosClient.get('/api/user/all');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
};
export default userService;

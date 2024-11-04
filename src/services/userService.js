import axiosClient from '../utils/api';

export const userService = {
    createUser: async (userData) => {
        try {
            const response = await axiosClient.post('/users/register', userData);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tạo người dùng:', error);
            throw error;
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await axiosClient.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            throw error;
        }
    }
};
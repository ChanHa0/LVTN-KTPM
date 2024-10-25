import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Thêm các hàm API khác cho customer ở đây
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true

});
// Xử lý request
axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Xử lý response
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        console.log('Yêu cầu API thành công:', response);
        return response.data;
    }
    return response;
}, (error) => {
    console.error('Lỗi yêu cầu API:', error);
    return Promise.reject(error);
});

export default axiosClient;
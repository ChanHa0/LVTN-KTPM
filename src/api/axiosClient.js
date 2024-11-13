import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',  // Đã bỏ /api vì đường dẫn API sẽ được thêm trong các service
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
    timeout: 10000, // Thêm timeout 10s
    validateStatus: status => status >= 200 && status < 300 // Validate status response
});

// Xử lý request
axiosClient.interceptors.request.use(
    async (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            console.error('Lỗi khi xử lý request:', error);
            return Promise.reject(error);
        }
    },
    (error) => {
        console.error('Lỗi request interceptor:', error);
        return Promise.reject(error);
    }
);

// Xử lý response
axiosClient.interceptors.response.use(
    (response) => {
        // Kiểm tra và trả về dữ liệu
        if (response && response.data) {
            // Log thông tin chi tiết khi API thành công
            console.log('API Response Success:', {
                url: response.config.url,
                method: response.config.method,
                status: response.status,
                data: response.data
            });

            // Thông báo thành công tùy theo method
            const method = response.config.method.toUpperCase();
            switch (method) {
                case 'POST':
                    console.log('Thêm mới thành công');
                    break;
                case 'PUT':
                    console.log('Cập nhật thành công');
                    break;
                case 'DELETE':
                    console.log('Xóa thành công');
                    break;
                default:
                    console.log('Yêu cầu API thành công');
            }

            return response.data;
        }
        return response;
    },
    (error) => {
        // Xử lý các loại lỗi
        let errorMessage = 'Đã xảy ra lỗi không xác định';

        if (error.response) {
            // Lỗi response từ server (status code không nằm trong 2xx)
            switch (error.response.status) {
                case 400:
                    errorMessage = 'Yêu cầu không hợp lệ';
                    break;
                case 401:
                    errorMessage = 'Không được phép truy cập';
                    break;
                case 403:
                    errorMessage = 'Truy cập bị từ chối';
                    break;
                case 404:
                    errorMessage = 'Không tìm thấy tài nguyên';
                    break;
                case 500:
                    errorMessage = 'Lỗi server';
                    break;
                default:
                    errorMessage = `Lỗi ${error.response.status}: ${error.response.data.message || 'Đã xảy ra lỗi'}`;
            }
        } else if (error.request) {
            // Lỗi không nhận được response
            errorMessage = 'Không thể kết nối đến server';
        }

        console.error('API Error:', {
            message: errorMessage,
            error: error
        });

        return Promise.reject({
            message: errorMessage,
            originalError: error
        });
    }
);

export default axiosClient;
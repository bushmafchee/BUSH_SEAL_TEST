import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Bộ lọc tự động chèn Token vào Header trước khi request bay đi
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Bộ lọc tự động xử lý data trả về hoặc bắt lỗi tập trung
axiosClient.interceptors.response.use(
    (response) => {
        if (response.data) {
            return response.data; // Trả thẳng về cấu hình ApiResponse { code, message, result }
        }
        return response;
    },
    (error) => {
        // Nếu lỗi 401 hoặc 403 (Token hết hạn/Không có quyền) thì đá ra trang Login
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

export default axiosClient;
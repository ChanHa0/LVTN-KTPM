import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../api/userApi';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uName: '',
        uEmail: '',
        uPassword: '',
        uConfirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        if (!formData.uName.trim()) {
            toast.error('Vui lòng nhập họ tên');
            return false;
        }
        if (!formData.uEmail.trim()) {
            toast.error('Vui lòng nhập email');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.uEmail)) {
            toast.error('Email không hợp lệ');
            return false;
        }
        if (!formData.uPassword) {
            toast.error('Vui lòng nhập mật khẩu');
            return false;
        }
        if (formData.uPassword.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        if (formData.uPassword !== formData.uConfirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await userApi.registerUser({
                uName: formData.uName.trim(),
                uEmail: formData.uEmail.trim().toLowerCase(),
                uPassword: formData.uPassword
            });

            if (response.status === 'OK') {
                toast.success('Đăng ký thành công!');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                throw new Error(response.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            toast.error(error.message || 'Có lỗi xảy ra khi đăng ký');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    Đăng ký
                </h2>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="mb-4">
                            <label htmlFor="uName" className="block text-sm font-medium text-gray-700 mb-1">
                                Họ tên
                            </label>
                            <input
                                type="text"
                                id="uName"
                                value={formData.uName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nhập họ tên"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="uEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="uEmail"
                                value={formData.uEmail}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nhập email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="uPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="uPassword"
                                value={formData.uPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="uConfirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                id="uConfirmPassword"
                                value={formData.uConfirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Nhập lại mật khẩu"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

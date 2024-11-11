import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        setError('');
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError('Vui lòng nhập họ tên');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Vui lòng nhập email');
            return false;
        }
        if (!formData.password) {
            setError('Vui lòng nhập mật khẩu');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await authApi.register({
                cName: formData.username.trim(),
                cEmail: formData.email.trim(),
                cPassword: formData.password
            });

            if (response.status === 'OK') {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/dang-nhap');
                }, 1500);
            } else {
                throw new Error(response.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            console.error('Register error:', error);
            setError(
                error.response?.data?.message ||
                error.message ||
                'Đăng ký thất bại. Vui lòng thử lại sau.'
            );
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (id, label, type = 'text') => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    required
                    placeholder={`Nhập ${label.toLowerCase()}`}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Đăng ký tài khoản
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                Đăng ký tài khoản thành công! Đang chuyển đến trang đăng nhập...
                            </div>
                        )}

                        {renderInput('username', 'Họ tên')}
                        {renderInput('email', 'Email', 'email')}
                        {renderInput('password', 'Mật khẩu', 'password')}
                        {renderInput('confirmPassword', 'Xác nhận mật khẩu', 'password')}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors
                                    ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                {loading ? 'Đang xử lý...' : 'Đăng ký'}
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <span className="text-gray-600">Đã có tài khoản? </span>
                            <button
                                type="button"
                                onClick={() => navigate('/dang-nhap')}
                                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
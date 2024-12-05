import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/userSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        uName: '',
        uEmail: '',
        uPassword: '',
        uConfirmPassword: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        if (!formData.uName.trim()) {
            return false;
        }
        if (!formData.uEmail.trim()) {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.uEmail)) {
            return false;
        }
        if (!formData.uPassword) {
            return false;
        }
        if (formData.uPassword.length < 6) {
            return false;
        }
        if (formData.uPassword !== formData.uConfirmPassword) {
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(registerUser(formData)).then((result) => {
            if (registerUser.fulfilled.match(result)) {
                setSuccessMessage('Đăng ký thành công!');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        });
    };

    const renderInput = (id, label, type = 'text') => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`Nhập ${label.toLowerCase()}`}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
                    Đăng ký
                </h2>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderInput('uName', 'Họ tên')}
                        {renderInput('uEmail', 'Email', 'email')}
                        {renderInput('uPassword', 'Mật khẩu', 'password')}
                        {renderInput('uConfirmPassword', 'Xác nhận mật khẩu', 'password')}
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

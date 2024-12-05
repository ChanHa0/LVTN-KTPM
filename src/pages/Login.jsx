import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        uEmail: '',
        uPassword: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (users.length > 0 && users[0] && users[0].uRole) {
            const userRole = users[0].uRole;
            setSuccessMessage('Đăng nhập thành công!');
            setTimeout(() => {
                if (userRole === 'ADMIN') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }, 1500);
        }
    }, [users, navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
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
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(loginUser(formData));
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
                    Đăng nhập
                </h2>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderInput('uEmail', 'Email', 'email')}
                        {renderInput('uPassword', 'Mật khẩu', 'password')}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-gray-600">Chưa có tài khoản? </span>
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
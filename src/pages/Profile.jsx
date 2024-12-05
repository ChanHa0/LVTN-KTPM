import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, setUsers } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.users[0]);
    const loading = useSelector(state => state.user.loading);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        uName: '',
        uEmail: '',
        uPhone: '',
        uAddress: '',
        uRole: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            dispatch(setUsers([parsedUser]));
            setFormData({
                uName: parsedUser.uName || '',
                uEmail: parsedUser.uEmail || '',
                uPhone: parsedUser.uPhone || '',
                uAddress: parsedUser.uAddress || '',
                uRole: parsedUser.uRole || ''
            });
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (user) {
            setFormData({
                uName: user.uName || '',
                uEmail: user.uEmail || '',
                uPhone: user.uPhone || '',
                uAddress: user.uAddress || '',
                uRole: user.uRole || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            const userId = user?._id || JSON.parse(localStorage.getItem('user'))?._id;
            if (!userId) {
                setError('Vui lòng đăng nhập');
                return;
            }

            await dispatch(updateProfile({ id: userId, ...formData }))
                .unwrap()
                .then((updatedUser) => {
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setSuccessMessage('Cập nhật thông tin thành công');
                    setIsEditing(false);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                })
                .catch((error) => {
                    setError(`Lỗi khi cập nhật thông tin: ${error}`);
                    console.error('Error updating user:', error);
                });

        } catch (error) {
            setError(`Lỗi khi cập nhật thông tin: ${error.message}`);
            console.error('Error updating user:', error);
        }
    };

    if (loading) {
        return <div>Đang tải thông tin...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {successMessage}
                    </div>
                )}

                {!isEditing ? (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-start">
                            <img
                                src={user?.uAvatar || 'https://via.placeholder.com/150'}
                                alt="Avatar"
                                className="w-32 h-32 rounded-full object-cover mr-8"
                            />
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">Họ và tên</p>
                                        <p className="font-semibold">{user?.uName}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-semibold">{user?.uEmail}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">Số điện thoại</p>
                                        <p className="font-semibold">{user?.uPhone || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">Vai trò</p>
                                        <p className="font-semibold">{user?.uRole || 'USER'}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-600">Địa chỉ</p>
                                        <p className="font-semibold">{user?.uAddress || 'Chưa cập nhật'}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Chỉnh sửa thông tin
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Chỉnh sửa thông tin</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Họ và tên
                                    <input
                                        type="text"
                                        name="uName"
                                        value={formData.uName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                    <input
                                        type="email"
                                        name="uEmail"
                                        value={formData.uEmail}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Số điện thoại
                                    <input
                                        type="text"
                                        name="uPhone"
                                        value={formData.uPhone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Vai trò
                                    <input
                                        type="text"
                                        name="uRole"
                                        value={formData.uRole}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                        disabled
                                    />
                                </label>
                            </div>
                            <div className="col-span-2 mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Địa chỉ
                                    <input
                                        type="text"
                                        name="uAddress"
                                        value={formData.uAddress}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setError(null);
                                    setSuccessMessage(null);
                                }}
                                className="mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
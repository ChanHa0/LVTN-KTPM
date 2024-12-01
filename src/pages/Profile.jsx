import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userApi from '../api/userApi';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        uName: '',
        uEmail: '',
        uPhone: '',
        uAddress: '',
        uAge: ''
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    toast.error('Vui lòng đăng nhập');
                    return;
                }

                const result = await userApi.getDetailUser(userId);
                if (result.status === 200) {
                    const userData = result.data;
                    setUser(userData);
                    setFormData({
                        uName: userData.uName || '',
                        uEmail: userData.uEmail || '',
                        uPhone: userData.uPhone || '',
                        uAddress: userData.uAddress || '',
                        uAge: userData.uAge || ''
                    });
                } else {
                    toast.error('Không thể lấy thông tin người dùng');
                }
            } catch (error) {
                toast.error('Không thể lấy thông tin người dùng');
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            const result = await userApi.updateUser(userId, formData);

            if (result.status === 200) {
                setUser(result.data);
                toast.success('Cập nhật thông tin thành công!');
                setIsEditing(false);
            } else {
                toast.error('Lỗi khi cập nhật thông tin');
            }
        } catch (error) {
            toast.error('Lỗi khi cập nhật thông tin');
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto">
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
                                        <p className="text-sm text-gray-600">Tuổi</p>
                                        <p className="font-semibold">{user?.uAge || 'Chưa cập nhật'}</p>
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
                                    Tuổi
                                    <input
                                        type="number"
                                        name="uAge"
                                        value={formData.uAge}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
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
                                onClick={() => setIsEditing(false)}
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
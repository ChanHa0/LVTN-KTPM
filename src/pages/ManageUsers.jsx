import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import userApi from '../api/userApi';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        uName: '',
        uEmail: '',
        uPassword: '',
        uAddress: '',
        uPhone: '',
        uRole: 'USER'
    });

    const roles = ['USER', 'ADMIN'];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await userApi.getAllUsers();
            if (response.status === 'OK') {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            toast.error('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.uName.trim()) return 'Vui lòng nhập họ tên';
        if (!formData.uEmail.trim()) return 'Vui lòng nhập email';
        if (!editingUser && !formData.uPassword) return 'Vui lòng nhập mật khẩu';
        if (!formData.uPhone.trim()) return 'Vui lòng nhập số điện thoại';
        if (!formData.uAddress.trim()) return 'Vui lòng nhập địa chỉ';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast.error(error);
            return;
        }

        try {
            setLoading(true);
            const response = editingUser
                ? await userApi.updateUser(editingUser._id, formData)
                : await userApi.registerUser(formData);

            if (response.status === 'OK') {
                toast.success(editingUser ? 'Cập nhật thành công' : 'Thêm mới thành công');
                setShowForm(false);
                resetForm();
                fetchUsers();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xử lý yêu cầu');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                setLoading(true);
                const response = await userApi.deleteUser(id);
                if (response.status === 'OK') {
                    toast.success('Xóa người dùng thành công');
                    fetchUsers();
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra khi xóa người dùng');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            uName: user.uName,
            uEmail: user.uEmail,
            uPassword: '',
            uAddress: user.uAddress,
            uPhone: user.uPhone,
            uRole: user.uRole
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            uName: '',
            uEmail: '',
            uPassword: '',
            uAddress: '',
            uPhone: '',
            uRole: 'USER'
        });
        setEditingUser(null);
    };

    const filteredUsers = users.filter(user =>
        user.uName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.uEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.uPhone.includes(searchTerm)
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
                    <p className="mt-2 text-sm text-gray-600">Quản lý và cập nhật thông tin người dùng</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-3 text-gray-400" />
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaPlus />
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vai trò</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                Không có người dùng nào
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.uName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.uEmail}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.uPhone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.uRole}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                    <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out" title="Chỉnh sửa">
                                                        <FaEdit className="inline-block w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out" title="Xóa">
                                                        <FaTrash className="inline-block w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg w-full max-w-2xl">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    {editingUser ? 'Cập nhật người dùng' : 'Thêm người dùng mới'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Họ tên</label>
                                            <input
                                                type="text"
                                                name="uName"
                                                value={formData.uName}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                name="uEmail"
                                                value={formData.uEmail}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                            <input
                                                type="password"
                                                name="uPassword"
                                                value={formData.uPassword}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required={!editingUser}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                            <input
                                                type="text"
                                                name="uPhone"
                                                value={formData.uPhone}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                            <input
                                                type="text"
                                                name="uAddress"
                                                value={formData.uAddress}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                                            <select
                                                name="uRole"
                                                value={formData.uRole}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            >
                                                {roles.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                resetForm();
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang xử lý...' : (editingUser ? 'Cập nhật' : 'Thêm mới')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
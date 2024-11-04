import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { userService } from '../../services/userApi';

const AdminUsers = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '0123456789',
            totalOrders: 5,
            totalSpent: 2500000,
            status: 'active'
        },
        // Thêm người dùng mẫu khác
    ]);
    const handleCreateUser = async (userData) => {
        try {
            const newUser = await userService.createUser(userData);
            setUsers([...users, newUser]);
        } catch (error) {
            console.error('Lỗi khi tạo người dùng:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await userService.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
        }
    };


    const statusColors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        blocked: 'bg-red-100 text-red-800'
    };

    const statusText = {
        active: 'Hoạt động',
        inactive: 'Không hoạt động',
        blocked: 'Đã khóa'
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý khách hàng</h1>

                {/* Search & Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khách hàng..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <select className="border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500">
                            <option value="">Tất cả trạng thái</option>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                            <option value="blocked">Đã khóa</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Liên hệ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Đơn hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Tổng chi tiêu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                        <div className="text-sm text-gray-500">{user.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.totalOrders}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.totalSpent.toLocaleString()}đ
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[user.status]}`}>
                                            {statusText[user.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                                            <FaEdit />
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;



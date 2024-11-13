import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { path: '/dashboard', label: 'Thống kê' },
        { path: '/manage-product', label: 'Quản lý sản phẩm' },
        { path: '/manage-user', label: 'Quản lý khách hàng' },
        { path: '/manage-order', label: 'Quản lý đơn hàng' },
    ];

    const handleLogout = () => {
        try {
            // Xóa token từ localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Thông báo đăng xuất thành công
            toast.success('Đăng xuất thành công');

            // Chuyển hướng về trang chủ
            navigate('/');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi đăng xuất');
        }
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-3 py-4 text-sm font-medium ${location.pathname === item.path
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-blue-600'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Thêm nút đăng xuất */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Đăng xuất
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
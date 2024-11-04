import React from 'react';
import { FaChartBar, FaBook, FaShoppingCart, FaUsers } from 'react-icons/fa';

const AdminNavbar = () => {
    const location = window.location.pathname;

    const navItems = [
        { path: '/admin', icon: <FaChartBar />, label: 'Thống kê' },
        { path: '/admin/sach', icon: <FaBook />, label: 'Quản lý sách' },
        { path: '/admin/dathang', icon: <FaShoppingCart />, label: 'Đơn hàng' },
        { path: '/admin/khachhang', icon: <FaUsers />, label: 'Khách hàng' },
    ];

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                className={`flex items-center px-3 py-4 text-sm font-medium transition-colors ${location === item.path
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-blue-600'
                                    }`}
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
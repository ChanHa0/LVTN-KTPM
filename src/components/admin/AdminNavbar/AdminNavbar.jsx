import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaBook, FaShoppingCart, FaUsers } from 'react-icons/fa';

const AdminNavbar = () => {
    const location = useLocation();

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
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-3 py-4 text-sm font-medium transition-colors ${location.pathname === item.path
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-blue-600'
                                    }`}
                            >
                                {item.icon}
                                <span className="ml-2">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
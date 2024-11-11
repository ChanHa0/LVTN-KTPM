import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', label: 'Thống kê' },
        { path: '/manage-product', label: 'Quản lý sản phẩm' },
        { path: '/manage-order', label: 'Quản lý đơn hàng' },
        { path: '/manage-user', label: 'Quản lý khách hàng' },
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
                                className={`flex items-center px-3 py-4 text-sm font-medium ${location.pathname === item.path
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-blue-600'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
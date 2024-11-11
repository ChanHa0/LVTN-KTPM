import React from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaStar, FaChartLine, FaGift } from 'react-icons/fa';

const Sidebar = () => {
    const categories = [
        { name: 'Sách Thiếu Nhi', path: '/category/thieu-nhi' },
        { name: 'Truyện Tranh', path: '/category/truyen-tranh' },
        { name: 'Tiểu Thuyết', path: '/category/tieu-thuyet' },
        { name: 'Sách Giáo Khoa', path: '/category/giao-khoa' },
        { name: 'Sách Ngoại Ngữ', path: '/category/ngoai-ngu' },
        { name: 'Sách Kinh Doanh', path: '/category/kinh-doanh' },
        { name: 'Sách Kỹ Năng Sống', path: '/category/ky-nang-song' },
        { name: 'Sách Tâm Lý', path: '/category/tam-ly' },
        { name: 'Sách Giáo Dục', path: '/category/giao-duc' },
        { name: 'Sách Self-help', path: '/category/self-help' },
    ];

    const popularLinks = [
        {
            name: 'Sách Bán Chạy',
            path: '/sach-ban-chay',
            icon: <FaFire className="text-red-500" size={18} />
        },
        {
            name: 'Sách Mới',
            path: '/sach-moi',
            icon: <FaGift className="text-green-500" size={18} />
        },
        {
            name: 'Sách Nổi Bật',
            path: '/sach-noi-bat',
            icon: <FaStar className="text-yellow-500" size={18} />
        },
        {
            name: 'Xu Hướng',
            path: '/xu-huong',
            icon: <FaChartLine className="text-blue-500" size={18} />
        },
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            {/* Danh mục */}
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Danh Mục Sách
                </h3>
                <div className="space-y-1">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={category.path}
                            className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Phổ biến */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Phổ Biến
                </h3>
                <div className="space-y-1">
                    {popularLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                        >
                            <span className="mr-3">{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
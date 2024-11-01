import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaFire, FaStar, FaChartLine, FaGift, FaGraduationCap, FaHeart, FaBrain, FaLightbulb, FaBusinessTime } from 'react-icons/fa';

const Sidebar = () => {
    const categories = [
        { name: 'Sách Thiếu Nhi', path: '/category/thieu-nhi', icon: <FaBook /> },
        { name: 'Truyện Tranh', path: '/category/truyen-tranh', icon: <FaBook /> },
        { name: 'Tiểu Thuyết', path: '/category/tieu-thuyet', icon: <FaBook /> },
        { name: 'Sách Giáo Khoa', path: '/category/giao-khoa', icon: <FaBook /> },
        { name: 'Sách Ngoại Ngữ', path: '/category/ngoai-ngu', icon: <FaBook /> },
        { name: 'Sách Kinh Doanh', path: '/category/kinh-doanh', icon: <FaBusinessTime /> },
        { name: 'Sách Kỹ Năng Sống', path: '/category/ky-nang-song', icon: <FaLightbulb /> },
        { name: 'Sách Tâm Lý', path: '/category/tam-ly', icon: <FaBrain /> },
        { name: 'Sách Giáo Dục', path: '/category/giao-duc', icon: <FaGraduationCap /> },
        { name: 'Sách Self-help', path: '/category/self-help', icon: <FaHeart /> },
    ];

    const popularLinks = [
        { name: 'Sách Bán Chạy', path: '/sach-ban-chay', icon: <FaFire className="text-red-500" /> },
        { name: 'Sách Mới', path: '/sach-moi', icon: <FaGift className="text-green-500" /> },
        { name: 'Sách Nổi Bật', path: '/sach-noi-bat', icon: <FaStar className="text-yellow-500" /> },
        { name: 'Xu Hướng', path: '/xu-huong', icon: <FaChartLine className="text-blue-500" /> },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
            {/* Danh mục */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh Mục Sách</h3>
                <ul className="space-y-2">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link
                                to={category.path}
                                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors"
                            >
                                {category.icon}
                                <span>{category.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Phổ biến */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Phổ Biến</h3>
                <ul className="space-y-2">
                    {popularLinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                to={link.path}
                                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors"
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
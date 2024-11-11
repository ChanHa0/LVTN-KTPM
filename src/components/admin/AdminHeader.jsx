import React, { useState } from 'react';
import { FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/dashboard" className="text-xl font-bold text-blue-600 hover:text-blue-700">DASHBOARD</Link>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="relative">
                            <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full">
                                <FaBell size={20} />
                            </button>
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                        <h3 className="font-semibold">Thông báo</h3>
                                        <button className="text-sm text-blue-600 hover:text-blue-700">Đánh dấu đã đọc</button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                                            <p className="text-sm text-gray-600">Đơn hàng mới #123</p>
                                            <span className="text-xs text-gray-400">2 phút trước</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                                    <FaUser className="text-white" size={16} />
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <div className="p-2">
                                        <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                            <FaUser className="mr-2 text-gray-400" size={16} />
                                            Hồ sơ
                                        </Link>
                                        <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                                            <FaSignOutAlt className="mr-2" size={16} />
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
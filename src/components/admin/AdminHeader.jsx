import React, { useState } from 'react';
import { FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';

const AdminHeader = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <a href="/admin" className="text-xl font-bold text-blue-600">
                        ADMIN DASHBOARD
                    </a>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                            >
                                <FaBell size={20} />
                            </button>
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="font-semibold">Thông báo</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {/* Notification items */}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <FaUser className="text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Admin</span>
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <a
                                        href="/admin/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Hồ sơ
                                    </a>
                                    <a
                                        href="/admin/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Cài đặt
                                    </a>
                                    <button
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                    >
                                        <FaSignOutAlt className="mr-2" />
                                        Đăng xuất
                                    </button>
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
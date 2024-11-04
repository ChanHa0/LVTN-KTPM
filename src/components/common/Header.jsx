import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="w-full bg-white shadow-md">
            {/* Header Top */}
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-8 py-2">
                    <div className="grid grid-cols-12 items-center text-sm">
                        <div className="col-span-9 flex items-center gap-6">
                            <a href="/support" className="text-gray-600 hover:text-blue-500 transition-colors">
                                Chăm sóc khách hàng
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="/orders/track" className="text-gray-600 hover:text-blue-500 transition-colors">
                                Kiểm tra đơn hàng
                            </a>
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-6">
                            <a href="/notifications" className="text-gray-600 hover:text-blue-500 transition-colors">
                                Thông báo
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="/help" className="text-gray-600 hover:text-blue-500 transition-colors">
                                Trợ giúp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Bottom */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex items-center justify-between gap-12">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors">
                                THE BOOK LOFT
                            </a>
                        </div>

                        {/* Search */}
                        <div className="flex-1 max-w-3xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sách..."
                                    className="w-full px-6 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors">
                                    <FaSearch size={20} />
                                </button>
                            </div>
                        </div>

                        {/* User Menu & Cart */}
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <FaUser className="text-blue-500" size={22} />
                                </button>
                                <div
                                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-50 ${isMenuOpen ? 'block' : 'hidden'
                                        }`}
                                >
                                    <a
                                        href="/dang-ky"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors"
                                    >
                                        Đăng ký
                                    </a>
                                    <a
                                        href="/dang-nhap"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors"
                                    >
                                        Đăng nhập
                                    </a>
                                </div>
                            </div>

                            <div className="relative">
                                <a href="/gio-hang" className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                                    <FaShoppingCart className="text-blue-500" size={22} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
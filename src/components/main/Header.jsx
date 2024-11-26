import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const SearchBar = () => (
    <div className="flex-1 max-w-3xl">
        <div className="relative">
            <input
                type="text"
                placeholder="Tìm kiếm sách..."
                className="w-full px-6 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600">
                <FaSearch size={20} />
            </button>
        </div>
    </div>
);

const UserMenu = ({ isMenuOpen, setIsMenuOpen }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            setUser(JSON.parse(userStr));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
            >
                <FaUser className="text-blue-500" size={22} />
                {user && <span className="text-sm font-medium text-gray-700">{user.name || 'User'}</span>}
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    {user ? (
                        <>
                            <div className="px-4 py-2 text-gray-600 border-b border-gray-100">
                                {user.email}
                            </div>
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Thông tin cá nhân
                            </Link>
                            <Link
                                to="/my-orders"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Đơn hàng của tôi
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Đăng ký
                            </Link>
                            <Link
                                to="/login"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-500"
                            >
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const CartButton = ({ cartCount }) => (
    <div className="relative">
        <Link
            to="/cart"
            className="inline-flex p-3 hover:bg-gray-100 rounded-full"
        >
            <FaShoppingCart className="text-blue-500" size={22} />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                </span>
            )}
        </Link>
    </div>
);

const Header = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-md">
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-8">
                        <Link to="/" className="flex-shrink-0 text-2xl font-bold text-blue-500 hover:text-blue-600">
                            THE BOOK LOFT
                        </Link>

                        <SearchBar />

                        <div className="flex items-center gap-4">
                            <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                            <CartButton cartCount={cartCount} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
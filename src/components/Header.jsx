import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt, FaChevronDown, FaBell } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const SearchBar = () => (
    <div className="flex-1 max-w-3xl">
        <div className="relative">
            <input
                type="text"
                placeholder="Tìm kiếm sách..."
                className="w-full px-6 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-600">
                <FaSearch size={20} />
            </button>
        </div>
    </div>
);

const UserMenu = ({ isMenuOpen, setIsMenuOpen, isAdmin }) => {
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
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <FaUser className="text-white" size={16} />
                </div>
                {user && (
                    <>
                        <span className="hidden sm:block text-sm font-medium text-gray-700">{user.name || 'User'}</span>
                        <FaChevronDown className="text-gray-500" size={12} />
                    </>
                )}
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="p-2">
                        {user ? (
                            <>
                                <Link to={`/user/${user._id}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                    <FaUser className="mr-2 text-gray-400" size={16} />
                                    Hồ sơ
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                    Đăng ký
                                </Link>
                                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                    Đăng nhập
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const CartButton = ({ cartCount }) => (
    <div className="relative">
        <Link
            to="/cart"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
        >
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <FaShoppingCart className="text-white" size={16} />
            </div>
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                </span>
            )}
        </Link>
    </div>
);

const Header = ({ isAdmin = false }) => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-md">
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link to={isAdmin ? "/dashboard" : "/"} className="flex-shrink-0 text-xl font-bold text-blue-600 hover:text-blue-700 transition duration-30">
                        {isAdmin ? "DASHBOARD" : "THE BOOK LOFT"}
                    </Link>

                    {!isAdmin && <SearchBar />}

                    <div className="flex items-center gap-2">
                        {isAdmin && (
                            <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full">
                                <FaBell size={20} />
                            </button>
                        )}
                        <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isAdmin={isAdmin} />
                        {!isAdmin && <CartButton cartCount={cartCount} />}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
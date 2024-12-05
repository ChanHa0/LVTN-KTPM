import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/product`);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex-1 max-w-3xl">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-6 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
                >
                    <FaSearch size={20} />
                </button>
            </div>
        </div>
    );
};

const UserMenu = ({ isMenuOpen, setIsMenuOpen, isAdmin, userName }) => {
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
                <span className="hidden sm:block text-sm font-medium text-gray-700">{userName}</span>
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="p-2">
                        {user ? (
                            <>
                                <Link to={`/profile`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                    <FaUser className="mr-2 text-gray-400" size={16} />
                                    Hồ sơ
                                </Link>
                                {!isAdmin && (
                                    <Link to={`/myorders`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                        <FaShoppingCart className="mr-2 text-gray-400" size={16} />
                                        Đơn hàng của tôi
                                    </Link>
                                )}
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

const CartButton = ({ cartCount }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="relative">
            <Link
                to={user ? `/cart` : '/login'}
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
};

const Header = () => {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setIsAdmin(user.uRole === 'ADMIN');
            setUserName(user.uName);
        }
    }, []);

    return (
        <header className="w-full bg-gradient-to-r from-blue-500 to-purple-300 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <Link to={isAdmin ? "/dashboard" : "/"} className="flex-shrink-0 text-2xl font-bold text-black hover:text-gray-300 transition duration-300">
                    {isAdmin ? "DASHBOARD" : "THE BOOK LOFT"}
                </Link>

                {isAdmin ? (
                    <div className="flex items-center space-x-4">

                        <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isAdmin={isAdmin} userName={userName} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center flex-1 space-x-4">
                        <SearchBar />
                        <CartButton cartCount={cartCount} />
                        <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isAdmin={isAdmin} userName={userName} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
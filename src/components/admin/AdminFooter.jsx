import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter = () => {

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-sm text-gray-600"> © {new Date().getFullYear()} The Book Loft. Đã đăng ký bản quyền.</p>
                    <div className="flex space-x-4 sm:space-x-6">
                        <Link to="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Điều khoản</Link>
                        <Link to="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Chính sách</Link>
                        <Link to="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Liên hệ</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AdminFooter;
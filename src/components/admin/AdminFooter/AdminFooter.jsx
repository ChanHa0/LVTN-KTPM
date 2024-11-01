import React from 'react';

const AdminFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        © 2024 The Book Loft. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="/admin/terms" className="text-sm text-gray-600 hover:text-blue-600">
                            Điều khoản
                        </a>
                        <a href="/admin/policy" className="text-sm text-gray-600 hover:text-blue-600">
                            Chính sách
                        </a>
                        <a href="/admin/contact" className="text-sm text-gray-600 hover:text-blue-600">
                            Liên hệ
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AdminFooter;
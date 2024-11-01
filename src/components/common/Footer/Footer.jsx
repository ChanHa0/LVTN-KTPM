import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white">
            {/* Footer Top */}
            <div className="border-t">
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Hỗ trợ khách hàng */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Hỗ trợ khách hàng
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/support/hotline" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Hotline: 1900-xxxx
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/support/ordering" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Hướng dẫn đặt hàng
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/support/shipping" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Phương thức vận chuyển
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/support/returns" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Chính sách đổi trả
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Về The Book Loft */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Về The Book Loft
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Điều khoản sử dụng
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Chính sách bảo mật
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/careers" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Tuyển dụng
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Hợp tác và liên kết */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Hợp tác và liên kết
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/regulations" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Quy chế hoạt động
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/seller" className="text-gray-600 hover:text-blue-500 transition-colors">
                                        Bán hàng cùng chúng tôi
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t bg-gray-50">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-600 text-sm text-center md:text-left">
                            <p className="mb-1">Công ty TNHH The Book Loft</p>
                            <p className="mb-1">Địa chỉ: 123 Đường Sách, Quận 1, TP.HCM</p>
                            <p>Email: info@thebookloft.com</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Thêm logo chứng nhận ở đây */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
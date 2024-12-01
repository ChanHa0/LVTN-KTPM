import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaypal, FaCcVisa, FaCcMastercard, FaMoneyBillWave } from 'react-icons/fa';

const footerData = {
    sections: [
        {
            title: 'Hỗ trợ khách hàng',
            links: [
                { label: 'Hotline: 1900-xxxx', path: '/' },
                { label: 'Hướng dẫn đặt hàng', path: '/' },
                { label: 'Phương thức vận chuyển', path: '/' },
                { label: 'Chính sách đổi trả', path: '/' }
            ]
        },
        {
            title: 'Về The Book Loft',
            links: [
                { label: 'Giới thiệu', path: '/' },
                { label: 'Điều khoản sử dụng', path: '/' },
                { label: 'Chính sách bảo mật', path: '/' },
                { label: 'Tuyển dụng', path: '/' }
            ]
        },
        {
            title: 'Hợp tác và liên kết',
            links: [
                { label: 'Quy chế hoạt động', path: '/' },
                { label: 'Bán hàng cùng chúng tôi', path: '/' }
            ]
        }
    ],
    payments: [
        { icon: FaPaypal, label: 'PayPal' },
        { icon: FaCcVisa, label: 'Visa' },
        { icon: FaCcMastercard, label: 'Mastercard' },
        { icon: FaMoneyBillWave, label: 'Tiền mặt' }
    ]
};

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {footerData.sections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-700 hover:text-blue-600 transition duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                        <div className="flex flex-wrap gap-4">
                            {footerData.payments.map((payment, index) => (
                                <payment.icon
                                    key={index}
                                    className="text-gray-700 hover:text-blue-600 transition duration-200"
                                    size={24}
                                    title={payment.label}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-t border-gray-200 mt-auto">
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
            </div>
        </footer>
    );
};

export default Footer;
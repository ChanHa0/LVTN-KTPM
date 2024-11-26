import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaypal, FaCcVisa, FaCcMastercard, FaMoneyBillWave, FaHeadset, FaBook, FaHandshake } from 'react-icons/fa';

const footerData = {
    sections: [
        {
            title: 'Hỗ trợ khách hàng',
            icon: FaHeadset,
            links: [
                { label: 'Hotline: 1900-xxxx', path: '/support' },
                { label: 'Hướng dẫn đặt hàng', path: '/guide' },
                { label: 'Phương thức vận chuyển', path: '/shipping' },
                { label: 'Chính sách đổi trả', path: '/return-policy' }
            ]
        },
        {
            title: 'Về The Book Loft',
            icon: FaBook,
            links: [
                { label: 'Giới thiệu', path: '/about' },
                { label: 'Điều khoản sử dụng', path: '/terms' },
                { label: 'Chính sách bảo mật', path: '/privacy' },
                { label: 'Tuyển dụng', path: '/careers' }
            ]
        },
        {
            title: 'Hợp tác và liên kết',
            icon: FaHandshake,
            links: [
                { label: 'Quy chế hoạt động', path: '/rules' },
                { label: 'Bán hàng cùng chúng tôi', path: '/seller' }
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
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {footerData.sections.map((section, index) => (
                        <div key={index}>
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                                <section.icon className="text-blue-500" size={20} />
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-600 hover:text-blue-500 transition duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                            <FaMoneyBillWave className="text-blue-500" size={20} />
                            Phương thức thanh toán
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {footerData.payments.map((payment, index) => (
                                <payment.icon
                                    key={index}
                                    className="text-gray-600 hover:text-blue-500 transition duration-200"
                                    size={24}
                                    title={payment.label}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
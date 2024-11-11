import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
    support: {
        title: 'Hỗ trợ khách hàng',
        links: [
            { label: 'Hotline: 1900-xxxx', path: '/support' },
            { label: 'Hướng dẫn đặt hàng', path: '/guide' },
            { label: 'Phương thức vận chuyển', path: '/shipping' },
            { label: 'Chính sách đổi trả', path: '/return-policy' }
        ]
    },
    about: {
        title: 'Về The Book Loft',
        links: [
            { label: 'Giới thiệu', path: '/about' },
            { label: 'Điều khoản sử dụng', path: '/terms' },
            { label: 'Chính sách bảo mật', path: '/privacy' },
            { label: 'Tuyển dụng', path: '/careers' }
        ]
    },
    cooperation: {
        title: 'Hợp tác và liên kết',
        links: [
            { label: 'Quy chế hoạt động', path: '/rules' },
            { label: 'Bán hàng cùng chúng tôi', path: '/seller' }
        ]
    }
};

const FooterSection = ({ title, links }) => (
    <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {title}
        </h3>
        <ul className="space-y-3">
            {links.map((link, index) => (
                <li key={index}>
                    <Link
                        to={link.path}
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = () => {
    return (
        <footer className="bg-white mt-8">
            <div className="border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FooterSection {...footerLinks.support} />
                        <FooterSection {...footerLinks.about} />
                        <FooterSection {...footerLinks.cooperation} />
                    </div>
                </div>
            </div>

            <div className="border-t bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-600 text-sm text-center md:text-left">
                            <p className="mb-1">Công ty TNHH The Book Loft</p>
                            <p className="mb-1">Địa chỉ: 123 Đường Sách, Quận 1, TP.HCM</p>
                            <p>Email: info@thebookloft.com</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Có thể thêm logo chứng nhận hoặc social media icons ở đây */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
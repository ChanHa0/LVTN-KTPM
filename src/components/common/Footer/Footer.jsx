import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './Footer.scss';

const { Footer: AntFooter } = Layout;

const Footer = () => {
    return (
        <AntFooter className="footer">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <h3>Về chúng tôi</h3>
                    <p>The Book Loft là cửa hàng sách trực tuyến hàng đầu, cung cấp đa dạng sách cho mọi độc giả.</p>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <h3>Liên kết nhanh</h3>
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/sanpham">Sản phẩm</Link></li>
                        <li><Link to="/giohang">Giỏ hàng</Link></li>
                        <li><Link to="/lienhe">Liên hệ</Link></li>
                    </ul>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <h3>Liên hệ</h3>
                    <p>Địa chỉ: 123 Đường Sách, Quận 1, TP.HCM</p>
                    <p>Email: info@thebookloft.com</p>
                    <p>Điện thoại: (028) 1234 5678</p>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="copyright">
                        <p>&copy; 2024 The Book Loft. Tất cả quyền được bảo lưu.</p>
                    </div>
                </Col>
            </Row>
        </AntFooter>
    );
};

export default Footer;
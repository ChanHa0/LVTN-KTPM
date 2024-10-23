import React, { useState } from "react";
import { Typography, Row, Col, Button, Card } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./HomePage.css";

const { Title } = Typography;

const HomePage = () => {
    const danhMucSach = ['Sách Thiếu Nhi', 'Truyện', 'Tiểu Thuyết', 'Sách Giáo Khoa', 'Sách Ngoại Ngữ', 'Sách Ngoại Ngữ'];
    const [setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(prevCount => prevCount + 1);
    };

    return (
        <>
            <div className="container">
                <Title level={2} style={{ marginTop: '40px', marginBottom: '20px' }}>Danh mục sách</Title>
                <Row gutter={[16, 16]}>
                    {danhMucSach.map((loaiSach) => (
                        <Col key={loaiSach} xs={12} sm={8} md={6} lg={4}>
                            <Button type="primary" block>{loaiSach}</Button>
                        </Col>
                    ))}
                </Row>
                <Title level={2} style={{ marginTop: '20px' }}>Sách nổi bật</Title>
                <Row gutter={[16, 16]}>
                    {[...Array(18)].map((_, index) => (
                        <Col key={index} xs={12} sm={8} md={6} lg={4}>
                            <Link to="/sanpham" className="card-link">
                                <Card
                                    hoverable
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                    className="card"
                                >
                                    <h3 className="product-name">Sách {index + 1}</h3>
                                    <div className="report-text">
                                        <span style={{ marginRight: '4px' }}>
                                            <span>4.5 </span><StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                                        </span>
                                        <span>| Đã bán 1000+</span>
                                    </div>
                                    <div className="price-text">
                                        1.000.000đ
                                        <span className="discount-text">-5%</span>
                                    </div>
                                    <Button onClick={handleAddToCart}>Thêm vào giỏ hàng</Button>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="primary">Xem thêm</Button>
            </div>
        </>
    );
}

export default HomePage;

import React, { useState } from 'react';
import { Typography, Descriptions, Image, Row, Col, Button, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProductPage = ({ updateCartCount }) => {
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(prevCount => prevCount + 1);
        updateCartCount(cartCount + 1);
        message.success('Sản phẩm đã được thêm vào giỏ hàng');
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Chi tiết sản phẩm</Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Image
                        width="100%"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                </Col>
                <Col xs={24} sm={12} md={16} lg={18}>
                    <Descriptions title="Thông tin sản phẩm" layout="vertical" bordered column={{ xs: 1, sm: 2, md: 3 }}>
                        <Descriptions.Item label="Tên sách">Tên sách mẫu</Descriptions.Item>
                        <Descriptions.Item label="Tác giả">Tác giả mẫu</Descriptions.Item>
                        <Descriptions.Item label="Giá">100.000đ</Descriptions.Item>
                        <Descriptions.Item label="Mô tả">
                            Đây là mô tả chi tiết về cuốn sách. Nó có thể bao gồm nhiều thông tin như nội dung, đánh giá, và các chi tiết khác.
                        </Descriptions.Item>
                    </Descriptions>
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddToCart} style={{ marginRight: '10px' }}>
                            Thêm vào giỏ hàng
                        </Button>
                        <Button type="primary">Mua ngay</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductPage;
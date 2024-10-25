import React from 'react';
import { Typography, Card, Row, Col } from 'antd';

const { Title } = Typography;

const AdminDashboard = () => {
    return (
        <div>
            <Title level={2}>Dashboard</Title>
            <Row gutter={16}>
                <Col span={6}>
                    <Card title="Tổng số sách" bordered={false}>
                        100
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Đơn hàng mới" bordered={false}>
                        10
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Doanh thu hôm nay" bordered={false}>
                        5.000.000đ
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Khách hàng mới" bordered={false}>
                        5
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard;
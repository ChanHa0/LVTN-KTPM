import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to="/admin">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/admin/books">Quản lý sách</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/admin/orders">Quản lý đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/admin/customers">Quản lý khách hàng</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Admin Panel ©2024 Created by Your Company</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
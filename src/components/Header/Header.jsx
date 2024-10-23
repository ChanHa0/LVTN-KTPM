import React, { useState } from 'react';
import { Layout, Input, Badge, Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => navigate('/hoso')}>Thông tin người dùng</Menu.Item>
            <Menu.Item key="2" onClick={() => navigate('/dangky')}>Đăng ký</Menu.Item>
            <Menu.Item key="3" onClick={() => navigate('/dangnhap')}>Đăng nhập</Menu.Item>


        </Menu>
    );

    const updateCartCount = () => {
        setCartCount(prevCount => prevCount + 1);
    };

    return (
        <AntHeader className="header">
            <div className="header-content">
                <div className="logo">
                    <Link to="/">THE BOOK LOFT</Link>
                </div>
                <Input
                    className="search-input"
                    placeholder="Tìm kiếm sách..."
                    prefix={<SearchOutlined />}
                />
                <div className="right-section">
                    <Dropdown overlay={menu} placement="bottomRight">
                        <Avatar icon={<UserOutlined />} />
                    </Dropdown>
                    <Badge count={cartCount}>
                        <ShoppingCartOutlined className="cart-icon" onClick={updateCartCount} />
                    </Badge>
                    <span className="cart-count"></span>
                </div>
            </div>
        </AntHeader>
    );
};

export default Header;
import React from 'react';
import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./Card.css"

const Cards = () => {
    return (
        <Link to="/sanpham" className="cardLink">
            <Card
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                className="card"
            >
                <h3 className="productName">Sach</h3>
                <div className="reportText">
                    <span style={{ marginRight: '4px' }}>
                        <span>4.5 </span><StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                    </span>
                    <span>| Da ban 1000+</span>
                </div>
                <div className="priceText">
                    1.000.000d
                    <span className="discountText">
                        -5%
                    </span>
                </div>
            </Card>
        </Link>
    );
};

export default Cards;
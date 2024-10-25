import React from 'react';
import { Card } from 'antd';
import './ProductCard.scss';

const ProductCard = ({ title, price, image }) => {
    return (
        <Card
            hoverable
            cover={<img alt={title} src={image} />}
            className="card"
        >
            <Card.Meta title={title} description={`Giá: ${price} đ`} />
        </Card>
    );
};

export default ProductCard;
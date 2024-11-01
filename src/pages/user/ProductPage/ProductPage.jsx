import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductPage.scss';

const ProductPage = ({ updateCartCount }) => {
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(prevCount => prevCount + 1);
        updateCartCount(cartCount + 1);
        // Thêm thông báo
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = 'Sản phẩm đã được thêm vào giỏ hàng';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    };

    return (
        <div className="product-page">
            <h2 className="page-title">Chi tiết sản phẩm</h2>
            <div className="product-container">
                <div className="product-image">
                    <img
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        alt="Product"
                    />
                </div>
                <div className="product-info">
                    <div className="info-section">
                        <h3>Thông tin sản phẩm</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="label">Tên sách:</span>
                                <span className="value">Tên sách mẫu</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Tác giả:</span>
                                <span className="value">Tác giả mẫu</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Giá:</span>
                                <span className="value">100.000đ</span>
                            </div>
                            <div className="info-item full-width">
                                <span className="label">Mô tả:</span>
                                <p className="value">
                                    Đây là mô tả chi tiết về cuốn sách. Nó có thể bao gồm nhiều thông tin như nội dung, đánh giá, và các chi tiết khác.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            <FaShoppingCart /> Thêm vào giỏ hàng
                        </button>
                        <button className="buy-now">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
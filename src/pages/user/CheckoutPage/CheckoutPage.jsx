import React, { useState } from 'react';
import './CheckoutPage.scss';

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        paymentMethod: 'cod'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Đơn hàng đã được đặt:', formData);
    };

    return (
        <div className="checkout-page">
            <h2 className="checkout-title">Thanh toán</h2>

            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>Thông tin giao hàng</h3>
                        <div className="input-group">
                            <label htmlFor="fullName">Họ và tên</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label htmlFor="city">Tỉnh/Thành phố</label>
                                <select
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    <option value="hcm">TP. Hồ Chí Minh</option>
                                    <option value="hn">Hà Nội</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="district">Quận/Huyện</label>
                                <select
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn quận/huyện</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label htmlFor="ward">Phường/Xã</label>
                                <select
                                    id="ward"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn phường/xã</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Phương thức thanh toán</h3>
                        <div className="payment-methods">
                            <label className="payment-method">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={formData.paymentMethod === 'cod'}
                                    onChange={handleInputChange}
                                />
                                <span>Thanh toán khi nhận hàng (COD)</span>
                            </label>
                            <label className="payment-method">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="banking"
                                    checked={formData.paymentMethod === 'banking'}
                                    onChange={handleInputChange}
                                />
                                <span>Chuyển khoản ngân hàng</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="place-order-button">
                        Đặt hàng
                    </button>
                </form>

                <div className="order-summary">
                    <h3>Đơn hàng của bạn</h3>
                    <div className="summary-items">
                        <div className="summary-item">
                            <span>Sách mẫu 1 x 1</span>
                            <span>100.000đ</span>
                        </div>
                        <div className="summary-item">
                            <span>Sách mẫu 2 x 2</span>
                            <span>300.000đ</span>
                        </div>
                    </div>
                    <div className="summary-total">
                        <div className="summary-row">
                            <span>Tạm tính:</span>
                            <span>400.000đ</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển:</span>
                            <span>30.000đ</span>
                        </div>
                        <div className="summary-row total">
                            <span>Tổng cộng:</span>
                            <span>430.000đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
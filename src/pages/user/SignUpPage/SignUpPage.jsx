import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import './SignUpPage.scss';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        try {
            const response = await authService.register({
                cName: formData.username,
                cEmail: formData.email,
                cPassword: formData.password
            });

            if (response.status === 'OK') {
                navigate('/dangnhap');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div className="sign-up">
            <form className="sign-up__form" onSubmit={handleSubmit}>
                <h2 className="sign-up__title">Đăng ký</h2>

                {error && <div className="error-message">{error}</div>}

                <div className="sign-up__input-group">
                    <label htmlFor="username" className="sign-up__label">Tên đăng nhập</label>
                    <input
                        type="text"
                        id="username"
                        className="sign-up__input"
                        placeholder="Chọn tên đăng nhập"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sign-up__input-group">
                    <label htmlFor="email" className="sign-up__label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="sign-up__input"
                        placeholder="Nhập địa chỉ email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sign-up__input-group">
                    <label htmlFor="password" className="sign-up__label">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        className="sign-up__input"
                        placeholder="Tạo mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sign-up__input-group">
                    <label htmlFor="confirmPassword" className="sign-up__label">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="sign-up__input"
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="sign-up__submit">Đăng ký</button>

                <p className="sign-up__signin-link">
                    Đã có tài khoản? <Link to="/dangnhap">Đăng nhập</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUpPage;
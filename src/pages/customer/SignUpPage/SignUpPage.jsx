import React from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.scss';

const SignUpPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="sign-up">
            <form className="sign-up__form" onSubmit={handleSubmit}>
                <h2 className="sign-up__title">Đăng ký</h2>

                <div className="sign-up__input-group">
                    <label htmlFor="username" className="sign-up__label">Tên đăng nhập</label>
                    <input type="text" id="username" className="sign-up__input" placeholder="Chọn tên đăng nhập" required />
                </div>

                <div className="sign-up__input-group">
                    <label htmlFor="email" className="sign-up__label">Email</label>
                    <input type="email" id="email" className="sign-up__input" placeholder="Nhập địa chỉ email" required />
                </div>

                <div className="sign-up__input-group">
                    <label htmlFor="password" className="sign-up__label">Mật khẩu</label>
                    <input type="password" id="password" className="sign-up__input" placeholder="Tạo mật khẩu" required />
                </div>

                <div className="sign-up__input-group">
                    <label htmlFor="confirm-password" className="sign-up__label">Xác nhận mật khẩu</label>
                    <input type="password" id="confirm-password" className="sign-up__input" placeholder="Nhập lại mật khẩu" required />
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
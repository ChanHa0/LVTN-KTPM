import React from 'react';
import { Link } from 'react-router-dom';
import './SignInPage.css';

const SignInPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="sign-in">
            <form className="sign-in__form" onSubmit={handleSubmit}>
                <h2 className="sign-in__title">Đăng nhập</h2>

                <div className="sign-in__input-group">
                    <label htmlFor="username" className="sign-in__label">Tên đăng nhập</label>
                    <input type="text" id="username" className="sign-in__input" placeholder="Nhập tên đăng nhập" required />
                </div>

                <div className="sign-in__input-group">
                    <label htmlFor="password" className="sign-in__label">Mật khẩu</label>
                    <input type="password" id="password" className="sign-in__input" placeholder="Nhập mật khẩu" required />
                </div>

                <div className="sign-in__options">
                    <label className="sign-in__remember">
                        <input type="checkbox" /> Ghi nhớ đăng nhập
                    </label>
                    <Link to="/quenmatkhau" className="sign-in__forgot-password">Quên mật khẩu?</Link>
                </div>

                <button type="submit" className="sign-in__submit">Đăng nhập</button>

                <p className="sign-in__signup-link">
                    Chưa có tài khoản? <Link to="/dangky">Đăng ký ngay</Link>
                </p>
            </form>
        </div>
    );
};

export default SignInPage;
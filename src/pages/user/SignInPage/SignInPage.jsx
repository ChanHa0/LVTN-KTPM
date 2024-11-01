// import React from 'react';
// import { Link } from 'react-router-dom';
// import './SignInPage.scss';

// const SignInPage = () => {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form submitted');
//     };

//     return (
//         <div className="sign-in">
//             <form className="sign-in__form" onSubmit={handleSubmit}>
//                 <h2 className="sign-in__title">Đăng nhập</h2>

//                 <div className="sign-in__input-group">
//                     <label htmlFor="username" className="sign-in__label">Tên đăng nhập</label>
//                     <input type="text" id="username" className="sign-in__input" placeholder="Nhập tên đăng nhập" required />
//                 </div>

//                 <div className="sign-in__input-group">
//                     <label htmlFor="password" className="sign-in__label">Mật khẩu</label>
//                     <input type="password" id="password" className="sign-in__input" placeholder="Nhập mật khẩu" required />
//                 </div>

//                 <div className="sign-in__options">
//                     <label className="sign-in__remember">
//                         <input type="checkbox" /> Ghi nhớ đăng nhập
//                     </label>
//                     <Link to="/quenmatkhau" className="sign-in__forgot-password">Quên mật khẩu?</Link>
//                 </div>

//                 <button type="submit" className="sign-in__submit">Đăng nhập</button>

//                 <p className="sign-in__signup-link">
//                     Chưa có tài khoản? <Link to="/dangky">Đăng ký ngay</Link>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default SignInPage;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';

const SignInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(formData);
            if (response.status === 'OK') {
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="sign-in">
            <form className="sign-in__form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                <div className="sign-in__input-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="sign-in__input-group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mật khẩu"
                        required
                    />
                </div>

                <button type="submit" className="sign-in__submit">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default SignInPage;
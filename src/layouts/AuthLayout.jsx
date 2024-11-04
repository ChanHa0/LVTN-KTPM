import React from 'react';
import Header from '../components/common/Header';

const AuthLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
};

export default AuthLayout;
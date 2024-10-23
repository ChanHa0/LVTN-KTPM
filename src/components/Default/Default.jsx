import React from 'react';
import Header from '../Header/Header';

const Default = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Default;
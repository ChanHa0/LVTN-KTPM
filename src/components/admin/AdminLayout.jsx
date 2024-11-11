import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminHeader />
            <main>
                {children}
            </main>
            <AdminFooter />
        </>
    );
};

export default AdminLayout;
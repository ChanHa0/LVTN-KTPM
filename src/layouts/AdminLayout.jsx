import React from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminFooter from '../components/admin/AdminFooter';

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
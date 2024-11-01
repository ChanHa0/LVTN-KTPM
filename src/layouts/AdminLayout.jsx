import React from 'react';
import AdminHeader from '../components/admin/AdminHeader/AdminHeader';
import AdminFooter from '../components/admin/AdminFooter/AdminFooter';

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <AdminHeader />
            <main className="flex-1">
                {children}
            </main>
            <AdminFooter />
        </div>
    );
};

export default AdminLayout;
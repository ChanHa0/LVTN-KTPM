import Dashboard from '../pages/admin/Dashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageOrders from '../pages/admin/ManageOrders';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminLayout from '../layouts/AdminLayout';

export const adminRoutes = [
    {
        path: '/admin',
        element: <AdminLayout><Dashboard /></AdminLayout>
    },
    {
        path: '/admin/quan-li-san-pham',
        element: <AdminLayout><ManageProducts /></AdminLayout>
    },
    {
        path: '/admin/quan-li-don-hang',
        element: <AdminLayout><ManageOrders /></AdminLayout>
    },
    {
        path: '/admin/quan-li-tai-khoan',
        element: <AdminLayout><ManageUsers /></AdminLayout>
    }
];
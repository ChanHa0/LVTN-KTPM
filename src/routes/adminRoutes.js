import Dashboard from '../pages/admin/Dashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageOrders from '../pages/admin/ManageOrders';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminLayout from '../components/admin/AdminLayout';

export const adminRoutes = [
    {
        path: '/dashboard',
        element: <AdminLayout><Dashboard /></AdminLayout>
    },
    {
        path: '/manage-product',
        element: <AdminLayout><ManageProducts /></AdminLayout>
    },
    {
        path: '/manage-order',
        element: <AdminLayout><ManageOrders /></AdminLayout>
    },
    {
        path: '/manage-user',
        element: <AdminLayout><ManageUsers /></AdminLayout>
    }
];
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminLayout from '../layouts/AdminLayout';
export const adminRoutes = [
    {
        path: '/admin',
        element: <AdminLayout><AdminDashboard /></AdminLayout>
    },
    {
        path: '/admin/quan-li-san-pham',
        element: <AdminLayout><AdminProducts /></AdminLayout>
    },
    {
        path: '/admin/quan-li-don-hang',
        element: <AdminLayout><AdminOrders /></AdminLayout>
    },
    {
        path: '/admin/quan-li-tai-khoan',
        element: <AdminLayout><AdminUsers /></AdminLayout>
    }
];
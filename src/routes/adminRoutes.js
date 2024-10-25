import AdminLayout from '../layouts/AdminLayou';
import AdminDashboard from '../pages/admin/AdminDashboard/AdminDashboard';
import AdminBooks from '../pages/admin/AdminBooks/AdminBooks';
import AdminOrders from '../pages/admin/AdminOrders/AdminOrders';
import AdminCustomers from '../pages/admin/AdminCustomers/AdminCustomers';

export const adminRoutes = [
    {
        path: '/admin',
        element: <AdminLayout><AdminDashboard /></AdminLayout>
    },
    {
        path: '/admin/books',
        element: <AdminLayout><AdminBooks /></AdminLayout>
    },
    {
        path: '/admin/orders',
        element: <AdminLayout><AdminOrders /></AdminLayout>
    },
    {
        path: '/admin/customers',
        element: <AdminLayout><AdminCustomers /></AdminLayout>
    }
];
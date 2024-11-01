import DashboardPage from '../pages/admin/DashboardPage/DashboardPage';
import ProductsPage from '../pages/admin/ProductsPage/ProductsPage';
import OrdersPage from '../pages/admin/OrdersPage/OrdersPage';
import UsersPage from '../pages/admin/UsersPage/UsersPage';
import AdminLayout from '../layouts/AdminLayout';
export const adminRoutes = [
    {
        path: '/admin',
        element: <AdminLayout><DashboardPage /></AdminLayout>
    },
    {
        path: '/admin/sach',
        element: <AdminLayout><ProductsPage /></AdminLayout>
    },
    {
        path: '/admin/dathang',
        element: <AdminLayout><OrdersPage /></AdminLayout>
    },
    {
        path: '/admin/khachhang',
        element: <AdminLayout><UsersPage /></AdminLayout>
    }
];
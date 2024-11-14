import Home from "./pages/user/Home";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import ProductDetail from "./pages/user/ProductDetail";
import Product from "./pages/user/Product";
import Search from "./pages/user/Search";
import Order from "./pages/user/Order";
import OrderDetail from "./pages/user/OrderDetail";
import Payment from "./pages/user/Payment";
import NotFound from "./pages/user/NotFound";
import MainLayout from "./components/main/MainLayout";
import AuthLayout from "./components/main/AuthLayout";

import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import AdminLayout from './components/admin/AdminLayout';

export const routes = [
    {
        path: '/',
        element: <MainLayout><Home /></MainLayout>
    },
    {
        path: '/register',
        element: <AuthLayout><Register /></AuthLayout>
    },
    {
        path: '/login',
        element: <AuthLayout><Login /></AuthLayout>
    },
    {
        path: '/profile',
        element: <MainLayout><Profile /></MainLayout>
    },
    {
        path: '/product',
        element: <MainLayout><Product /></MainLayout>
    },
    {
        path: '/product-detail',
        element: <MainLayout><ProductDetail /></MainLayout>
    },
    {
        path: '/search',
        element: <MainLayout><Search /></MainLayout>
    },
    {
        path: '/order',
        element: <MainLayout><Order /></MainLayout>
    },
    {
        path: '/order-detail',
        element: <MainLayout><OrderDetail /></MainLayout>
    },
    {
        path: '/payment',
        element: <MainLayout><Payment /></MainLayout>
    },
    {
        path: '*',
        element: <NotFound />
    },
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
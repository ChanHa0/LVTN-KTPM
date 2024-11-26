import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Product from "./pages/Product";
import Order from "./pages/Order";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/main/MainLayout";
import AuthLayout from "./components/main/AuthLayout";
import Dashboard from './pages/Dashboard';
import ManageProducts from './pages/ManageProducts';
import ManageUsers from "./pages/ManageUsers";
import ManageOrders from './pages/ManageOrders';
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
        path: '/product/:id',
        element: <MainLayout><ProductDetail /></MainLayout>
    },
    {
        path: '/cart',
        element: <MainLayout><Cart /></MainLayout>
    },
    {
        path: '/order',
        element: <MainLayout><Order /></MainLayout>
    },
    {
        path: '/my-orders',
        element: <MainLayout><MyOrders /></MainLayout>
    },
    {
        path: '/checkout',
        element: <MainLayout><Checkout /></MainLayout>
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
        path: '/manage-user',
        element: <AdminLayout><ManageUsers /></AdminLayout>
    },
    {
        path: '/manage-order',
        element: <AdminLayout><ManageOrders /></AdminLayout>
    },
];
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Product from "./pages/Product";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import Dashboard from './pages/Dashboard';
import ManageProducts from './pages/ManageProducts';
import ManageUsers from "./pages/ManageUsers";
import ManageOrders from './pages/ManageOrders';

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
        path: '/user/:id',
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
        element: <MainLayout><Dashboard /></MainLayout>
    },
    {
        path: '/manage-product',
        element: <MainLayout><ManageProducts /></MainLayout>
    },
    {
        path: '/manage-user',
        element: <MainLayout><ManageUsers /></MainLayout>
    },
    {
        path: '/manage-order',
        element: <MainLayout><ManageOrders /></MainLayout>
    },
];
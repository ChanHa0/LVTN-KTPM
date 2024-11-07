import Home from "../pages/user/Home";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Profile from "../pages/user/Profile";
import Product from "../pages/user/ProductDetail";
import ProductDetail from "../pages/user/Product";
import Search from "../pages/user/Search";
import Order from "../pages/user/Order";
import OrderDetail from "../pages/user/OrderDetail";
import Payment from "../pages/user/Payment";
import NotFound from "../pages/user/NotFound";
import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";

export const userRoutes = [
    {
        path: '/',
        element: <UserLayout><Home /></UserLayout>
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
        element: <UserLayout><Profile /></UserLayout>
    },
    {
        path: '/product',
        element: <UserLayout><Product /></UserLayout>
    },
    {
        path: '/product-detail',
        element: <UserLayout><ProductDetail /></UserLayout>
    },
    {
        path: '/search',
        element: <UserLayout><Search /></UserLayout>
    },
    {
        path: '/order',
        element: <UserLayout><Order /></UserLayout>
    },
    {
        path: '/order-detail',
        element: <UserLayout><OrderDetail /></UserLayout>
    },
    {
        path: '/payment',
        element: <UserLayout><Payment /></UserLayout>
    },
    {
        path: '*',
        element: <NotFound />
    },
];
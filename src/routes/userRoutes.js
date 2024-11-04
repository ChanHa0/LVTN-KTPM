import Home from "../pages/user/Home";
import ProductDetail from "../pages/user/ProductDetail";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import UserProfile from "../pages/user/UserProfile";
import ShoppingCart from "../pages/user/ShoppingCart";
import Checkout from "../pages/user/Checkout";
import UserLayout from "../layouts/UserLayout";
import AuthLayout from "../layouts/AuthLayout";
import NotFound from "../pages/user/NotFound";

export const userRoutes = [
    {
        path: '/',
        element: <UserLayout><Home /></UserLayout>
    },
    {
        path: '/san-pham-chi-tiet',
        element: <UserLayout><ProductDetail /></UserLayout>
    },
    {
        path: '/dang-ky',
        element: <AuthLayout><Register /></AuthLayout>
    },
    {
        path: '/dang-nhap',
        element: <AuthLayout><Login /></AuthLayout>
    },
    {
        path: '/thong-tin-ca-nhan',
        element: <UserLayout><UserProfile /></UserLayout>
    },
    {
        path: '/gio-hang',
        element: <UserLayout><ShoppingCart /></UserLayout>
    },
    {
        path: '/thanh-toan',
        element: <UserLayout><Checkout /></UserLayout>
    },
    {
        path: '*',
        element: <NotFound />
    }

];
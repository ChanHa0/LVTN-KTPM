import HomePage from "../pages/customer/HomePage/HomePage";
import ProductPage from "../pages/customer/ProductPage/ProductPage";
import SignUpPage from "../pages/customer/SignUpPage/SignUpPage";
import SignInPage from "../pages/customer/SignInPage/SignInPage";
import ProfilePage from "../pages/customer/ProfilePage/ProfilePage";
import CustomerLayout from "../layouts/CustomerLayout";

export const customerRoutes = [
    {
        path: '/',
        element: <CustomerLayout><HomePage /></CustomerLayout>
    },
    {
        path: '/sanpham',
        element: <CustomerLayout><ProductPage /></CustomerLayout>
    },
    {
        path: '/dangky',
        element: <CustomerLayout><SignUpPage /></CustomerLayout>
    },
    {
        path: '/dangnhap',
        element: <CustomerLayout><SignInPage /></CustomerLayout>
    },
    {
        path: '/hoso',
        element: <CustomerLayout><ProfilePage /></CustomerLayout>
    }
];
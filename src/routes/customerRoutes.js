import HomePage from "../pages/user/HomePage/HomePage";
import ProductPage from "../pages/user/ProductPage/ProductPage";
import SignUpPage from "../pages/user/SignUpPage/SignUpPage";
import SignInPage from "../pages/user/SignInPage/SignInPage";
import ProfilePage from "../pages/user/ProfilePage/ProfilePage";
import CartPage from "../pages/user/CartPage/CartPage";
import CheckoutPage from "../pages/user/CheckoutPage/CheckoutPage";
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
    },
    {
        path: '/giohang',
        element: <CustomerLayout><CartPage /></CustomerLayout>
    },
    {
        path: '/thanhtoan',
        element: <CustomerLayout><CheckoutPage /></CustomerLayout>
    }

];
import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage"

export const routes = [
    {
        path: '/',
        page: HomePage
    },
    {
        path: '/sanpham',
        page: ProductPage
    },
    {
        path: '/dangky',
        page: SignUpPage
    },
    {
        path: '/dangnhap',
        page: SignInPage
    },
    {
        path: '/hoso',
        page: ProfilePage
    }

]

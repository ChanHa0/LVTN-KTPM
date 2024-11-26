import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Để lấy ID sản phẩm từ URL
import { FaShoppingCart } from 'react-icons/fa';
import productApi from '../api/productApi'; // Import API sản phẩm

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null); // Dữ liệu sản phẩm
    const [cartCount, setCartCount] = useState(0); // Số lượng sản phẩm trong giỏ

    // Lấy dữ liệu sản phẩm từ API
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const data = await productApi.getProductDetail(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetail();

        // Lấy số lượng giỏ hàng từ localStorage khi component mount
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.length);
    }, [id]);

    const handleAddToCart = () => {
        // Lấy giỏ hàng từ localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Kiểm tra sản phẩm đã có trong giỏ chưa
        const productExists = cart.find(item => item.id === product.id);

        if (productExists) {
            // Nếu sản phẩm đã có trong giỏ, tăng số lượng lên
            productExists.quantity += 1;
        } else {
            // Nếu sản phẩm chưa có trong giỏ, thêm mới
            cart.push({
                id: product.id,
                title: product.prTitle,
                price: product.prPrice,
                image: product.prImage,
                quantity: 1
            });
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật số lượng giỏ hàng
        setCartCount(cart.length); // Cập nhật lại số lượng giỏ hàng
    };

    if (!product) return <div>Loading...</div>; // Nếu dữ liệu chưa có, hiển thị loading

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Chi tiết sản phẩm</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                    <img
                        src={product.prImage}
                        alt={product.prTitle}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                <div className="lg:w-1/2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thông tin sản phẩm</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Tên sách:</span>
                                    <span className="font-medium">{product.prTitle}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Tác giả:</span>
                                    <span className="font-medium">{product.prAuthor}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Giá:</span>
                                    <span className="font-medium text-blue-600">{product.prPrice.toLocaleString()}đ</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <span className="text-gray-600">Mô tả:</span>
                                <p className="mt-2 text-gray-700">
                                    {product.prDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaShoppingCart className="w-5 h-5" />
                            <span>Thêm vào giỏ hàng</span>
                        </button>

                        <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-lg">
                <span>Số sản phẩm trong giỏ hàng: {cartCount}</span>
            </div>
        </div>
    );
};

export default ProductDetail;

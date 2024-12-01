import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import productApi from '../api/productApi';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await productApi.getDetailProduct(id);
                if (response.status === 'OK') {
                    setProduct(response.data);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetail();

        const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }, [id, userId]);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        const productExists = cart.find(item => item.id === product.id);

        if (productExists) {
            productExists.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.prTitle,
                price: product.prPrice,
                image: product.prImage,
                quantity: quantity
            });
        }

        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    if (!product) return <div>Loading...</div>;

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
                                    <span className="font-medium text-blue-600">
                                        {product && product.prPrice ? Number(product.prPrice).toLocaleString() : 'N/A'}đ
                                    </span>
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
                    <div className="mt-4 text-lg">
                        <span>Số sản phẩm trong giỏ hàng: {cartCount}</span>
                    </div>

                    <div className="flex gap-4 items-center">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-16 p-2 border rounded"
                        />
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaShoppingCart className="w-5 h-5" />
                            <span>Thêm vào giỏ hàng</span>
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import productApi from '../api/productApi';
import cartApi from '../api/cartApi';
import SuggestedProducts from '../components/SuggestedProduct';
import ProductReview from '../components/ProductReview';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await productApi.getDetailProduct(id);
                if (response.status === 'OK') {
                    setProduct(response.data);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
                toast.error("Không thể tải thông tin sản phẩm");
            }
        };

        const fetchCart = async () => {
            if (user && user._id) {
                try {
                    const response = await cartApi.getCart(user._id);
                    if (response && response.cItems) {
                        const item = response.cItems.find(item => item.prId._id === id);
                        if (item) {
                            setCartQuantity(item.prQuantity);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            }
        };

        fetchProductDetail();
        fetchCart();
    }, [id, user]);

    const handleAddToCart = async () => {
        if (!user || !user._id) {
            toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const response = await cartApi.addToCart(user._id, [
                {
                    prId: product._id,
                    prQuantity: quantity
                }
            ]);

            if (response && response.status === 'OK') {
                toast.success('Đã thêm sản phẩm vào giỏ hàng');
                setCartQuantity(prev => prev + quantity);
            } else {
                toast.error(response?.message || 'Không thể thêm vào giỏ hàng');
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error('Không thể thêm vào giỏ hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = async () => {
        if (!user || !user._id) {
            toast.warning("Vui lòng đăng nhập để mua hàng");
            navigate('/login');
            return;
        }

        try {
            await handleAddToCart();
            navigate(`/cart`);
        } catch (error) {
            console.error("Error processing buy now:", error);
        }
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
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                            {product.prTitle}
                        </h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Tác giả:</span>
                                    <span className="font-medium">{product.prAuthor}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Giá:</span>
                                    <span className="font-medium text-blue-600">
                                        {Number(product.prPrice).toLocaleString()}đ
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
                    <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">Trong giỏ hàng:</span>
                        <span className="font-medium">{cartQuantity}</span>
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
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            <FaShoppingCart className="w-5 h-5" />
                            <span>Thêm vào giỏ hàng</span>
                        </button>

                        <button
                            onClick={handleBuyNow}
                            disabled={loading}
                            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
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
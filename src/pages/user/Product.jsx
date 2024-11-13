import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import ProductCard from '../../components/main/ProductCard';
import LoadingSpinner from '../../components/main/LoadingSpinner';
import useProduct from '../../hooks/useProduct';
import { toast } from 'react-toastify';
import axios from 'axios';
const Product = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { product, relatedProducts, loading, error } = useProduct(id);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        try {
            const response = await axios.post('/api/cart/add', {
                prId: product.prId,
                quantity: quantity
            });

            if (response.data.status === 'OK') {
                toast.success('Thêm vào giỏ hàng thành công');
                addToCart({
                    id: product.prId,
                    title: product.prTitle,
                    price: product.prPrice,
                    image: product.prImage,
                    author: product.prAuthor,
                    quantity: quantity
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Có lỗi xảy ra: {error}</div>;
    if (!product) return <div>Không tìm thấy sản phẩm</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-6">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <span className="mx-2">/</span>
                    <Link to={`/danh-muc/${product.prCategory}`} className="hover:text-blue-600">
                        {product.prCategory}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{product.prTitle}</span>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Ảnh sản phẩm */}
                        <div className="relative">
                            <img
                                src={product.prImage}
                                alt={product.prTitle}
                                className="w-full h-[500px] object-cover rounded-lg"
                            />
                            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100">
                                <FaHeart className="w-5 h-5 text-red-500" />
                            </button>
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="space-y-6">
                            <h1 className="text-2xl font-semibold">{product.prTitle}</h1>
                            <div className="space-y-4 text-gray-600">
                                <p><span className="font-medium">Tác giả:</span> {product.prAuthor}</p>
                                <p><span className="font-medium">Thể loại:</span> {product.prCategory}</p>
                                <p>
                                    <span className="font-medium">Tình trạng:</span>{' '}
                                    {product.prStockquanlity > 0 ? (
                                        <span className="text-green-600">Còn hàng ({product.prStockquanlity})</span>
                                    ) : (
                                        <span className="text-red-600">Hết hàng</span>
                                    )}
                                </p>
                            </div>

                            <div className="text-3xl font-bold text-blue-600">
                                {formatPrice(product.prPrice)}
                            </div>

                            {product.prStockquanlity > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span>Số lượng:</span>
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-3 py-1 hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1 border-x">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.prStockquanlity, quantity + 1))}
                                                className="px-3 py-1 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
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

                                        <Link
                                            to="/thanh-toan"
                                            className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-center"
                                        >
                                            Mua ngay
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mô tả sản phẩm */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Mô tả sản phẩm</h2>
                    <div className="prose max-w-none">
                        {product.prDescription}
                    </div>
                </div>

                {/* Sản phẩm liên quan */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Sản phẩm liên quan</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {relatedProducts.map(product => (
                                <ProductCard
                                    key={product.prId}
                                    prId={product.prId}
                                    prTitle={product.prTitle}
                                    prPrice={product.prPrice}
                                    prImage={product.prImage}
                                    prAuthor={product.prAuthor}
                                    prStockquanlity={product.prStockquanlity}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
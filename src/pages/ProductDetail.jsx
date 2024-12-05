import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { fetchProductDetail } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductReview from '../components/ProductReview';
import productApi from '../api/productApi';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { product, status, error } = useSelector((state) => state.product);
    const { items } = useSelector((state) => state.cart);
    const [quantity, setQuantity] = React.useState(1);
    const user = JSON.parse(localStorage.getItem('user'));
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        console.log('Product ID from URL:', id);

        if (!id || id.length !== 24) {
            console.error('Invalid product ID format');
            toast.error('ID sản phẩm không hợp lệ');
            navigate('/');
            return;
        }

        dispatch(fetchProductDetail(id));
    }, [id, dispatch, navigate]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!id || id.length !== 24) {
                    console.error('Invalid product ID format');
                    return;
                }

                const response = await productApi.getProductReviews(id);
                if (response.status === 'OK') {
                    setReviews(response.data);
                } else {
                    console.error('Error fetching reviews:', response.message);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (id) {
            fetchReviews();
        }
    }, [id]);

    const handleAddToCart = async () => {
        if (!user || !user._id) {
            toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
            navigate('/login');
            return;
        }

        try {
            await dispatch(addToCart({ uId: user._id, product: { prId: product._id, prQuantity: quantity } }));
            toast.success('Đã thêm sản phẩm vào giỏ hàng');
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error('Không thể thêm vào giỏ hàng');
        }
    };

    const handleBuyNow = async () => {
        if (!user || !user._id) {
            toast.warning("Vui lòng đăng nhập để mua ngay");
            navigate('/login');
            return;
        }

        try {
            navigate('/cart');
        } catch (error) {
            console.error("Error buying now:", error);
            toast.error('Không thể mua ngay');
        }
    };

    const handleReviewSubmit = async (newReview) => {
        try {
            if (!id || id.length !== 24) {
                toast.error('ID sản phẩm không hợp lệ');
                return;
            }

            setReviews(prevReviews => [...prevReviews, newReview]);
            toast.success('Đánh giá của bạn đã được ghi nhận');
        } catch (error) {
            console.error('Error handling review submit:', error);
            toast.error('Có lỗi xảy ra khi gửi đánh giá');
        }
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Chi tiết sản phẩm</h2>
            {product && (
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
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Thể loại:</span>
                                        <span className="font-medium">{product.prCategory}</span>
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
                            <span className="font-medium">
                                {items.find(item => item.prId === product._id)?.prQuantity || 0}
                            </span>
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
                                disabled={status === 'loading'}
                                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                <FaShoppingCart className="w-5 h-5" />
                                <span>Thêm vào gi hàng</span>
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={status === 'loading'}
                                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                <span>Mua ngay</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-8 w-full">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>
                    <div className="space-y-4 mb-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border-b pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{review.uId.uName}</span>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < review.prRating ? 'text-yellow-400' : 'text-gray-300'}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-gray-600 text-sm">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{review.prComment}</p>
                            </div>
                        ))}
                        {reviews.length === 0 && (
                            <p className="text-gray-500 text-center">Chưa có đánh giá nào</p>
                        )}
                    </div>
                    {user ? (
                        <ProductReview
                            prId={id}
                            onSubmit={handleReviewSubmit}
                        />
                    ) : (
                        <p className="text-center text-gray-600">
                            Vui lòng <button
                                onClick={() => navigate('/login')}
                                className="text-blue-600 hover:underline"
                            >
                                đăng nhập
                            </button> để đánh giá sản phẩm
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
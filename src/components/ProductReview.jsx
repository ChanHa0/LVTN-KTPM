import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import productApi from '../api/productApi';

const ProductReview = ({ prId, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating) {
            toast.error('Vui lòng chọn số sao đánh giá');
            return;
        }
        if (!comment.trim()) {
            toast.error('Vui lòng nhập nội dung đánh giá');
            return;
        }
        if (!prId) {
            toast.error('ID sản phẩm không hợp lệ');
            return;
        }
        if (!user?._id) {
            toast.error('Vui lòng đăng nhập để đánh giá');
            return;
        }

        try {
            console.log('Submitting review with ID:', prId);

            const reviewData = {
                uId: user._id,
                prRating: rating,
                prComment: comment.trim()
            };

            console.log('Review data:', reviewData);

            const response = await productApi.createProductReview(prId, reviewData);

            if (response.status === 'OK') {
                toast.success('Đánh giá thành công');
                onSubmit(response.data);
                setRating(0);
                setComment('');
            } else {
                toast.error(response.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-4">Đánh giá sản phẩm</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex mb-4">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    className="hidden"
                                />
                                <FaStar
                                    className={`cursor-pointer ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                                    size={30}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            </label>
                        );
                    })}
                </div>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Viết đánh giá của bạn..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Gửi đánh giá
                </button>
            </form>
        </div>
    );
};

export default ProductReview;
// import React, { useState } from 'react';
// import { FaStar } from 'react-icons/fa';

// const ProductReview = ({ prId, onSubmit }) => {
//     const [rating, setRating] = useState(0);
//     const [hover, setHover] = useState(0);
//     const [comment, setComment] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await productApi.createProductReview(prId, { prRating: rating, prComment: comment });
//             onSubmit({ rating, comment });
//             setRating(0);
//             setComment('');
//         } catch (error) {
//             console.error('Error submitting review:', error);
//         }
//     };

//     return (
//         <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="font-medium mb-4">Đánh giá sản phẩm</h3>
//             <form onSubmit={handleSubmit}>
//                 <div className="flex mb-4">
//                     {[...Array(5)].map((star, index) => {
//                         const ratingValue = index + 1;
//                         return (
//                             <label key={index}>
//                                 <input
//                                     type="radio"
//                                     name="rating"
//                                     value={ratingValue}
//                                     onClick={() => setRating(ratingValue)}
//                                     className="hidden"
//                                 />
//                                 <FaStar
//                                     className={`cursor-pointer ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
//                                     size={30}
//                                     onMouseEnter={() => setHover(ratingValue)}
//                                     onMouseLeave={() => setHover(0)}
//                                 />
//                             </label>
//                         );
//                     })}
//                 </div>
//                 <textarea
//                     className="w-full p-2 border rounded mb-4"
//                     placeholder="Viết đánh giá của bạn..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                 />
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//                 >
//                     Gửi đánh giá
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ProductReview;
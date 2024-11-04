import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ title, price, image, originalPrice, rating, soldCount }) => {
    const discount = originalPrice ? Math.round((originalPrice - price) / originalPrice * 100) : 0;

    return (
        <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="relative">
                <a href="/san-pham-chi-tiet" className="block">
                    <div className="relative overflow-hidden aspect-[3/4]">
                        <img
                            alt={title}
                            src={image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {discount > 0 && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-medium px-2 py-1 rounded">
                                -{discount}%
                            </div>
                        )}
                    </div>
                </a>

                <div className="p-4">
                    <a href="/sanpham">
                        <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
                            {title}
                        </h3>
                    </a>

                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <span>{rating || 4.5}</span>
                        <FaStar className="text-yellow-400" />
                        <span className="ml-1 text-gray-500">| Đã bán {soldCount || '1000+'}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-red-600">
                            {price.toLocaleString()}đ
                        </span>
                        {originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {originalPrice.toLocaleString()}đ
                            </span>
                        )}
                    </div>

                    <button
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200"
                        onClick={(e) => {
                            e.preventDefault();
                            // Thêm logic xử lý thêm vào giỏ hàng
                        }}
                    >
                        <FaShoppingCart size={16} />
                        <span>Thêm vào giỏ hàng</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
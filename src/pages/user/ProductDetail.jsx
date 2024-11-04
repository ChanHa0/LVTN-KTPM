import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const ProductPage = ({ updateCartCount }) => {
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(prevCount => prevCount + 1);
        updateCartCount(cartCount + 1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Chi tiết sản phẩm</h2>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                    <img
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        alt="Product"
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
                                    <span className="font-medium">Tên sách mẫu</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Tác giả:</span>
                                    <span className="font-medium">Tác giả mẫu</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-gray-600">Giá:</span>
                                    <span className="font-medium text-blue-600">100.000đ</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <span className="text-gray-600">Mô tả:</span>
                                <p className="mt-2 text-gray-700">
                                    Đây là mô tả chi tiết về cuốn sách. Nó có thể bao gồm nhiều thông tin như nội dung, đánh giá, và các chi tiết khác.
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
        </div>
    );
}

export default ProductPage;
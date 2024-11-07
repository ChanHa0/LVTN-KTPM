// import React from 'react';
// import { FaStar, FaShoppingCart } from 'react-icons/fa';

// const ProductCard = ({ id, title, price, image, author, publisher }) => {
//     return (
//         <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
//             <div className="relative">
//                 <a href={`/san-pham-chi-tiet/${id}`} className="block">
//                     <div className="relative overflow-hidden aspect-[3/4]">
//                         <img
//                             alt={title}
//                             src={image}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                     </div>
//                 </a>

//                 <div className="p-4">
//                     <h3 className="text-base font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
//                         {title}
//                     </h3>

//                     <div className="text-sm text-gray-600 mb-2">
//                         <p>Tác giả: {author}</p>
//                         <p>NXB: {publisher}</p>
//                     </div>

//                     <div className="text-lg font-bold text-red-600 mb-3">
//                         {price.toLocaleString()}đ
//                     </div>

//                     <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
//                         Thêm vào giỏ hàng
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;


import React from 'react';
const ProductCard = ({
    id,
    title,
    price,
    image,
    author,
    publisher,
    yearOfPublication,
    stockQuantity
}) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <a href={`/product/${id}`} className="group">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
                    <img
                        src={image}
                        alt={title}
                        className="h-48 w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 truncate">
                        {author}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {publisher}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                        {formatPrice(price)}
                    </p>
                    {stockQuantity > 0 ? (
                        <p className="mt-1 text-sm text-green-600">
                            Còn {stockQuantity} sản phẩm
                        </p>
                    ) : (
                        <p className="mt-1 text-sm text-red-600">
                            Hết hàng
                        </p>
                    )}
                </div>
            </div>
        </a>
    );
};

export default ProductCard;
import React from 'react';
const ProductCard = ({
    id,
    title,
    price,
    image,
    author,
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
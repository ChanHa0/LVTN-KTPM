import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({
    prId,
    prTitle,
    prAuthor,
    prImage,
    prPrice,
    prStockquanlity
}) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Link to={`/product/${prId}`} className="block group">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
                    <img
                        src={prImage}
                        alt={prTitle}
                        className="h-48 w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-75"
                        loading="lazy"
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {prTitle}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                        {prAuthor}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                        {formatPrice(prPrice)}
                    </p>
                    {prStockquanlity > 0 ? (
                        <p className="text-sm text-green-600">
                            Còn {prStockquanlity} sản phẩm
                        </p>
                    ) : (
                        <p className="text-sm text-red-600">
                            Hết hàng
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    prId: PropTypes.number.isRequired,
    prTitle: PropTypes.string.isRequired,
    prAuthor: PropTypes.string,
    prImage: PropTypes.string,
    prPrice: PropTypes.number.isRequired,
    prStockquanlity: PropTypes.number.isRequired
};

export default ProductCard;
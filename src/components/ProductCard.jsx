import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ prId, prTitle, prAuthor, prImage, prPrice, prStockQuantity }) => {
    const formatPrice = (price) => {
        const numberPrice = Number(price);
        if (!isNaN(numberPrice)) {
            return numberPrice.toLocaleString() + 'đ';
        } else {
            return 'N/A';
        }
    };

    return (
        <Link
            to={`/product/${prId}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
            <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                <img
                    src={prImage || '/placeholder-image.png'}
                    alt={prTitle}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800">{prTitle}</h3>
                <p className="text-xs text-gray-500 mt-1">{prAuthor}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(prPrice)}</p>
                <p className="text-xs text-gray-500 mt-1">Số lượng: {prStockQuantity}</p>
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    prId: PropTypes.string.isRequired,
    prTitle: PropTypes.string.isRequired,
    prAuthor: PropTypes.string,
    prImage: PropTypes.string,
    prPrice: PropTypes.string.isRequired,
    prStockQuantity: PropTypes.string.isRequired,
};

export default ProductCard;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({ prId, prTitle, prAuthor, prImage, prPrice }) => {
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
            to={`/productdetail/${prId}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
            <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                <img
                    src={prImage || '/placeholder-image.png'}
                    alt={prTitle}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 whitespace-nowrap overflow-hidden overflow-ellipsis" style={{ lineHeight: '1.5' }}>
                    {prTitle}
                </h3>
                <p className="text-sm text-gray-500 mt-1" style={{ lineHeight: '1.5' }}>{prAuthor}</p>
                <p className="text-lg font-bold text-blue-600 mt-2" style={{ lineHeight: '1.5' }}>{formatPrice(prPrice)}</p>
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
};

export default ProductCard;

import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const SuggestedProducts = ({ products }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sản phẩm gợi ý</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.prId}
                        prId={product.prId}
                        prTitle={product.prTitle}
                        prAuthor={product.prAuthor}
                        prImage={product.prImage}
                        prPrice={product.prPrice}
                    />
                ))}
            </div>
        </div>
    );
};

SuggestedProducts.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            prId: PropTypes.string.isRequired,
            prTitle: PropTypes.string.isRequired,
            prAuthor: PropTypes.string,
            prImage: PropTypes.string,
            prPrice: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SuggestedProducts;
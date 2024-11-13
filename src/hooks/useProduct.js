import { useState, useEffect } from 'react';
import axios from 'axios';

const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                // Gọi API lấy chi tiết sản phẩm
                const { data: productResponse } = await axios.get(`/api/product/${productId}`);

                if (productResponse.status === 'OK') {
                    setProduct(productResponse.data);

                    // Gọi API lấy sản phẩm liên quan
                    const { data: relatedResponse } = await axios.get('/api/product/search', {
                        params: {
                            category: productResponse.data.prCategory,
                            limit: 5
                        }
                    });

                    if (relatedResponse.status === 'OK') {
                        const filteredProducts = relatedResponse.data.products.filter(
                            p => p.prId !== parseInt(productId)
                        );
                        setRelatedProducts(filteredProducts);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductData();
        }
    }, [productId]);

    return { product, relatedProducts, loading, error };
};

export default useProduct;
import { useState, useEffect } from 'react';
import productApi from '../api/productApi';

const useProduct = (productId) => {
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await productApi.getProductById(productId);
                if (response.status === 'OK') {
                    setProduct(response.data);
                    fetchRelatedProducts(response.data.prCategory);
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const fetchRelatedProducts = async (category) => {
        try {
            const response = await productApi.getRelatedProducts(category);
            if (response.status === 'OK') {
                setRelatedProducts(response.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm liên quan:', error);
        }
    };

    return { product, relatedProducts, loading };
};

export default useProduct;
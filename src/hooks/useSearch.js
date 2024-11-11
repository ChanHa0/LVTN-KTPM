import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const useSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        category: searchParams.get('category') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        sort: searchParams.get('sort') || 'newest'
    });

    const searchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/product/search', { params: filters });
            if (response.data.status === 'OK') {
                setProducts(response.data.data.products);
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchProducts();
    }, [searchParams]);

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        setSearchParams(newFilters);
    };

    return { products, loading, filters, updateFilters };
};

export default useSearch;
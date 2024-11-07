import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/common/ProductCard';

const Search = () => {
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

    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/product/search', {
                params: {
                    keyword: filters.keyword,
                    category: filters.category,
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    sort: filters.sort
                }
            });

            if (response.data.status === 'OK') {
                setProducts(response.data.data.products);
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const applyFilters = () => {
        setSearchParams(filters);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Thanh tìm kiếm */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input
                        type="text"
                        name="keyword"
                        value={filters.keyword}
                        onChange={handleFilterChange}
                        placeholder="Tìm kiếm sách..."
                        className="border rounded-lg px-4 py-2"
                    />

                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="">Tất cả danh mục</option>
                        <option value="fiction">Tiểu thuyết</option>
                        <option value="nonfiction">Phi hư cấu</option>
                        <option value="children">Thiếu nhi</option>
                    </select>

                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Giá tối thiểu"
                        className="border rounded-lg px-4 py-2"
                    />

                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Giá tối đa"
                        className="border rounded-lg px-4 py-2"
                    />

                    <select
                        name="sort"
                        value={filters.sort}
                        onChange={handleFilterChange}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="price_asc">Giá tăng dần</option>
                        <option value="price_desc">Giá giảm dần</option>
                    </select>
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={applyFilters}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Áp dụng bộ lọc
                    </button>
                </div>
            </div>

            {/* Kết quả tìm kiếm */}
            {loading ? (
                <div className="text-center py-8">Đang tải...</div>
            ) : (
                <>
                    <h2 className="text-xl font-semibold mb-4">
                        Kết quả tìm kiếm ({products.length})
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map(product => (
                            <ProductCard key={product.prId} product={product} />
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Không tìm thấy sản phẩm nào
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Search;
import React from 'react';
import ProductCard from '../../components/main/ProductCard';
import LoadingSpinner from '../../components/main/LoadingSpinner';
import useSearch from '../../hooks/useSearch';

const Search = () => {
    const { products, loading, filters, updateFilters } = useSearch();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        updateFilters({ ...filters, [name]: value });
    };

    const renderFilters = () => (
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
    );

    const renderSearchResults = () => {
        if (loading) return <LoadingSpinner />;

        return (
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
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                {renderFilters()}
            </div>
            {renderSearchResults()}
        </div>
    );
};

export default Search;
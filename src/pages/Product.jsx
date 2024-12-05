import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import productApi from '../api/productApi';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productApi.getAllProducts();
                const data = Array.isArray(response.data) ? response.data : [];
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                setError(error.message || 'Lỗi không xác định');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        setSearchTerm(keyword);

        const filtered = products.filter(
            (product) =>
                product.prTitle.toLowerCase().includes(keyword) ||
                product.prAuthor?.toLowerCase().includes(keyword)
        );
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);

        const filtered = products.filter((product) => {
            const matchesSearchTerm =
                product.prTitle.toLowerCase().includes(searchTerm) ||
                product.prAuthor?.toLowerCase().includes(searchTerm);
            const matchesCategory = category === '' || product.prCategory === category;
            return matchesSearchTerm && matchesCategory;
        });

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500">Có lỗi xảy ra: {error}</div>;

    return (
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto max-w-screen-xl px-4">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Danh sách sản phẩm</h1>
                    <p className="text-gray-600 mt-2">
                        Tìm kiếm sản phẩm yêu thích của bạn từ danh sách phong phú của chúng tôi.
                    </p>
                </div>

                <div className="mb-8 flex space-x-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Tất cả loại</option>
                        <option value="Sách văn học">Sách văn học</option>
                        <option value="Sách khoa học">Sách khoa học</option>
                        <option value="Sách kinh tế">Sách kinh tế</option>
                        <option value="Tiểu thuyết">Tiểu thuyết</option>
                        <option value="Truyện tranh">Truyện tranh</option>
                        <option value="Sách ngoại ngữ">Sách ngoại ngữ</option>
                        <option value="Sách thiếu nhi">Sách thiếu nhi</option>
                    </select>
                </div>

                {currentProducts.length === 0 ? (
                    <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
                        Không có sản phẩm nào phù hợp.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {currentProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                prId={product._id}
                                prTitle={product.prTitle}
                                prPrice={product.prPrice}
                                prImage={product.prImage}
                                prAuthor={product.prAuthor}
                                prStockQuantity={product.prStockQuantity}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center items-center space-x-2">
                    {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                        <button
                            key={index} YY
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 border rounded-lg ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;

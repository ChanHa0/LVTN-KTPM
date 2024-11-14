import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/main/Sidebar';
import HomeCarousel from '../../components/main/HomeCarousel';
import ProductCard from '../../components/main/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product/all');

                if (response.data && typeof response.data === 'object') {
                    const productsData = Array.isArray(response.data)
                        ? response.data
                        : Object.values(response.data);

                    const products = productsData.map(product => ({
                        id: product.prId,
                        title: product.prTitle || 'Chưa cập nhật',
                        price: product.prPrice || 0,
                        image: product.image || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
                        author: product.prAuthor || 'Chưa cập nhật',
                        publisher: product.prPublisher || 'Chưa cập nhật',
                        yearOfPublication: product.prYearofpublication,
                        stockQuantity: product.prStockquanlity || 0
                    }));
                    setBooks(products);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sách:', error);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <div className="w-1/4">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="w-3/4">
                        {/* Banner */}
                        <div className="mb-8">
                            <HomeCarousel />
                        </div>

                        {/* Tất cả sách */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Tất cả sách</h2>
                                <button
                                    onClick={() => navigate('/search')}
                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Tìm kiếm nâng cao
                                </button>
                            </div>

                            {loading ? (
                                <div className="text-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                    <p className="mt-2">Đang tải...</p>
                                </div>
                            ) : books.length === 0 ? (
                                <div className="text-center py-4 text-gray-500">
                                    Không có sách nào
                                </div>
                            ) : (
                                <div className="grid grid-cols-5 gap-4">
                                    {books.map((book, index) => (
                                        <div
                                            key={`${book.id}-${index}`}
                                            onClick={() => navigate(`/product-detail/${book.id}`)}
                                            className="cursor-pointer"
                                        >
                                            <ProductCard prId={book.id} prTitle={book.title} prImage={book.image} prAuthor={book.author} prPrice={book.price} prStockquanlity={book.stockQuantity} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Xem thêm */}
                        {books.length > 0 && (
                            <div className="text-center space-x-4">
                                <button
                                    onClick={() => navigate('/product')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors inline-block"
                                >
                                    Xem thêm sách
                                </button>
                                <button
                                    onClick={() => navigate('/order')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors inline-block"
                                >
                                    Đơn hàng của tôi
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
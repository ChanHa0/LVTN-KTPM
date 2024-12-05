import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productApi from '../api/productApi';
import bookBackground from '../assets/images/book-background.jpg';
import ProductCard from '../components/ProductCard';
import MoreInfor from '../components/MoreInfor';

const Home = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await productApi.getAllProducts();
                if (response.data) {
                    const products = response.data.slice(0, 4).map((book) => ({
                        prId: book._id,
                        prTitle: book.prTitle || 'Sách chưa có tiêu đề',
                        prPrice: book.prPrice || 0,
                        prImage: book.prImage || 'https://via.placeholder.com/200x300',
                        prAuthor: book.prAuthor || 'Chưa có tác giả',
                        prStockQuantity: book.prStockQuantity || 0,
                    }));
                    setBooks(products);
                }
            } catch (error) {
                console.error('Không thể tải danh sách sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="bg-white text-black min-h-screen bg-cover bg-fixed" style={{ backgroundImage: `url(${bookBackground})` }}>
            <section className="text-white py-16 px-8">
                <div className="max-w-7xl mx-auto text-center bg-blue-500 bg-opacity-80 p-8 rounded-lg shadow-lg">
                    <h1 className="text-5xl font-bold">Chào Mừng Bạn Đến Với Cửa Hàng Sách</h1>
                    <p className="mt-4 text-lg">
                        Tìm kiếm những cuốn sách bạn yêu thích và khám phá thêm nhiều tác phẩm mới.
                    </p>
                    <button
                        onClick={() => navigate('/product')}
                        className="mt-6 bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
                    >
                        Khám phá ngay
                    </button>
                </div>
            </section>

            <section className="container mx-auto px-4 py-12">
                <header className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-black">Sách Nổi Bật</h2>
                    <p className="text-gray-600 mt-2">
                        Khám phá những cuốn sách đang được yêu thích nhất!
                    </p>
                </header>
                {loading ? (
                    <div className="text-center">Đang tải...</div>
                ) : books.length === 0 ? (
                    <div className="text-center text-gray-500">Không có sách</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
                        {books.map((book) => (
                            <ProductCard
                                key={book.prId}
                                prId={book.prId}
                                prTitle={book.prTitle}
                                prAuthor={book.prAuthor}
                                prImage={book.prImage}
                                prPrice={book.prPrice.toString()}
                                prStockQuantity={book.prStockQuantity.toString()}
                            />
                        ))}
                    </div>
                )}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/product')}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                    >
                        Khám phá thêm
                    </button>
                </div>
            </section>

            <MoreInfor />
        </div>
    );
};

export default Home;
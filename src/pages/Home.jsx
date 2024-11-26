import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import bookBackground from '../assets/images/book-background.jpg';
import ProductCard from '../components/main/ProductCard';

const Home = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product/all');
                if (response.data) {
                    const products = response.data.slice(0, 6).map((book) => ({
                        prId: book.prId,
                        prTitle: book.prTitle || 'Sách chưa có tiêu đề',
                        prPrice: book.prPrice || 0,
                        prImage: book.image || 'https://via.placeholder.com/200x300',
                        prAuthor: book.prAuthor || 'Chưa có tác giả',
                        prStockQuantity: book.prStockquantity || 0,
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

    const handleAddToCart = (book) => {
        addToCart({
            id: book.prId,
            title: book.prTitle,
            price: book.prPrice,
            image: book.prImage,
            quantity: 1,
        });
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    return (
        <div className="bg-white text-black min-h-screen bg-cover bg-fixed" style={{ backgroundImage: `url(${bookBackground})` }}>
            {showNotification && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md z-50">
                    Sản phẩm đã được thêm vào giỏ hàng!
                </div>
            )}

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book) => (
                            <ProductCard
                                key={book.prId}
                                prId={book.prId}
                                prTitle={book.prTitle}
                                prAuthor={book.prAuthor}
                                prImage={book.prImage}
                                prPrice={book.prPrice}
                                prStockQuantity={book.prStockQuantity}
                                onAddToCart={() => handleAddToCart(book)}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className="more mx-5 py-12">
                <div className="flex justify-center space-x-8">
                    <div className="more-item rounded bg-blue-50 p-6 text-center w-60 shadow-md hover:shadow-lg transition-shadow">
                        <img src="/icon/box.svg" alt="freeship" className="mx-auto mb-4" />
                        <p>
                            <span className="fw-bold fs-5">Free Shipping</span> <br />
                            Free shipping on order over €50
                        </p>
                    </div>
                    <div className="more-item rounded bg-blue-50 p-6 text-center w-60 shadow-md hover:shadow-lg transition-shadow">
                        <img src="/icon/moneyback.svg" alt="peaceofmind" className="mx-auto mb-4" />
                        <p>
                            <span className="fw-bold fs-5">Peace of Mind</span> <br />
                            30 days money back guarantee
                        </p>
                    </div>
                    <div className="more-item rounded bg-blue-50 p-6 text-center w-60 shadow-md hover:shadow-lg transition-shadow">
                        <img src="/icon/secure.svg" alt="secure" className="mx-auto mb-4" />
                        <p>
                            <span className="fw-bold fs-5">100% Payment Secure</span> <br />
                            Your payment are safe with us.
                        </p>
                    </div>
                    <div className="more-item rounded bg-blue-50 p-6 text-center w-60 shadow-md hover:shadow-lg transition-shadow">
                        <img src="/icon/support.svg" alt="support" className="mx-auto mb-4" />
                        <p>
                            <span className="fw-bold fs-5">Support 24/7</span> <br />
                            24/7 Online support
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
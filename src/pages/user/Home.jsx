import React from 'react';
import Sidebar from '../../components/common/CategorySidebar';
import HomeCarousel from '../../components/common/HomeCarousel';
import ProductCard from '../../components/common/ProductCard';

const HomePage = () => {
    const discountBooks = [...Array(5)].map((_, index) => ({
        id: index,
        title: `Sách giảm giá ${index + 1}`,
        price: 800000,
        originalPrice: 1000000,
        image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        rating: 4.5,
        soldCount: "1000+"
    }));

    const featuredBooks = [...Array(10)].map((_, index) => ({
        id: index + 5,
        title: `Sách nổi bật ${index + 1}`,
        price: 1000000,
        originalPrice: 1200000,
        image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        rating: 4.5,
        soldCount: "1000+"
    }));

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

                        {/* Sách giảm giá */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sách giảm giá</h2>
                            <div className="grid grid-cols-5 gap-4">
                                {discountBooks.map(book => (
                                    <ProductCard key={book.id} {...book} />
                                ))}
                            </div>
                        </div>

                        {/* Sách nổi bật */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sách nổi bật</h2>
                            <div className="grid grid-cols-5 gap-4">
                                {featuredBooks.slice(0, 10).map((book, index) => (
                                    index < 5 ? (
                                        <ProductCard key={book.id} {...book} />
                                    ) : null
                                ))}
                            </div>
                            <div className="grid grid-cols-5 gap-4 mt-4">
                                {featuredBooks.slice(0, 10).map((book, index) => (
                                    index >= 5 ? (
                                        <ProductCard key={book.id} {...book} />
                                    ) : null
                                ))}
                            </div>
                        </div>

                        {/* Xem thêm */}
                        <div className="text-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
                                Xem thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
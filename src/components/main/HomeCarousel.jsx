import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomeCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        {
            image: 'https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/1.png',
            title: 'Sách mới tháng này',
            description: 'Khám phá những cuốn sách mới nhất'
        },
        {
            image: 'https://marketplace.canva.com/EAF4n2WuNKc/2/0/1600w/canva-h%E1%BB%93ng-pastel-%C4%91en-n%E1%BB%95i-b%E1%BA%ADt-c%E1%BB%ADa-h%C3%A0ng-s%C3%A1ch-banner-JUT8DwjmSUI.jpg',
            title: 'Giảm giá 50%',
            description: 'Ưu đãi đặc biệt cho sách thiếu nhi'
        },
        {
            image: 'https://thietkewebchuyen.com/wp-content/uploads/thiet-ke-banner-website-anh-bia-Facebook-nha-sach-1.jpg',
            title: 'Học ngoại ngữ',
            description: 'Bộ sách học ngoại ngữ hot nhất'
        }
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, [banners.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }, [banners.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative h-[400px] overflow-hidden rounded-lg">
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
            >
                <FaChevronLeft className="text-white text-xl" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
            >
                <FaChevronRight className="text-white text-xl" />
            </button>

            {/* Slides */}
            <div className="relative h-full">
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 
                            ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                            <h2 className="text-white text-2xl font-bold mb-2">
                                {banner.title}
                            </h2>
                            <p className="text-white/90">
                                {banner.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all
                            ${index === currentSlide
                                ? 'bg-white w-4'
                                : 'bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeCarousel;
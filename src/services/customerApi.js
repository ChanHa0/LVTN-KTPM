import axiosClient from '../utils/api';

const sampleBooks = [
    {
        id: 1,
        title: 'Sách mẫu 1',
        price: 150000,
        image: 'https://via.placeholder.com/200x300?text=Book+1',
        rating: 4.5,
        soldCount: 100,
        discount: 10,
        author: 'Tác giả 1',
        publisher: 'NXB Trẻ'
    },
    {
        id: 2,
        title: 'Sách mẫu 2',
        price: 200000,
        image: 'https://via.placeholder.com/200x300?text=Book+2',
        rating: 4.8,
        soldCount: 150,
        discount: 15,
        author: 'Tác giả 2',
        publisher: 'NXB Kim Đồng'
    }
];

export const bookService = {
    getAllBooks: async () => {
        try {
            const response = await axiosClient.get('/books');
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sách:', error);
            return sampleBooks;
        }
    },
    getBooksByCategory: async (categoryId) => {
        try {
            const response = await axiosClient.get(`/books/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy sách theo danh mục:', error);
            return sampleBooks;
        }
    },
    getFeaturedBooks: async () => {
        try {
            const response = await axiosClient.get('/books/featured');
            if (response?.status === 'OK' && Array.isArray(response?.data)) {
                return response.data.map(book => ({
                    ...book,
                    PR_PRICE: Number(book.PR_PRICE) || 0
                }));
            }
            console.error('Response không hợp lệ:', response);
            return sampleBooks;
        } catch (error) {
            console.error('Lỗi khi lấy sách nổi bật:', error);
            return sampleBooks;
        }
    }
};
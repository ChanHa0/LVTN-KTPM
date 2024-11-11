import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import productApi from '../../api/productApi';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        prTitle: '',
        prAuthor: '',
        prCategory: '',
        prStockquanlity: '',
        prPrice: ''
    });
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await productApi.getAllProducts(currentPage, 10);
                if (mounted && response?.status === 'OK') {
                    if (Array.isArray(response.data.product)) {
                        setProducts(response.data.product);
                    } else {
                        console.error('Invalid response structure:', response);
                    }
                    setTotalPages(response.data.pagination.totalPages);
                }
            } catch (error) {
                if (mounted) {
                    console.error('Lỗi khi tải danh sách sản phẩm:', error);
                    setProducts([]);
                    showMessage('error', 'Không thể tải danh sách sản phẩm');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, [currentPage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            prTitle: '',
            prAuthor: '',
            prCategory: '',
            prStockquanlity: '',
            prPrice: ''
        });
        setEditingProduct(null);
    };

    const showMessage = (type, content) => {
        setMessage({ type, content });
        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            setMessage({ type: '', content: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingProduct) {
                response = await productApi.updateProduct(editingProduct.prId, formData);
            } else {
                response = await productApi.createProduct(formData);
            }

            if (response.status === 'OK') {
                showMessage('success', editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
                setShowForm(false);
                resetForm();
                fetchProducts();
            }
        } catch (error) {
            showMessage('error', error.response?.data?.message || 'Có lỗi xảy ra khi xử lý yêu cầu');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            prTitle: product.prTitle,
            prAuthor: product.prAuthor,
            prCategory: product.prCategory,
            prStockquanlity: product.prStockquanlity,
            prPrice: product.prPrice
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                const response = await productApi.deleteProduct(id);
                if (response.status === 'OK') {
                    showMessage('success', 'Xóa sản phẩm thành công!');
                    fetchProducts();
                }
            } catch (error) {
                showMessage('error', 'Có lỗi xảy ra khi xóa sản phẩm');
            }
        }
    };

    const renderPagination = () => {
        return (
            <div className="flex justify-center mt-6">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                ${currentPage === page
                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </nav>
            </div>
        );
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productApi.getAllProducts(currentPage, 10);
            console.log('API Response:', response);

            if (response?.status === 'OK' && Array.isArray(response.data.product)) {
                setProducts(response.data.product);
                setTotalPages(response.data.pagination.totalPages);
            } else {
                console.error('Invalid response structure:', response);
                setProducts([]);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách sản phẩm:', error);
            setProducts([]);
            showMessage('error', 'Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {message.content && (
                    <div className={`mb-4 p-4 rounded-md ${message.type === 'success'
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                        }`}>
                        {message.content}
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Quản lý sản phẩm</h1>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(!showForm);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                        Thêm sản phẩm
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="prTitle" className="block text-sm font-medium text-gray-700">
                                    Tên sách
                                </label>
                                <input
                                    type="text"
                                    name="prTitle"
                                    id="prTitle"
                                    value={formData.prTitle}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 [&::placeholder]:text-gray-400"
                                    placeholder="Nhập tên sản phẩm"
                                    required
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="prAuthor" className="block text-sm font-medium text-gray-700">
                                    Tác giả
                                </label>
                                <input
                                    type="text"
                                    name="prAuthor"
                                    id="prAuthor"
                                    value={formData.prAuthor}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 [&::placeholder]:text-gray-400"
                                    placeholder="Nhập tên tác giả"
                                    required
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="prCategory" className="block text-sm font-medium text-gray-700">
                                    Danh mục
                                </label>
                                <input
                                    type="text"
                                    name="prCategory"
                                    id="prCategory"
                                    value={formData.prCategory}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 [&::placeholder]:text-gray-400"
                                    placeholder="Nhập danh mục"
                                    required
                                />

                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="prStockquanlity" className="block text-sm font-medium text-gray-700">
                                    Số lượng
                                </label>
                                <input
                                    type="number"
                                    name="prStockquanlity"
                                    id="prStockquanlity"
                                    value={formData.prStockquanlity}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 [&::placeholder]:text-gray-400"
                                    placeholder="Nhập số lượng"
                                    required
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="prPrice" className="block text-sm font-medium text-gray-700">
                                    Giá
                                </label>
                                <input
                                    type="number"
                                    name="prPrice"
                                    id="prPrice"
                                    value={formData.prPrice}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 [&::placeholder]:text-gray-400"
                                    placeholder="Nhập giá"
                                    required
                                />
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    resetForm();
                                }}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                            </button>
                        </div>
                    </form>
                )}

                {loading ? (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên sách
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tác giả
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Danh mục
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Số lượng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giá
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products && products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.prId} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover"
                                                            src={product.prImage || '/placeholder.png'}
                                                            alt={product.prTitle}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.prTitle}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.prAuthor}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {product.prCategory}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.prStockquanlity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(product.prPrice)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    title="Sửa"
                                                >
                                                    <FaEdit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.prId)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Xóa"
                                                >
                                                    <FaTrash className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            Không có sản phẩm nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {renderPagination()}
            </div>
        </div>
    );
};

export default ManageProducts;
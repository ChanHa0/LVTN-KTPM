import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/main/LoadingSpinner';
import productApi from '../../api/productApi';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        prTitle: '',
        prAuthor: '',
        prCategory: '',
        prDescription: '',
        prImage: '',
        prStockQuanlity: '',
        prPrice: ''
    });

    // Danh sách các danh mục sản phẩm
    const categories = [
        'Sách văn học',
        'Sách thiếu nhi',
        'Sách kinh tế',
        'Sách kỹ năng sống',
        'Sách ngoại ngữ',
        'Sách giáo khoa'
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productApi.getAllProduct();
            if (response.status === 'OK') {
                setProducts(response.data);
            } else {
                toast.error('Lỗi khi tải danh sách sản phẩm');
            }
        } catch (error) {
            toast.error('Không thể kết nối đến server');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.prTitle.trim()) return 'Vui lòng nhập tên sản phẩm';
        if (!formData.prAuthor.trim()) return 'Vui lòng nhập tên tác giả';
        if (!formData.prCategory) return 'Vui lòng chọn danh mục';
        if (!formData.prImage.trim()) return 'Vui lòng nhập URL hình ảnh';
        if (!formData.prPrice || formData.prPrice <= 0) return 'Vui lòng nhập giá hợp lệ';
        if (!formData.prStockQuanlity || formData.prStockQuanlity < 0) return 'Vui lòng nhập số lượng hợp lệ';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast.error(error);
            return;
        }

        try {
            setLoading(true);
            const response = editingProduct
                ? await productApi.updateProduct(editingProduct.prId, formData)
                : await productApi.createProduct(formData);

            if (response.status === 'OK') {
                toast.success(editingProduct ? 'Cập nhật thành công' : 'Thêm mới thành công');
                setShowForm(false);
                resetForm();
                fetchProducts();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xử lý yêu cầu');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                setLoading(true);
                const response = await productApi.deleteProduct(productId);
                if (response.status === 'OK') {
                    toast.success('Xóa sản phẩm thành công');
                    fetchProducts();
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra khi xóa sản phẩm');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            prTitle: product.prTitle,
            prAuthor: product.prAuthor,
            prCategory: product.prCategory,
            prDescription: product.prDescription || '',
            prImage: product.prImage,
            prStockQuanlity: product.prStockQuanlity,
            prPrice: product.prPrice
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            prTitle: '',
            prAuthor: '',
            prCategory: '',
            prDescription: '',
            prImage: '',
            prStockQuanlity: '',
            prPrice: ''
        });
        setEditingProduct(null);
    };

    const filteredProducts = products.filter(product =>
        product.prTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.prAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.prCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
                    <p className="mt-2 text-sm text-gray-600">Quản lý và cập nhật thông tin sản phẩm</p>
                </div>

                {/* Search and Add */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaPlus /> Thêm sản phẩm
                    </button>
                </div>

                {/* Products List */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số lượng
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.prId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-16 w-16 flex-shrink-0">
                                                <img
                                                    className="h-16 w-16 object-cover rounded"
                                                    src={product.prImage}
                                                    alt={product.prTitle}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.prTitle}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {product.prAuthor}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            {product.prCategory}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(product.prPrice)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.prStockQuanlity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            <FaEdit className="inline-block w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.prId)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FaTrash className="inline-block w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg w-full max-w-2xl">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    {editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Tên sách</label>
                                            <input
                                                type="text"
                                                name="prTitle"
                                                value={formData.prTitle}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Tác giả</label>
                                            <input
                                                type="text"
                                                name="prAuthor"
                                                value={formData.prAuthor}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                                            <select
                                                name="prCategory"
                                                value={formData.prCategory}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            >
                                                <option value="">Chọn danh mục</option>
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">URL Hình ảnh</label>
                                            <input
                                                type="text"
                                                name="prImage"
                                                value={formData.prImage}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Giá</label>
                                            <input
                                                type="number"
                                                name="prPrice"
                                                value={formData.prPrice}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                min="0"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Số lượng</label>
                                            <input
                                                type="number"
                                                name="prStockQuanlity"
                                                value={formData.prStockQuanlity}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                min="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                                        <textarea
                                            name="prDescription"
                                            value={formData.prDescription}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                resetForm();
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang xử lý...' : (editingProduct ? 'Cập nhật' : 'Thêm mới')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;
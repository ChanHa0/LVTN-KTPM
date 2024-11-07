import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import productAPI from '../../api/productApi';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        prTitle: '',
        prAuthor: '',
        prCategory: '',
        prStockquanlity: '',
        prPrice: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productAPI.getAllProducts();
            console.log(response.data); // Kiểm tra dữ liệu thực tế
            if (response.status === 'OK' && Array.isArray(response.data.products)) {
                setProducts(response.data.products); // Đảm bảo đây là một mảng
            } else {
                setProducts([]); // Đặt thành mảng rỗng nếu không đúng định dạng
            }
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
            setProducts([]); // Đặt thành mảng rỗng khi có lỗi
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                const response = await productAPI.deleteProduct(id);
                if (response.status === 'OK') {
                    alert('Xóa sản phẩm thành công!');
                    fetchProducts();
                }
            } catch (error) {
                alert('Có lỗi xảy ra khi xóa sản phẩm');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingProduct) {
                response = await productAPI.updateProduct(editingProduct.prId, formData);
            } else {
                response = await productAPI.createProduct(formData);
            }

            if (response.status === 'OK') {
                alert(editingProduct ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
                setShowForm(false);
                resetForm();
                fetchProducts();
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Có lỗi xảy ra khi xử lý sản phẩm');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
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
                                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                                            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
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
                        </div>
                    </form>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên sách</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tác giả</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.prId}>
                                    <td className="px-6 py-4">{product.prTitle}</td>
                                    <td className="px-6 py-4">{product.prAuthor}</td>
                                    <td className="px-6 py-4">{product.prCategory}</td>
                                    <td className="px-6 py-4">{product.prStockquanlity}</td>
                                    <td className="px-6 py-4">{Number(product.prPrice).toLocaleString()}đ</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.prId)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
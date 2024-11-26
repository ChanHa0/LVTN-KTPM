import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import { FaEye, FaTrash, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/main/LoadingSpinner';
import orderApi from '../api/orderApi';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await orderApi.getAllOrders();
            if (response.status === 'OK') {
                setOrders(response.data);
            } else {
                toast.error('Lỗi khi tải danh sách đơn hàng');
            }
        } catch (error) {
            toast.error('Không thể kết nối đến server');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = (order) => {
        setSelectedOrder(order);
        setShowDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            try {
                setLoading(true);
                const response = await orderApi.deleteOrder(id);
                if (response.status === 'OK') {
                    toast.success('Xóa đơn hàng thành công');
                    fetchOrders();
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra khi xóa đơn hàng');
            } finally {
                setLoading(false);
            }
        }
    };

    const filteredOrders = orders.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.uId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="relative w-full sm:w-96">
                        <input
                            type="text"
                            placeholder="Tìm kiếm đơn hàng..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute right-3 top-3 text-gray-400" />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đặt</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                Không có đơn hàng nào
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.uId}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.oOrderdate).toLocaleDateString('vi-VN')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.oTotalamount)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                    <button onClick={() => handleViewDetail(order)} className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out" title="Xem">
                                                        <FaEye className="inline-block w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => handleDelete(order._id)} className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out" title="Xóa">
                                                        <FaTrash className="inline-block w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageOrders;
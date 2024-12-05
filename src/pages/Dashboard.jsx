import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from '../components/AdminNavbar';
import statisticApi from '../api/statisticApi';
import { setStatistics } from '../redux/slices/statisticSlice';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
    const dispatch = useDispatch();
    const stats = useSelector((state) => state.statistic.data);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const totalRevenue = await statisticApi.getTotalRevenue();
                const totalOrders = await statisticApi.getTotalOrder();
                const totalProductsSold = await statisticApi.getTotalProductSold();
                const totalInventory = await statisticApi.getProductInventory();

                dispatch(setStatistics({
                    totalRevenue: totalRevenue.data,
                    totalOrders: totalOrders.data,
                    totalProductsSold: totalProductsSold.data,
                    totalInventory: totalInventory.data
                }));
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            }
        };

        fetchStatistics();
    }, [dispatch]);

    const revenueData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [12000000, 15000000, 13000000, 17000000, 16000000, 18000000], // Thay thế bằng dữ liệu thực tế
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Thống kê</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats && (
                        <>
                            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-gray-500 text-sm mb-1">Doanh thu</h3>
                                <p className="text-2xl font-semibold text-gray-800">{stats.totalRevenue ?? 0}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-gray-500 text-sm mb-1">Đơn hàng</h3>
                                <p className="text-2xl font-semibold text-gray-800">{stats.totalOrders ?? 0}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-gray-500 text-sm mb-1">Sản phẩm đã bán</h3>
                                <p className="text-2xl font-semibold text-gray-800">{stats.totalProductsSold ?? 0}</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                                <h3 className="text-gray-500 text-sm mb-1">Tồn kho</h3>
                                <p className="text-2xl font-semibold text-gray-800">{stats.totalInventory ?? 0}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Doanh thu theo tháng
                    </h3>
                    <Line data={revenueData} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Top sách bán chạy
                    </h3>
                    {/* <TopSellingBooks /> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
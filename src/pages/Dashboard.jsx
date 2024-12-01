import React, { useState, useEffect } from 'react';
import { FaBook, FaShoppingCart, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import AdminNavbar from '../components/AdminNavbar';
import productApi from '../api/productApi';

const Dashboard = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await productApi.getStatisticsProduct();
                if (response.status === 'OK') {
                    const statistics = response.data;

                    setStats([
                        {
                            title: 'Tổng doanh thu',
                            value: `${statistics.totalRevenue}đ`,
                            icon: <FaDollarSign className="text-blue-500" />,
                            change: '+12.5%', // Cập nhật theo dữ liệu thực tế
                            isIncrease: true
                        },
                        {
                            title: 'Tổng số đơn hàng',
                            value: statistics.totalOrders,
                            icon: <FaShoppingCart className="text-green-500" />,
                            change: '+8.2%', // Cập nhật theo dữ liệu thực tế
                            isIncrease: true
                        },
                        {
                            title: 'Sản phẩm đã bán',
                            value: statistics.totalProductsSold,
                            icon: <FaBook className="text-purple-500" />,
                            change: '+10.0%', // Cập nhật theo dữ liệu thực tế
                            isIncrease: true
                        },
                        {
                            title: 'Sản phẩm còn trong kho',
                            value: statistics.totalInventory,
                            icon: <FaBook className="text-red-500" />,
                            change: '-5.0%', // Cập nhật theo dữ liệu thực tế
                            isIncrease: false
                        },
                    ]);
                } else {
                    console.error('Error fetching statistics:', response.message);
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    {stat.icon}
                                </div>
                                <div className={`flex items-center ${stat.isIncrease ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {stat.isIncrease ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                                    <span className="ml-1 text-sm">{stat.change}</span>
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
                            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Doanh thu theo tháng
                    </h3>
                    {/* <RevenueChart /> */}
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Top sách bán chạy
                    </h3>
                    {/* <TopSellingBooks /> */}
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
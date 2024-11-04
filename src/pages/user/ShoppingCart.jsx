import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const CartPage = () => {
    const { cartItems, setCartItems, setCartCount } = useCart();

    const updateQuantity = (id, change) => {
        setCartItems(items => {
            const updatedItems = items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            );
            setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
            return updatedItems;
        });
    };

    const removeItem = (id) => {
        setCartItems(items => {
            const updatedItems = items.filter(item => item.id !== id);
            setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
            return updatedItems;
        });
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-6">
                        Giỏ hàng của bạn ({cartItems.length} sản phẩm)
                    </h2>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <img src="/images/empty-cart.png" alt="Giỏ hàng trống"
                                className="mx-auto w-48 h-48 object-contain mb-4" />
                            <p className="text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
                            <button className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Mua sắm ngay
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <div className="flex items-center">
                                        <input type="checkbox" id={`item-${item.id}`}
                                            className="w-4 h-4 mr-4 rounded border-gray-300" />
                                    </div>

                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img src={item.image} alt={item.title}
                                            className="w-full h-full object-cover rounded" />
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="font-medium text-lg">{item.title}</h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>Tác giả: {item.author || 'Chưa cập nhật'}</p>
                                            <p>NXB: {item.publisher || 'Chưa cập nhật'}</p>
                                        </div>

                                        <div className="mt-2 md:hidden">
                                            <span className="text-lg font-semibold text-blue-600">
                                                {item.price.toLocaleString()}đ
                                            </span>
                                            {item.originalPrice && (
                                                <span className="ml-2 text-sm text-gray-500 line-through">
                                                    {item.originalPrice.toLocaleString()}đ
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="hidden md:block">
                                        <span className="text-lg font-semibold text-blue-600">
                                            {item.price.toLocaleString()}đ
                                        </span>
                                        {item.originalPrice && (
                                            <div className="text-sm text-gray-500 line-through">
                                                {item.originalPrice.toLocaleString()}đ
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border rounded">
                                            <button onClick={() => updateQuantity(item.id, -1)}
                                                className="p-2 hover:bg-gray-100">
                                                <FaMinus className="w-3 h-3" />
                                            </button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}
                                                className="p-2 hover:bg-gray-100">
                                                <FaPlus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button onClick={() => removeItem(item.id)}
                                            className="p-2 text-red-500 hover:text-red-600">
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="text-lg font-semibold text-blue-600">
                                        {(item.price * item.quantity).toLocaleString()}đ
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:w-80">
                    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                                <span className="font-medium">{total.toLocaleString()}đ</span>
                            </div>

                            <div className="flex justify-between pb-4 border-b">
                                <span>Phí vận chuyển:</span>
                                <span className="font-medium">30.000đ</span>
                            </div>

                            <div className="flex justify-between text-lg font-semibold">
                                <span>Tổng tiền:</span>
                                <span className="text-blue-600">{(total + 30000).toLocaleString()}đ</span>
                            </div>

                            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Thanh toán ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CartPage;
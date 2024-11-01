// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
// import './CartPage.scss';
// import { useCart } from '../../../contexts/CartContext';

// const CartPage = () => {
//     const { cartItems, setCartItems, setCartCount } = useCart();

//     const updateQuantity = (id, change) => {
//         setCartItems(items => {
//             const updatedItems = items.map(item =>
//                 item.id === id
//                     ? { ...item, quantity: Math.max(1, item.quantity + change) }
//                     : item
//             );
//             setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
//             return updatedItems;
//         });
//     };

//     const removeItem = (id) => {
//         setCartItems(items => {
//             const updatedItems = items.filter(item => item.id !== id);
//             setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
//             return updatedItems;
//         });
//     };

//     const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     return (
//         <div className="cart-page">
//             <h2 className="cart-title">Giỏ hàng của bạn</h2>

//             {cartItems.length === 0 ? (
//                 <div className="empty-cart">
//                     <p>Giỏ hàng trống</p>
//                     <Link to="/" className="continue-shopping">Tiếp tục mua sắm</Link>
//                 </div>
//             ) : (
//                 <>
//                     <div className="cart-items">
//                         {cartItems.map(item => (
//                             <div key={item.id} className="cart-item">
//                                 <img src={item.image} alt={item.title} className="item-image" />
//                                 <div className="item-details">
//                                     <h3>{item.title}</h3>
//                                     <p className="item-price">{item.price.toLocaleString()}đ</p>
//                                 </div>
//                                 <div className="quantity-controls">
//                                     <button onClick={() => updateQuantity(item.id, -1)}>
//                                         <FaMinus />
//                                     </button>
//                                     <span>{item.quantity}</span>
//                                     <button onClick={() => updateQuantity(item.id, 1)}>
//                                         <FaPlus />
//                                     </button>
//                                 </div>
//                                 <p className="item-total">
//                                     {(item.price * item.quantity).toLocaleString()}đ
//                                 </p>
//                                 <button
//                                     className="remove-item"
//                                     onClick={() => removeItem(item.id)}
//                                 >
//                                     <FaTrash />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="cart-summary">
//                         <div className="summary-row">
//                             <span>Tổng tiền:</span>
//                             <span className="total-amount">{total.toLocaleString()}đ</span>
//                         </div>
//                         <Link to="/thanhtoan" className="checkout-button">
//                             Tiến hành thanh toán
//                         </Link>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default CartPage;



import React from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '../../../contexts/CartContext';
import './CartPage.scss';

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
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-content">
                    <h2 className="cart-title">Giỏ hàng của bạn ({cartItems.length} sản phẩm)</h2>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <img src="/images/empty-cart.png" alt="Giỏ hàng trống" />
                            <p>Giỏ hàng của bạn đang trống</p>
                            <Link to="/" className="continue-shopping">Mua sắm ngay</Link>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-checkbox">
                                        <input type="checkbox" id={`item-${item.id}`} />
                                    </div>

                                    <div className="item-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>

                                    <div className="item-info">
                                        <h3 className="item-title">{item.title}</h3>
                                        <div className="item-meta">
                                            <span className="author">Tác giả: {item.author || 'Chưa cập nhật'}</span>
                                            <span className="publisher">NXB: {item.publisher || 'Chưa cập nhật'}</span>
                                        </div>

                                        <div className="item-price-mobile">
                                            <span className="current-price">
                                                {item.price.toLocaleString()}đ
                                            </span>
                                            {item.originalPrice && (
                                                <span className="original-price">
                                                    {item.originalPrice.toLocaleString()}đ
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="item-price desktop">
                                        <span className="current-price">
                                            {item.price.toLocaleString()}đ
                                        </span>
                                        {item.originalPrice && (
                                            <span className="original-price">
                                                {item.originalPrice.toLocaleString()}đ
                                            </span>
                                        )}
                                    </div>

                                    <div className="item-actions">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)}>
                                                <FaMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="item-total">
                                        {(item.price * item.quantity).toLocaleString()}đ
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="cart-sidebar">
                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Tạm tính ({cartItems.length} sản phẩm):</span>
                            <span className="amount">{total.toLocaleString()}đ</span>
                        </div>

                        <div className="summary-row shipping">
                            <span>Phí vận chuyển:</span>
                            <span className="amount">30.000đ</span>
                        </div>

                        <div className="summary-row total">
                            <span>Tổng tiền:</span>
                            <span className="total-amount">{(total + 30000).toLocaleString()}đ</span>
                        </div>

                        <Link to="/thanhtoan" className="checkout-button">
                            Thanh toán ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
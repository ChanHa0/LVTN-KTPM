import { useState, useEffect } from 'react';
import cartApi from '../api/cartApi';

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    setCartItems(parsedCart);
                    setCartCount(parsedCart.reduce((total, item) => total + item.quantity, 0));
                }
            } catch (error) {
                console.error('Lỗi khi tải giỏ hàng:', error);
            }
        };

        loadCart();
    }, []);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            let newItems;

            if (existingItem) {
                newItems = prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...prevItems, { ...product, quantity: 1 }];
            }

            localStorage.setItem('cart', JSON.stringify(newItems));
            setCartCount(newItems.reduce((total, item) => total + item.quantity, 0));
            return newItems;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            const newItems = prevItems.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(newItems));
            setCartCount(newItems.reduce((total, item) => total + item.quantity, 0));
            return newItems;
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(prevItems => {
            const newItems = prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );
            localStorage.setItem('cart', JSON.stringify(newItems));
            setCartCount(newItems.reduce((total, item) => total + item.quantity, 0));
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        setCartCount(0);
        localStorage.removeItem('cart');
    };

    return {
        cartItems,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};

export default useCart;
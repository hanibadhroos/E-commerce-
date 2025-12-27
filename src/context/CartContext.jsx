import React, { createContext, useContext, useState, useEffect } from 'react';

// إنشاء Context
 const CartContext = createContext();

// مكون Provider
export const CartProvider = ({ children }) => {
    // الحالة الأولية مع localStorage
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
            return [];
        }
    });

    // حفظ في localStorage عند التغيير
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cartItems]);

    // إضافة منتج إلى السلة
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // إذا المنتج موجود، زيادة الكمية
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // إذا المنتج غير موجود، إضافته جديد
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // إزالة منتج من السلة
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // تحديث كمية منتج
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: quantity }
                        : item
                )
            );
        }
    };

    // إفراغ السلة
    const clearCart = () => {
        setCartItems([]);
    };

    // حساب الإجمالي
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // حساب عدد العناصر
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    
    return context;
};
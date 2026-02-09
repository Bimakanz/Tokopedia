import React, { createContext, ReactNode, useContext, useState } from 'react';

export type CartItem = {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    checked?: boolean;
    category: string;
};

export type Transaction = {
    id: string;
    items: CartItem[];
    totalPrice: number;
    date: string;
    status: 'Selesai' | 'Proses' | 'Batal';
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: number) => void;
    deleteFromCart: (productId: number) => void;
    toggleCheck: (productId: number) => void;
    getCartCount: () => number;
    getTotalPrice: () => number;
    transactions: Transaction[];
    checkout: () => void;
    buyNow: (product: any) => void;
    wishlist: CartItem[];
    addToWishlist: (product: any) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    getWishlistCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: any) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1, checked: true }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                return prevCart.filter((item) => item.id !== productId);
            }
        });
    };

    const deleteFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const toggleCheck = (productId: number) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const getTotalPrice = () => {
        return cart
            .filter(item => item.checked)
            .reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const checkout = () => {
        const selectedItems = cart.filter(item => item.checked);
        if (selectedItems.length === 0) return;

        const newTransaction: Transaction = {
            id: Date.now().toString(),
            items: selectedItems,
            totalPrice: getTotalPrice(),
            date: new Date().toISOString(),
            status: 'Selesai'
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setCart(prev => prev.filter(item => !item.checked));
    };

    const buyNow = (product: any) => {
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            items: [{ ...product, quantity: 1, checked: true }],
            totalPrice: product.price,
            date: new Date().toISOString(),
            status: 'Selesai'
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const [wishlist, setWishlist] = useState<CartItem[]>([]);

    const addToWishlist = (product: any) => {
        setWishlist((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.filter((item) => item.id !== product.id);
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromWishlist = (productId: number) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId: number) => {
        return wishlist.some((item) => item.id === productId);
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                deleteFromCart,
                toggleCheck,
                getCartCount,
                getTotalPrice,
                transactions,
                checkout,
                buyNow,
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                getWishlistCount
            }}
        >
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

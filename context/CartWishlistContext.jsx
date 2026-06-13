'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CartWishlistContext = createContext(null);

export function CartWishlistProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and wishlist from localStorage on client-side mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('eyeconic_cart');
      const storedWishlist = localStorage.getItem('eyeconic_wishlist');
      
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Error loading checkout state:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('eyeconic_cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart state:', error);
      }
    }
  }, [cart, isLoaded]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('eyeconic_wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error('Error saving wishlist state:', error);
      }
    }
  }, [wishlist, isLoaded]);

  // Cart operations
  const addToCart = (product, color, quantity = 1) => {
    if (!product) return;
    
    // Fallback default color if color not selected or missing
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : '#1a1a1a');

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => String(item.product.id) === String(product.id) && item.color === selectedColor
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, color: selectedColor, quantity }];
      }
    });
  };

  const removeFromCart = (productId, color) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(String(item.product.id) === String(productId) && item.color === color)
      )
    );
  };

  const updateQuantity = (productId, color, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.product.id) === String(productId) && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    if (!product) return;
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return prevWishlist.filter((item) => String(item.id) !== String(product.id));
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => String(item.id) === String(productId));
  };

  // isInCart: if color provided, checks that exact combo; otherwise checks any variant
  const isInCart = (productId, color) => {
    if (color) {
      return cart.some(
        (item) => String(item.product.id) === String(productId) && item.color === color
      );
    }
    return cart.some((item) => String(item.product.id) === String(productId));
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isInCart,
        isLoaded,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
}

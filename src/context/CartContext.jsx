import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Bulk State
  const bulkBaseKg = 15;
  const bulkBasePrice = 120;
  const bulkExtraKgPrice = 9;
  const [extraKilos, setExtraKilos] = useState({ plain: 0, sesame: 0, nuts: 0 });
  const [mainFlavour, setMainFlavour] = useState('Traditional Plain Halwa (Xalwo Caadi)');

  const totalExtraKg = extraKilos.plain + extraKilos.sesame + extraKilos.nuts;
  const currentBulkWeight = bulkBaseKg + totalExtraKg;
  const totalBulkPrice = bulkBasePrice + (totalExtraKg * bulkExtraKgPrice);

  const [currentDojoOrder, setCurrentDojoOrder] = useState({
    title: '',
    price: 0,
    weight: ''
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const openCheckout = (title, price, weight) => {
    setCurrentDojoOrder({ title, price, weight });
    setIsCheckoutModalOpen(true);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isBulkModalOpen,
    setIsBulkModalOpen,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    currentDojoOrder,
    openCheckout,
    bulkBaseKg,
    bulkBasePrice,
    bulkExtraKgPrice,
    extraKilos,
    setExtraKilos,
    mainFlavour,
    setMainFlavour,
    currentBulkWeight,
    totalBulkPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

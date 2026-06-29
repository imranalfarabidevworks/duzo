'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  count: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  promoCode: string;
  setPromoCode: (v: string) => void;
  discount: number;
  applyPromo: (code: string) => string | null;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPct, setDiscountPct] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('duzo_cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('duzo_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: string, delta: number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));

  const clearCart = () => { setItems([]); localStorage.removeItem('duzo_cart'); };

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = (subtotal * discountPct) / 100;
  const shipping = subtotal > 35 ? 0 : 4.99;
  const total = subtotal - discount + shipping;
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const applyPromo = (code: string): string | null => {
    const CODES: Record<string, number> = { 'DUZO15': 15, 'WELCOME10': 10, 'ORGANIC20': 20 };
    const pct = CODES[code.toUpperCase()];
    if (pct) {
      setDiscountPct(pct);
      setPromoCode(code.toUpperCase());
      return null; // no error
    }
    return 'Invalid promo code';
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, subtotal, count, isOpen, setIsOpen, promoCode, setPromoCode, discount, applyPromo }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

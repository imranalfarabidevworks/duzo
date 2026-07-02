import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string; // এখানে thik করা হয়েছে
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  description: string; // এখানে thik করা হয়েছে
}

export const PRODUCTS: Product[] = [
  {
    id: 1, 
    name: 'Premium Almonds', 
    price: 15.5, 
    originalPrice: 19,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=600&auto=format&fit=crop',
    rating: 4.8, 
    reviews: 245, 
    badge: 'Best Seller', 
    category: 'Nuts',
    description: 'Crispy, raw, and highly nutritious premium almonds.'
  },
  {
    id: 2, 
    name: 'Organic Dried Figs', 
    price: 18.2, 
    originalPrice: 23,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop',
    rating: 4.6, 
    reviews: 120, 
    badge: 'New', 
    category: 'Fruits',
    description: 'Naturally sweet and fiber-rich organic dried figs.'
  },
  {
    id: 3, 
    name: 'Dried Apricots', 
    price: 10.6,
    image: 'https://images.unsplash.com/photo-1601004890657-3ef98f68fec0?w=400&q=80&auto=format&fit=crop',
    rating: 4.5, 
    reviews: 97, 
    category: 'Fruits',
    description: 'Naturally sweet, no added sugar or sulfites'
  },
  {
    id: 4, 
    name: 'Mixed Cashews', 
    price: 8.3,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80&auto=format&fit=crop',
    rating: 4.6, 
    reviews: 143, 
    category: 'Nuts',
    description: 'Whole roasted cashews, lightly salted'
  },
  {
    id: 5, 
    name: 'Walnut Halves', 
    price: 14.9,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80&auto=format&fit=crop',
    rating: 4.8, 
    reviews: 256, 
    badge: 'Popular', 
    category: 'Nuts',
    description: 'Rich omega-3 walnuts, raw & unprocessed'
  },
  {
    id: 6, 
    name: 'Dried Figs', 
    price: 12.4,
    image: 'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=400&q=80&auto=format&fit=crop',
    rating: 4.6, 
    reviews: 178, 
    category: 'Fruits',
    description: 'Turkish figs, naturally dried & chewy'
  },
  {
    id: 7, 
    name: 'Blueberries', 
    price: 19.9, 
    originalPrice: 24,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80&auto=format&fit=crop',
    rating: 4.9, 
    reviews: 421, 
    badge: 'Premium', 
    category: 'Berries',
    description: 'Wild mountain blueberries, freeze-dried'
  },
  {
    id: 8, 
    name: 'Almonds', 
    price: 16.5,
    image: 'https://images.unsplash.com/photo-1574570068036-add3c9a491fd?w=400&q=80&auto=format&fit=crop',
    rating: 4.7, 
    reviews: 203, 
    category: 'Nuts',
    description: 'California raw almonds, skin-on'
  }
];
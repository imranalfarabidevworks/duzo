export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  description: string;
  details: string[];
  inStock: boolean;
  weight: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Medjool Dates',
    price: 17.80,
    originalPrice: 22.00,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 312,
    badge: 'Best Seller',
    category: 'Dates',
    description: 'Premium jumbo Medjool dates — soft, caramel-rich and naturally sweet.',
    details: ['No added sugar', 'Hand-picked', 'Rich in fiber & potassium', 'Gluten-free'],
    inStock: true,
    weight: '500g',
  },
  {
    id: 'p2',
    name: 'Goji Berries',
    price: 17.50,
    originalPrice: 21.00,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 189,
    badge: 'New',
    category: 'Berries',
    description: 'Sun-dried Tibetan superfood berries — packed with antioxidants.',
    details: ['High in vitamin C', 'Antioxidant-rich', 'Non-GMO', 'Organic certified'],
    inStock: true,
    weight: '250g',
  },
  {
    id: 'p3',
    name: 'Dried Apricots',
    price: 10.60,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80&auto=format&fit=crop',
    rating: 4.5,
    reviews: 97,
    category: 'Fruits',
    description: 'Naturally sweet Turkish apricots — no added sugar or sulfites.',
    details: ['Sulfite-free', 'No preservatives', 'High in iron', 'Natural sweetness'],
    inStock: true,
    weight: '400g',
  },
  {
    id: 'p4',
    name: 'Whole Cashews',
    price: 8.30,
    image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=500&q=80&auto=format&fit=crop',
    rating: 4.6,
    reviews: 143,
    category: 'Nuts',
    description: 'Whole roasted cashews — lightly salted and perfectly crunchy.',
    details: ['Lightly salted', 'Whole kernels', 'Rich in zinc', 'Heart-healthy fats'],
    inStock: true,
    weight: '300g',
  },
  {
    id: 'p5',
    name: 'Walnut Halves',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80&auto=format&fit=crop',
    rating: 4.8,
    reviews: 256,
    badge: 'Popular',
    category: 'Nuts',
    description: 'Premium walnut halves — raw, unprocessed and omega-3 rich.',
    details: ['Omega-3 fatty acids', 'Raw & unprocessed', 'Brain health', 'High protein'],
    inStock: true,
    weight: '400g',
  },
  {
    id: 'p6',
    name: 'Dried Figs',
    price: 12.40,
    image: 'https://images.unsplash.com/photo-1601004890657-3ef98f68fec0?w=500&q=80&auto=format&fit=crop',
    rating: 4.6,
    reviews: 178,
    category: 'Fruits',
    description: 'Chewy Turkish figs, naturally dried and fiber-packed.',
    details: ['High in fiber', 'Natural calcium', 'No preservatives', 'Sweet & chewy'],
    inStock: true,
    weight: '350g',
  },
  {
    id: 'p7',
    name: 'Wild Blueberries',
    price: 19.90,
    originalPrice: 24.00,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&q=80&auto=format&fit=crop',
    rating: 4.9,
    reviews: 421,
    badge: 'Premium',
    category: 'Berries',
    description: 'Freeze-dried wild mountain blueberries — antioxidant powerhouse.',
    details: ['Freeze-dried', 'Wild harvested', 'Rich in anthocyanins', 'Low calorie'],
    inStock: true,
    weight: '200g',
  },
  {
    id: 'p8',
    name: 'Raw Almonds',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1574570068036-add3c9a491fd?w=500&q=80&auto=format&fit=crop',
    rating: 4.7,
    reviews: 203,
    category: 'Nuts',
    description: 'California raw almonds — skin-on, nutrient-dense and versatile.',
    details: ['Skin-on', 'Raw & natural', 'High in vitamin E', 'Protein-rich'],
    inStock: true,
    weight: '500g',
  },
];

export const CATEGORIES = ['All', 'Dates', 'Berries', 'Nuts', 'Fruits'];

export const PROMO_CODES: Record<string, number> = {
  'DUZO15': 15,
  'WELCOME10': 10,
  'ORGANIC20': 20,
};

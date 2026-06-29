# 🌿 Duzo — Full-Stack E-Commerce Website

## Stack
- **Frontend**: Next.js 15 + TypeScript + Glassmorphism UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT-based (httpOnly cookies)
- **Payment**: Stripe Checkout

## Setup (5 মিনিট)

### 1. Install dependencies
```bash
npm install
```

### 2. Environment Variables
`.env.local` ফাইলে আপনার keys দিন:

```env
# MongoDB Atlas থেকে connection string নিন (free tier available)
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/duzo

# যেকোনো random string (min 32 chars)
BETTER_AUTH_SECRET=your-random-secret-key-here-minimum-32-chars

# Stripe থেকে নিন (stripe.com — test keys দিয়েই কাজ করবে)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run
```bash
npm run dev
```

Open http://localhost:3000

## Pages
- `/` — Home (products, hero, reviews)
- `/auth` — Login / Register
- `/checkout` — Checkout with Stripe or COD
- `/orders` — My Orders
- `/order-success` — Order confirmation

## MongoDB Setup (Free)
1. mongodb.com/atlas এ যান
2. Free cluster তৈরি করুন
3. Connection string কপি করুন → .env.local এ দিন

## Stripe Setup (Test Mode)
1. stripe.com এ যান
2. Dashboard → API Keys
3. Test keys কপি করুন → .env.local এ দিন
4. Real card payment ছাড়াও test cards কাজ করবে: `4242 4242 4242 4242`

## Features
✅ Real product photos (Unsplash)
✅ Glassmorphism UI design
✅ User registration & login (JWT)
✅ Shopping cart (localStorage)
✅ Promo codes (DUZO15, WELCOME10, ORGANIC20)
✅ Stripe payment integration
✅ Cash on Delivery option
✅ Orders saved to MongoDB
✅ Order history page
✅ Mobile responsive

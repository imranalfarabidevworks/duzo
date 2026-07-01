# 🌿 Duzo — Full-Stack E-Commerce Website

**Next.js 15 + TypeScript + MongoDB + Stripe + JWT Auth**

---

## ✅ Features
- Glassmorphism UI (dark green + gold)
- 12 real food products (dates, nuts, berries, fruits)
- User Register / Login (JWT, httpOnly cookie)
- Shopping cart with promo codes
- Stripe card payment OR Cash on Delivery
- Orders saved to MongoDB with order number
- My Orders page with status tracking
- Image fallback (কোনো image না আসলেও crash করবে না)
- Mobile responsive

## 🚀 Setup (5 minutes)

### Step 1 — Install
```bash
npm install
```

### Step 2 — .env.local এ keys দিন

```env
# ── MongoDB ──────────────────────────────────────────────
# mongodb.com/atlas → Free cluster → Connect → copy URI
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/duzo

# ── Auth ─────────────────────────────────────────────────
# যেকোনো random 32+ character string
BETTER_AUTH_SECRET=change-this-to-any-long-random-string-32chars

# ── Stripe (optional — COD works without it) ──────────────
# stripe.com → Dashboard → Developers → API keys
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx

# ── App URL ───────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3 — Run
```bash
npm run dev
```
→ http://localhost:3000

---

## 💳 Test Stripe Payment
Card: `4242 4242 4242 4242`
Date: যেকোনো future date
CVV: যেকোনো 3 digit

## 🎫 Promo Codes
| Code | Discount |
|------|---------|
| DUZO15 | 15% off |
| WELCOME10 | 10% off |
| ORGANIC20 | 20% off |

## 📦 MongoDB Atlas (Free Setup)
1. https://mongodb.com/atlas → Sign up free
2. Create a free cluster (M0)
3. Database Access → Add user
4. Network Access → Add IP → 0.0.0.0/0 (allow all)
5. Connect → Connect your application → copy URI
6. Replace `<password>` with your password in the URI

---

## 🗂 Project Structure
```
src/
├── app/
│   ├── page.tsx          ← Home page
│   ├── auth/page.tsx     ← Login / Register
│   ├── checkout/page.tsx ← Checkout
│   ├── orders/page.tsx   ← My Orders
│   ├── order-success/    ← Order confirmation
│   └── api/
│       ├── auth/login    ← POST login
│       ├── auth/register ← POST register
│       ├── auth/logout   ← POST logout
│       ├── auth/me       ← GET current user
│       ├── checkout      ← POST create order
│       └── orders        ← GET user orders
├── components/
│   ├── Navbar.tsx
│   ├── CartDrawer.tsx
│   └── ProductCard.tsx
├── context/
│   ├── CartContext.tsx   ← Cart state (localStorage)
│   └── AuthContext.tsx   ← Auth state
├── lib/
│   ├── products.ts       ← Product data
│   ├── db.ts             ← MongoDB connection
│   └── auth.ts           ← JWT utilities
└── models/
    ├── User.ts           ← User schema
    └── Order.ts          ← Order schema
```

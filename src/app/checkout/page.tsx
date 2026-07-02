'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Truck, CheckCircle, Loader } from 'lucide-react';

const FALLBACK = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&q=60&auto=format&fit=crop';

export default function CheckoutPage() {
  const { items, subtotal, discount, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const shipping = subtotal > 35 ? 0 : (subtotal > 0 ? 4.99 : 0);

  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    phone: '', street: '', city: '', state: '', zip: '', country: 'US',
  });
  const [payMethod, setPayMethod] = useState<'stripe' | 'cod'>('stripe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleCheckout = async () => {
    if (!user) { router.push('/auth'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image, category: i.category })),
          shippingAddress: form, paymentMethod: payMethod,
          subtotal, discount, promoCode: '',
        }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else if (data.orderNumber) { clearCart(); router.push(`/order-success?order=${data.orderNumber}&demo=${data.demo || false}`); }
      else setError(data.error || 'Checkout failed. Please try again.');
    } catch { setError('Network error. Please try again.'); }
    setLoading(false);
  };

  if (!items.length) return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: 24 }}>
      <p style={{ color: 'var(--text-s)', fontSize: 18 }}>Your cart is empty</p>
      <Link href="/" className="btn-gold" style={{ textDecoration: 'none' }}>Continue Shopping</Link>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', padding: '20px 0 80px' }}>
      <div className="wrap" style={{ paddingTop: 80 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back to shop
        </Link>
        <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#fff', marginBottom: 32 }}>Checkout</h1>

        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'start' }}>

          {/* LEFT — Form */}
          <div>
            {/* Shipping */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: 'clamp(20px,4vw,28px)', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Truck size={18} color="var(--gold)" /> Shipping Address
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { k: 'name', label: 'Full Name', ph: 'John Doe', full: true },
                  { k: 'email', label: 'Email', ph: 'john@email.com', type: 'email', full: true },
                  { k: 'phone', label: 'Phone', ph: '+1 234 567 8900', full: true },
                  { k: 'street', label: 'Street Address', ph: '123 Main Street', full: true },
                  { k: 'city', label: 'City', ph: 'New York' },
                  { k: 'state', label: 'State', ph: 'NY' },
                  { k: 'zip', label: 'ZIP Code', ph: '10001' },
                  { k: 'country', label: 'Country', ph: 'US' },
                ].map(f => (
                  <div key={f.k} style={{ gridColumn: f.full ? '1/-1' : 'auto' }}>
                    <label style={{ fontSize: 12, color: 'var(--text-s)', display: 'block', marginBottom: 6 }}>{f.label}</label>
                    <input className="input" type={f.type || 'text'} value={(form as any)[f.k]} onChange={e => update(f.k, e.target.value)} placeholder={f.ph} required />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: 'clamp(20px,4vw,28px)' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
                <CreditCard size={18} color="var(--gold)" /> Payment Method
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { id: 'stripe', label: 'Card Payment', icon: '💳', desc: 'Visa, Mastercard, Amex' },
                  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
                ].map(m => (
                  <button key={m.id} onClick={() => setPayMethod(m.id as 'stripe' | 'cod')} style={{ padding: '16px', borderRadius: 12, border: `2px solid ${payMethod === m.id ? 'var(--gold)' : 'rgba(255,255,255,0.09)'}`, background: payMethod === m.id ? 'rgba(200,146,42,0.1)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: 26, marginBottom: 6 }}>{m.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-m)' }}>{m.desc}</div>
                    {payMethod === m.id && <div style={{ marginTop: 6, color: 'var(--gold)', fontSize: 12, fontWeight: 600 }}>✓ Selected</div>}
                  </button>
                ))}
              </div>
              {payMethod === 'stripe' && (
                <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(200,146,42,0.06)', border: '1px solid rgba(200,146,42,0.15)', borderRadius: 10 }}>
                  <p style={{ fontSize: 12, color: 'var(--gold)' }}>🔒 Add Stripe keys in <code>.env.local</code> to enable real card payments. Test card: 4242 4242 4242 4242</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Summary */}
          <div className="checkout-summary" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: 'clamp(20px,4vw,28px)', position: 'sticky', top: 100 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 22 }}>Order Summary</h2>

            <div style={{ maxHeight: 260, overflowY: 'auto', marginBottom: 18 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                  <div style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.08)', background: '#1a2a1a' }}>
                    <img src={item.image} alt={item.name} onError={e => { (e.target as HTMLImageElement).src = FALLBACK; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-m)' }}>x{item.quantity}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)', flexShrink: 0 }}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, marginBottom: 16 }}>
              {[
                { l: 'Subtotal', v: `$${subtotal.toFixed(2)}` },
                { l: 'Shipping', v: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` },
                ...(discount > 0 ? [{ l: 'Discount', v: `-$${discount.toFixed(2)}` }] : []),
              ].map(row => (
                <div key={row.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: 'var(--text-s)', fontSize: 13 }}>{row.l}</span>
                  <span style={{ color: row.l === 'Discount' ? '#4caf50' : row.v === 'FREE' ? '#4caf50' : '#fff', fontSize: 13, fontWeight: 500 }}>{row.v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Playfair Display,serif', color: 'var(--gold)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {!user && (
              <div style={{ marginBottom: 14, padding: '12px', background: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.2)', borderRadius: 10 }}>
                <p style={{ fontSize: 13, color: 'var(--gold)', marginBottom: 8 }}>Please sign in to complete your order</p>
                <Link href="/auth" className="btn-gold" style={{ textDecoration: 'none', fontSize: 13, padding: '9px 18px' }}>Sign In</Link>
              </div>
            )}

            {error && (
              <div style={{ marginBottom: 14, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 8, padding: '10px 14px', color: '#ff6b6b', fontSize: 13 }}>{error}</div>
            )}

            <button onClick={handleCheckout} disabled={loading || !user} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: 16, opacity: !user ? 0.5 : 1 }}>
              {loading
                ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
                : payMethod === 'stripe'
                  ? <><CreditCard size={16} /> Pay ${total.toFixed(2)}</>
                  : <><CheckCircle size={16} /> Confirm Order</>
              }
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 14 }}>
              {['🔒 SSL Secure', '✓ Encrypted', '🛡 Protected'].map(b => (
                <span key={b} style={{ fontSize: 11, color: 'var(--text-m)' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .checkout-summary { position: static !important; }
        }
        @media (max-width: 600px) {
          .checkout-grid > div:first-child > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

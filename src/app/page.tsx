'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';

// 🔴 Named Import এর মাধ্যমে PRODUCTS ডেটা আনা হয়েছে এবং টাইপ সিঙ্ক করা হয়েছে
import { PRODUCTS, Product } from '@/lib/products'; 
import { ArrowRight, Star, Truck, ShieldCheck, Leaf, RotateCcw, CheckCircle, ChevronDown } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1593904308074-e1a53c4385f9?w=1800&q=85&auto=format&fit=crop';
const FALLBACK = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80&auto=format&fit=crop';

// 🔴 ফিল্টারিং এর জন্য CATEGORIES অ্যারেটি ডিফাইন করা হলো
const CATEGORIES = ['All', 'Dates', 'Berries', 'Nuts', 'Fruits'];

function SafeImg({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [s, setS] = useState(src);
  return <img src={s} alt={alt} onError={() => setS(FALLBACK)} loading="lazy" style={style} />;
}

export default function Home() {
  const [cat, setCat] = useState('All');
  
  // PRODUCTS ব্যবহার করে ফিল্টারিং করা হচ্ছে
  const filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);

  return (
    <main>
      <Navbar />
      <CartDrawer />

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <SafeImg src={HERO_IMG} alt="Dried fruits" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(13,26,13,0.92) 0%,rgba(13,26,13,0.45) 60%,rgba(13,26,13,0.7) 100%)' }} />
        <div style={{ position: 'absolute', top: '15%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(200,146,42,0.1) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <div className="wrap hero-content" style={{ position: 'relative', zIndex: 2, paddingTop: 120, paddingBottom: 60, width: '100%' }}>
          <div style={{ maxWidth: 680, animation: 'fadeUp 0.8s ease both' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(200,146,42,0.12)', border: '1px solid rgba(200,146,42,0.28)', borderRadius: 24, padding: '7px 18px', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', display: 'block' }} />
              <span style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>100% Natural & Organic</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20, color: '#fff' }}>
              Dried Natural<br />
              <span style={{ background: 'linear-gradient(90deg,#c8922a,#f0d060)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Crunchy Fruits</span>
            </h1>

            <p className="hero-desc" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, lineHeight: 1.85, marginBottom: 36, maxWidth: 520 }}>
              Hand-selected premium dried fruits & nuts from the world's finest farms. Naturally dried to lock in every nutrient and flavor.
            </p>

            <div className="hero-btns" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
              <a href="#categories" className="btn-gold" style={{ fontSize: 16, padding: '14px 32px' }}>Shop Now <ArrowRight size={16} /></a>
              <a href="#about" className="btn-glass" style={{ fontSize: 16, padding: '13px 28px' }}>Our Story</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="var(--gold)" color="var(--gold)" />)}
              </div>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>4.9 from 2,400+ customers</span>
            </div>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, maxWidth: 420, marginTop: 56 }}>
            {[{ n: '50+', l: 'Products' }, { n: '12', l: 'Countries' }, { n: '98%', l: 'Organic' }].map(s => (
              <div key={s.n} className="glass" style={{ padding: '18px 12px', textAlign: 'center', borderRadius: 14 }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Playfair Display,serif', color: 'var(--gold)' }}>{s.n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: 0.4, animation: 'float 2s ease-in-out infinite' }}>
          <span style={{ fontSize: 10, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={16} color="#fff" />
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '24px 0' }}>
        <div className="wrap">
          <div className="trust-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {[
              { Icon: Truck, t: 'Free Shipping', d: 'On orders over $35' },
              { Icon: ShieldCheck, t: 'Secure Payment', d: 'SSL encrypted checkout' },
              { Icon: Leaf, t: 'Certified Organic', d: 'Third-party verified' },
              { Icon: RotateCcw, t: 'Easy Returns', d: '30-day guarantee' },
            ].map(({ Icon, t, d }) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: 'rgba(200,146,42,0.1)', border: '1px solid rgba(200,146,42,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color="var(--gold)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{t}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-m)', marginTop: 2 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section id="categories" className="section-pad" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Our Collection</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>Your Local Choice</h2>
            <p style={{ color: 'var(--text-s)', maxWidth: 440, margin: '0 auto', fontSize: 15 }}>Hand-picked from the finest farms worldwide.</p>
          </div>

          {/* Category filters */}
          <div className="cat-filters" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{ padding: '9px 20px', borderRadius: 24, border: '1px solid', borderColor: c === cat ? 'var(--gold)' : 'rgba(255,255,255,0.12)', background: c === cat ? 'linear-gradient(135deg,#c8922a,#e0a93a)' : 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', color: c === cat ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 14, fontWeight: 500, transition: 'all 0.2s', boxShadow: c === cat ? '0 4px 14px rgba(200,146,42,0.3)' : 'none' }}>
                {c}
              </button>
            ))}
          </div>

         <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 22 }}>
  {filtered.map((p: Product) => (
    <ProductCard key={p.id} product={p} />
  ))}
</div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)' }}>
        <div className="wrap">
          {/* Big feature card */}
          <div className="about-card two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', background: 'rgba(255,255,255,0.045)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 22, overflow: 'hidden', marginBottom: 24 }}>
            <div className="mosaic-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[PRODUCTS[3]?.image, PRODUCTS[6]?.image, PRODUCTS[0]?.image, PRODUCTS[4]?.image].map((src, i) => (
                <div key={i} style={{ height: 200, overflow: 'hidden' }}>
                  <SafeImg src={src || FALLBACK} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.72)' }} />
                </div>
              ))}
            </div>
            <div style={{ padding: 'clamp(24px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Our Story</p>
              <h2 style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: 16 }}>From Farm to<br />Your Table</h2>
              <p style={{ color: 'var(--text-s)', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>Duzo started with one mission — bring the world's finest dried fruits and nuts directly from trusted farms to your home, with zero compromise on quality.</p>
              {['100% natural, zero additives', 'Certified organic farms', 'Rich in essential nutrients', 'Sourced from 12+ countries'].map(pt => (
                <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                  <CheckCircle size={14} color="var(--gold)" />
                  <span style={{ color: 'var(--text-s)', fontSize: 13 }}>{pt}</span>
                </div>
              ))}
              <a href="#categories" className="btn-gold" style={{ marginTop: 22, alignSelf: 'flex-start', textDecoration: 'none', fontSize: 14, padding: '11px 24px' }}>Shop Collection <ArrowRight size={15} /></a>
            </div>
          </div>

          {/* Two promo cards */}
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { img: PRODUCTS[2]?.image, tag: 'Seasonal', title: 'Farm to Your Doorstep', desc: 'Freshly harvested and carefully dried — our seasonal picks arrive at peak flavor.', cta: 'Shop Seasonal' },
              { img: PRODUCTS[7]?.image, tag: 'Organic', title: 'Certified Organic Range', desc: 'Third-party certified purity — clean, natural nutrition you can trust every time.', cta: 'Explore Organic' },
            ].map(card => (
              <div key={card.tag} className="promo-card" style={{ borderRadius: 18, overflow: 'hidden', background: 'rgba(255,255,255,0.045)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)', display: 'grid', gridTemplateColumns: '1fr 1.2fr' }}>
                <div className="promo-img" style={{ minHeight: 180, overflow: 'hidden' }}>
                  <SafeImg src={card.img || FALLBACK} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.68)' }} />
                </div>
                <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{card.tag}</p>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ color: 'var(--text-s)', fontSize: 12, lineHeight: 1.65, marginBottom: 16 }}>{card.desc}</p>
                  <a href="#categories" className="btn-gold" style={{ padding: '8px 16px', fontSize: 12, textDecoration: 'none', alignSelf: 'flex-start' }}>{card.cta} <ArrowRight size={12} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section-pad" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Testimonials</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, color: '#fff' }}>What Our Customers Say</h2>
          </div>
          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { name: 'Sarah M.', role: 'Health Coach', text: 'Duzo has transformed my snacking habits. The medjool dates are incredible — rich, natural sweetness with zero additives.', initial: 'S', color: '#c8922a' },
              { name: 'James T.', role: 'Executive Chef', text: 'As a professional chef, quality matters. Duzo delivers consistent premium produce that elevates every dish I create.', initial: 'J', color: '#2a8ac8' },
              { name: 'Amara O.', role: 'Nutritionist', text: 'I recommend Duzo to all my clients. Their organic certification is genuine and the nutrient density is exceptional.', initial: 'A', color: '#4caf50' },
            ].map(r => (
              <div key={r.name} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: '24px 22px', transition: 'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,146,42,0.35)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'}
              >
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="var(--gold)" color="var(--gold)" />)}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 14, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{r.initial}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-m)' }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#060f06', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 56 }}>
        <div className="wrap">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40, paddingBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                <div style={{ background: 'linear-gradient(135deg,#c8922a,#e0a93a)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Leaf size={14} color="#fff" />
                </div>
                <span style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 700, color: '#fff' }}>Duzo</span>
              </div>
              <p style={{ color: 'var(--text-s)', fontSize: 13, lineHeight: 1.8, marginBottom: 18 }}>Premium dried fruits and nuts, sourced from the world's finest farms. Pure nature in every bite.</p>
              <div className="footer-payments" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map(p => (
                  <span key={p} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, fontSize: 11, color: 'var(--text-m)' }}>{p}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Shop</h4>
              {CATEGORIES.filter(c => c !== 'All').map(c => (
                <button key={c} onClick={() => { setCat(c); document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ display: 'block', color: 'var(--text-m)', background: 'none', border: 'none', textAlign: 'left', fontSize: 13, marginBottom: 10, cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--gold)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-m)'}
                >{c}</button>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Company</h4>
              {['About Us', 'Our Story', 'Careers', 'Press'].map(l => (
                <a key={l} href="#about" style={{ display: 'block', color: 'var(--text-m)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--gold)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-m)'}
                >{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Support</h4>
              <a href="mailto:hello@duzo.com" style={{ display: 'block', color: 'var(--text-m)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>hello@duzo.com</a>
              <a href="tel:+18001234567" style={{ display: 'block', color: 'var(--text-m)', textDecoration: 'none', fontSize: 13, marginBottom: 10 }}>+1 (800) 123-4567</a>
              <p style={{ color: 'var(--text-m)', fontSize: 13 }}>Mon–Fri: 9am–6pm EST</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <p style={{ color: 'var(--text-m)', fontSize: 12 }}>© 2026 Duzo. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['Privacy', 'Terms', 'Cookies'].map(l => <a key={l} href="#" style={{ color: 'var(--text-m)', textDecoration: 'none', fontSize: 12 }}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
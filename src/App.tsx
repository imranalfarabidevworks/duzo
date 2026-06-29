import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products, { Product } from './components/Products';
import Featured from './components/Featured';
import Cart, { CartItem } from './components/Cart';
import Footer from './components/Footer';
import { ShieldCheck, Truck, Leaf, RotateCcw, Star } from 'lucide-react';

const TRUST = [
  { Icon:Truck, title:'Free Shipping', desc:'On all orders over $35' },
  { Icon:ShieldCheck, title:'Secure Payment', desc:'100% protected & encrypted' },
  { Icon:Leaf, title:'Certified Organic', desc:'Third-party verified quality' },
  { Icon:RotateCcw, title:'Easy Returns', desc:'30-day hassle-free policy' },
];

const REVIEWS = [
  { name:'Sarah M.', role:'Health Coach', text:'Duzo has completely transformed my snacking habits. The medjool dates are incredible — rich, natural sweetness with zero additives.', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop' },
  { name:'James T.', role:'Chef', text:'As a professional chef, quality ingredients matter. Duzo delivers consistent premium produce that elevates every dish I create.', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop' },
  { name:'Amara O.', role:'Nutritionist', text:'I recommend Duzo to all my clients. Their organic certification is genuine and the nutrient density is exceptional.', img:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80&auto=format&fit=crop' },
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const ex = prev.find(i=>i.id===product.id);
      if(ex) return prev.map(i=>i.id===product.id?{...i,quantity:i.quantity+1}:i);
      return [...prev,{...product,quantity:1}];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (id:number, delta:number) =>
    setCartItems(prev=>prev.map(i=>i.id===id?{...i,quantity:Math.max(1,i.quantity+delta)}:i));

  const handleRemove = (id:number) =>
    setCartItems(prev=>prev.filter(i=>i.id!==id));

  const cartCount = cartItems.reduce((s,i)=>s+i.quantity,0);

  return (
    <div>
      <Navbar />  
      <Hero/>

      {/* Trust Bar */}
      <div style={{ background:'rgba(255,255,255,0.03)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,0.07)', borderBottom:'1px solid rgba(255,255,255,0.07)', padding:'28px 0' }}>
        <div className="wrap" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
          {TRUST.map(({Icon,title,desc})=>(
            <div key={title} style={{ display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:'rgba(200,146,42,0.1)', border:'1px solid rgba(200,146,42,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={20} color="var(--gold)"/>
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:'#fff' }}>{title}</div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Products onAddToCart={handleAddToCart}/>
      <Featured/>

      {/* Testimonials */}
      <section style={{ padding:'96px 0', background:'var(--dark)' }}>
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <p style={{ color:'var(--gold)', fontSize:13, fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:14 }}>Testimonials</p>
            <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:700, color:'#fff' }}>What Our Customers Say</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {REVIEWS.map(r=>(
              <div key={r.name} style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:'28px 26px', transition:'border-color 0.3s' }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(200,146,42,0.35)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.1)'}
              >
                <div style={{ display:'flex', gap:2, marginBottom:16 }}>
                  {[...Array(5)].map((_,i)=><Star key={i} size={14} fill="var(--gold)" color="var(--gold)"/>)}
                </div>
                <p style={{ color:'rgba(255,255,255,0.7)', fontSize:14, lineHeight:1.85, marginBottom:22, fontStyle:'italic' }}>"{r.text}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <img src={r.img} alt={r.name} style={{ width:44, height:44, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(200,146,42,0.4)' }}/>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color:'#fff' }}>{r.name}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>

      {cartOpen && <Cart items={cartItems} onClose={()=>setCartOpen(false)} onUpdateQty={handleUpdateQty} onRemove={handleRemove}/>}

      <style>{`@media(max-width:768px){.wrap{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}

export default App;

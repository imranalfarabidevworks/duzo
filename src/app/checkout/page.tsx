'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Truck, CheckCircle, Loader } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, discount, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const shipping = subtotal > 35 ? 0 : 4.99;

  const [form, setForm] = useState({ name: user?.name||'', email: user?.email||'', phone: '', street: '', city: '', state: '', zip: '', country: 'US' });
  const [payMethod, setPayMethod] = useState<'stripe'|'cod'>('stripe');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1=address, 2=payment

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
          shippingAddress: form,
          paymentMethod: payMethod,
          subtotal,
          discount,
          promoCode: '',
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Stripe redirect
      } else if (data.orderNumber) {
        clearCart();
        router.push(`/order-success?order=${data.orderNumber}&demo=${data.demo||false}`);
      } else {
        setError(data.error || 'Checkout failed');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  if (!items.length) return (
    <div style={{minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16}}>
      <p style={{color:'var(--text-s)',fontSize:18}}>Your cart is empty</p>
      <Link href="/" className="btn-gold" style={{textDecoration:'none'}}>Continue Shopping</Link>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'var(--dark)',padding:'24px 0 80px'}}>
      <div className="wrap" style={{maxWidth:1100,paddingTop:40}}>
        <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:8,color:'rgba(255,255,255,0.6)',textDecoration:'none',fontSize:14,marginBottom:32}}>
          <ArrowLeft size={16}/> Back to shop
        </Link>

        <h1 style={{fontSize:36,fontWeight:700,color:'#fff',marginBottom:40}}>Checkout</h1>

        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:32,alignItems:'start'}}>
          {/* Left - Form */}
          <div>
            {/* Shipping Address */}
            <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:20,padding:'28px 28px',marginBottom:24}}>
              <h2 style={{fontSize:20,fontWeight:700,color:'#fff',marginBottom:24,display:'flex',alignItems:'center',gap:10}}>
                <Truck size={20} color="var(--gold)"/> Shipping Address
              </h2>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                {[{k:'name',label:'Full Name',placeholder:'John Doe',full:true},{k:'email',label:'Email',placeholder:'john@email.com',type:'email',full:true},{k:'phone',label:'Phone',placeholder:'+1 234 567 8900',full:true},{k:'street',label:'Street Address',placeholder:'123 Main Street',full:true},{k:'city',label:'City',placeholder:'New York'},{k:'state',label:'State',placeholder:'NY'},{k:'zip',label:'ZIP Code',placeholder:'10001'},{k:'country',label:'Country',placeholder:'US'}].map(f=>(
                  <div key={f.k} style={{gridColumn:f.full?'1/-1':'auto'}}>
                    <label style={{fontSize:13,color:'var(--text-s)',display:'block',marginBottom:6}}>{f.label}</label>
                    <input className="input" type={f.type||'text'} value={(form as any)[f.k]} onChange={e=>update(f.k,e.target.value)} placeholder={f.placeholder} required/>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:20,padding:'28px 28px'}}>
              <h2 style={{fontSize:20,fontWeight:700,color:'#fff',marginBottom:24,display:'flex',alignItems:'center',gap:10}}>
                <CreditCard size={20} color="var(--gold)"/> Payment Method
              </h2>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                {[{id:'stripe',label:'Credit / Debit Card',icon:'💳',desc:'Visa, Mastercard, Amex'},{id:'cod',label:'Cash on Delivery',icon:'💵',desc:'Pay when you receive'}].map(m=>(
                  <button key={m.id} onClick={()=>setPayMethod(m.id as any)} style={{padding:'18px',borderRadius:14,border:`2px solid ${payMethod===m.id?'var(--gold)':'rgba(255,255,255,0.1)'}`,background:payMethod===m.id?'rgba(200,146,42,0.1)':'rgba(255,255,255,0.03)',cursor:'pointer',textAlign:'left',transition:'all 0.2s'}}>
                    <div style={{fontSize:28,marginBottom:8}}>{m.icon}</div>
                    <div style={{fontSize:14,fontWeight:600,color:'#fff',marginBottom:4}}>{m.label}</div>
                    <div style={{fontSize:12,color:'var(--text-m)'}}>{m.desc}</div>
                    {payMethod===m.id && <div style={{marginTop:8,color:'var(--gold)',fontSize:12,fontWeight:600}}>✓ Selected</div>}
                  </button>
                ))}
              </div>

              {payMethod==='stripe' && (
                <div style={{marginTop:20,padding:'16px',background:'rgba(200,146,42,0.06)',border:'1px solid rgba(200,146,42,0.15)',borderRadius:12}}>
                  <p style={{fontSize:13,color:'var(--gold)'}}>🔒 Secure payment via Stripe. Add your Stripe keys in <code>.env.local</code> to enable real card payments.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right - Order Summary */}
          <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:20,padding:'28px',position:'sticky',top:24}}>
            <h2 style={{fontSize:20,fontWeight:700,color:'#fff',marginBottom:24}}>Order Summary</h2>

            <div style={{maxHeight:280,overflowY:'auto',marginBottom:20}}>
              {items.map(item=>(
                <div key={item.id} style={{display:'flex',gap:12,marginBottom:14,alignItems:'center'}}>
                  <div style={{width:52,height:52,borderRadius:10,overflow:'hidden',flexShrink:0,border:'1px solid rgba(255,255,255,0.08)'}}>
                    <img src={item.image} alt={item.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:'#fff'}}>{item.name}</div>
                    <div style={{fontSize:12,color:'var(--text-m)'}}>x{item.quantity}</div>
                  </div>
                  <div style={{fontSize:14,fontWeight:600,color:'var(--gold)'}}>${(item.price*item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:16}}>
              {[{l:'Subtotal',v:`$${subtotal.toFixed(2)}`},{l:'Shipping',v:shipping===0?'FREE':`$${shipping.toFixed(2)}`},{l:'Discount',v:discount>0?`-$${discount.toFixed(2)}`:'-'}].map(row=>(
                <div key={row.l} style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                  <span style={{color:'var(--text-s)',fontSize:14}}>{row.l}</span>
                  <span style={{color:'#fff',fontSize:14,fontWeight:500}}>{row.v}</span>
                </div>
              ))}
              <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:14,marginTop:8}}>
                <span style={{fontSize:17,fontWeight:700,color:'#fff'}}>Total</span>
                <span style={{fontSize:24,fontWeight:800,fontFamily:'Playfair Display,serif',color:'var(--gold)'}}>${total.toFixed(2)}</span>
              </div>
            </div>

            {error && <div style={{marginTop:16,background:'rgba(255,80,80,0.1)',border:'1px solid rgba(255,80,80,0.2)',borderRadius:8,padding:'10px 14px',color:'#ff6b6b',fontSize:13}}>{error}</div>}

            {!user && (
              <div style={{marginTop:16,padding:'12px',background:'rgba(200,146,42,0.08)',border:'1px solid rgba(200,146,42,0.2)',borderRadius:10}}>
                <p style={{fontSize:13,color:'var(--gold)',marginBottom:8}}>Please sign in to complete your order</p>
                <Link href="/auth" className="btn-gold" style={{textDecoration:'none',fontSize:13,padding:'9px 18px'}}>Sign In</Link>
              </div>
            )}

            <button onClick={handleCheckout} disabled={loading||!user} className="btn-gold" style={{width:'100%',justifyContent:'center',padding:'16px',fontSize:16,marginTop:16,opacity:!user?0.5:1}}>
              {loading ? <><Loader size={16} style={{animation:'spin 1s linear infinite'}}/> Processing...</> : payMethod==='stripe' ? <><CreditCard size={16}/> Pay ${total.toFixed(2)}</> : <><CheckCircle size={16}/> Confirm Order</>}
            </button>

            <div style={{display:'flex',justifyContent:'center',gap:16,marginTop:16}}>
              {['🔒 SSL Secure','✓ Encrypted','🛡 Protected'].map(b=>(
                <span key={b} style={{fontSize:11,color:'var(--text-m)'}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const FALLBACK = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&q=60&auto=format&fit=crop';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, subtotal, total, discount, applyPromo } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');
  const shipping = subtotal > 35 ? 0 : (subtotal > 0 ? 4.99 : 0);

  if (!isOpen) return null;

  const handlePromo = () => {
    if (!promoInput.trim()) return;
    const err = applyPromo(promoInput);
    if (err) { setPromoError(err); setPromoApplied(''); }
    else { setPromoApplied(promoInput.toUpperCase()); setPromoError(''); setPromoInput(''); }
  };

  return (
    <>
      <div onClick={()=>setIsOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(4px)',zIndex:200}}/>
      <div style={{position:'fixed',top:0,right:0,bottom:0,width:420,maxWidth:'100vw',background:'rgba(10,20,10,0.98)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.08)',zIndex:201,display:'flex',flexDirection:'column',boxShadow:'-12px 0 48px rgba(0,0,0,0.5)',animation:'slideIn 0.3s ease'}}>

        {/* Header */}
        <div style={{padding:'22px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,borderRadius:12,background:'rgba(200,146,42,0.12)',border:'1px solid rgba(200,146,42,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <ShoppingBag size={18} color="var(--gold)"/>
            </div>
            <div>
              <h3 style={{fontSize:17,fontWeight:700,color:'#fff'}}>Your Cart</h3>
              <p style={{fontSize:12,color:'var(--text-m)'}}>{items.reduce((s,i)=>s+i.quantity,0)} items</p>
            </div>
          </div>
          <button onClick={()=>setIsOpen(false)} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'rgba(255,255,255,0.6)'}}>
            <X size={18}/>
          </button>
        </div>

        {/* Free shipping bar */}
        {subtotal > 0 && subtotal < 35 && (
          <div style={{padding:'12px 24px',background:'rgba(200,146,42,0.06)',borderBottom:'1px solid rgba(200,146,42,0.12)'}}>
            <p style={{fontSize:13,color:'var(--gold)',marginBottom:6}}>Add <strong>${(35-subtotal).toFixed(2)}</strong> more for FREE shipping!</p>
            <div style={{height:3,background:'rgba(200,146,42,0.15)',borderRadius:2,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${Math.min(100,(subtotal/35)*100)}%`,background:'linear-gradient(90deg,#c8922a,#e0a93a)',transition:'width 0.4s'}}/>
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{flex:1,overflowY:'auto',padding:'8px 24px'}}>
          {items.length === 0 ? (
            <div style={{textAlign:'center',padding:'80px 0',color:'var(--text-m)'}}>
              <ShoppingBag size={56} style={{marginBottom:16,opacity:0.2}}/>
              <p style={{fontSize:17,color:'var(--text-s)',marginBottom:8}}>Your cart is empty</p>
              <p style={{fontSize:13,marginBottom:20}}>Add some products to get started</p>
              <button onClick={()=>setIsOpen(false)} className="btn-gold">Continue Shopping</button>
            </div>
          ) : items.map(item=>(
            <div key={item.id} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
              <div style={{width:64,height:64,borderRadius:12,overflow:'hidden',flexShrink:0,border:'1px solid rgba(255,255,255,0.08)',background:'#1a2a1a'}}>
                <img src={item.image} alt={item.name} onError={(e)=>{(e.target as HTMLImageElement).src=FALLBACK;}} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:600,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.name}</div>
                <div style={{fontSize:12,color:'var(--text-m)',marginTop:2}}>{item.weight}</div>
                <div style={{fontSize:14,color:'var(--gold)',fontWeight:700,marginTop:4}}>${(item.price*item.quantity).toFixed(2)}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                <button onClick={()=>updateQty(item.id,-1)} style={{width:28,height:28,borderRadius:7,border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.04)',color:'rgba(255,255,255,0.7)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Minus size={12}/></button>
                <span style={{width:22,textAlign:'center',color:'#fff',fontSize:15,fontWeight:700}}>{item.quantity}</span>
                <button onClick={()=>updateQty(item.id,1)} style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,#c8922a,#e0a93a)',border:'none',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}><Plus size={12}/></button>
              </div>
              <button onClick={()=>removeItem(item.id)} style={{background:'none',border:'none',color:'var(--text-m)',cursor:'pointer',flexShrink:0,padding:4}}><X size={15}/></button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{padding:'20px 24px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            {/* Promo */}
            <div style={{marginBottom:16}}>
              <div style={{display:'flex',gap:8}}>
                <div style={{flex:1,display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.04)',border:`1px solid ${promoError?'rgba(255,80,80,0.4)':promoApplied?'rgba(76,175,80,0.4)':'rgba(255,255,255,0.1)'}`,borderRadius:8,padding:'0 12px'}}>
                  <Tag size={14} color="var(--text-m)"/>
                  <input value={promoInput} onChange={e=>setPromoInput(e.target.value)} placeholder="Promo code" onKeyDown={e=>e.key==='Enter'&&handlePromo()} style={{background:'none',border:'none',outline:'none',color:'#fff',fontSize:13,width:'100%',padding:'10px 0'}}/>
                </div>
                <button onClick={handlePromo} className="btn-glass" style={{padding:'0 16px',fontSize:13,whiteSpace:'nowrap'}}>Apply</button>
              </div>
              {promoError && <p style={{fontSize:12,color:'#ff6b6b',marginTop:6}}>✗ {promoError}</p>}
              {promoApplied && <p style={{fontSize:12,color:'#4caf50',marginTop:6}}>✓ {promoApplied} applied!</p>}
              <p style={{fontSize:11,color:'var(--text-m)',marginTop:6}}>Try: DUZO15 · WELCOME10 · ORGANIC20</p>
            </div>

            {/* Totals */}
            <div style={{marginBottom:16,padding:'14px',background:'rgba(255,255,255,0.03)',borderRadius:10,border:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <span style={{color:'var(--text-s)',fontSize:13}}>Subtotal</span>
                <span style={{color:'#fff',fontSize:13,fontWeight:500}}>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{color:'#4caf50',fontSize:13}}>Discount</span>
                  <span style={{color:'#4caf50',fontSize:13,fontWeight:500}}>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                <span style={{color:'var(--text-s)',fontSize:13}}>Shipping</span>
                <span style={{color:shipping===0?'#4caf50':'#fff',fontSize:13,fontWeight:500}}>{shipping===0?'FREE':'$'+shipping.toFixed(2)}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:12}}>
                <span style={{color:'#fff',fontSize:16,fontWeight:700}}>Total</span>
                <span style={{fontSize:22,fontWeight:800,fontFamily:'Playfair Display,serif',color:'var(--gold)'}}>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" onClick={()=>setIsOpen(false)} className="btn-gold" style={{width:'100%',justifyContent:'center',padding:'15px',fontSize:16,textDecoration:'none',display:'flex',boxSizing:'border-box'}}>
              Proceed to Checkout <ArrowRight size={16}/>
            </Link>
            <button onClick={()=>setIsOpen(false)} className="btn-glass" style={{width:'100%',justifyContent:'center',padding:'12px',fontSize:14,marginTop:10}}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
    </>
  );
}

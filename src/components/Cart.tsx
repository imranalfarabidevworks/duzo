import React from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Product } from './Products';

export interface CartItem extends Product { quantity: number; }

interface CartProps {
  items: CartItem[];
  onClose: ()=>void;
  onUpdateQty: (id:number, delta:number)=>void;
  onRemove: (id:number)=>void;
}

const Cart: React.FC<CartProps> = ({ items, onClose, onUpdateQty, onRemove }) => {
  const subtotal = items.reduce((s,i)=>s+i.price*i.quantity,0);
  const shipping = subtotal > 35 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <>
      <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.65)', backdropFilter:'blur(4px)', zIndex:200, animation:'fadeIn 0.25s ease' }}/>

      <div style={{
        position:'fixed', top:0, right:0, bottom:0, width:400, maxWidth:'100vw',
        background:'rgba(13,26,13,0.97)', backdropFilter:'blur(24px)',
        border:'1px solid rgba(255,255,255,0.08)', zIndex:201,
        display:'flex', flexDirection:'column',
        animation:'slideIn 0.3s ease',
        boxShadow:'-12px 0 48px rgba(0,0,0,0.5)'
      }}>
        {/* Header */}
        <div style={{ padding:'22px 24px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:'rgba(200,146,42,0.15)', border:'1px solid rgba(200,146,42,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <ShoppingBag size={18} color="var(--gold)"/>
            </div>
            <div>
              <h3 style={{ fontSize:17, fontWeight:700, color:'#fff' }}>Your Cart</h3>
              <p style={{ fontSize:12, color:'var(--text-muted)' }}>{items.length} {items.length===1?'item':'items'}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'rgba(255,255,255,0.6)' }}>
            <X size={18}/>
          </button>
        </div>

        {/* Free shipping bar */}
        {subtotal < 35 && (
          <div style={{ padding:'12px 24px', background:'rgba(200,146,42,0.08)', borderBottom:'1px solid rgba(200,146,42,0.15)' }}>
            <p style={{ fontSize:13, color:'var(--gold)' }}>
              Add <strong>${(35-subtotal).toFixed(2)}</strong> more for free shipping!
            </p>
            <div style={{ height:4, background:'rgba(200,146,42,0.15)', borderRadius:2, marginTop:8, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${Math.min(100,(subtotal/35)*100)}%`, background:'var(--gold)', borderRadius:2, transition:'width 0.4s' }}/>
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{ flex:1, overflowY:'auto', padding:'12px 24px' }}>
          {items.length===0 ? (
            <div style={{ textAlign:'center', padding:'72px 0', color:'var(--text-muted)' }}>
              <ShoppingBag size={52} style={{ marginBottom:16, opacity:0.3 }}/>
              <p style={{ fontSize:16, color:'var(--text-sec)' }}>Your cart is empty</p>
              <p style={{ fontSize:13, marginTop:8 }}>Add some products to get started</p>
            </div>
          ) : items.map(item=>(
            <div key={item.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width:60, height:60, borderRadius:12, overflow:'hidden', flexShrink:0, border:'1px solid rgba(255,255,255,0.08)' }}>
                <img src={item.img} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'#fff', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.name}</div>
                <div style={{ fontSize:13, color:'var(--gold)', fontWeight:700 }}>${item.price}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <button onClick={()=>onUpdateQty(item.id,-1)} style={{ width:28, height:28, borderRadius:7, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.04)', color:'rgba(255,255,255,0.7)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Minus size={12}/></button>
                <span style={{ width:22, textAlign:'center', color:'#fff', fontSize:15, fontWeight:700 }}>{item.quantity}</span>
                <button onClick={()=>onUpdateQty(item.id,1)} style={{ width:28, height:28, borderRadius:7, background:'linear-gradient(135deg,#c8922a,#e0a93a)', border:'none', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><Plus size={12}/></button>
              </div>
              <button onClick={()=>onRemove(item.id)} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', padding:4, flexShrink:0 }}><X size={15}/></button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length>0 && (
          <div style={{ padding:'20px 24px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            {/* Promo */}
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>
              <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, padding:'0 12px' }}>
                <Tag size={14} color="var(--text-muted)"/>
                <input placeholder="Promo code" style={{ background:'none', border:'none', outline:'none', color:'#fff', fontSize:13, width:'100%', padding:'10px 0' }}/>
              </div>
              <button className="btn-glass" style={{ padding:'0 16px', fontSize:13 }}>Apply</button>
            </div>

            {/* Totals */}
            <div style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <span style={{ color:'var(--text-sec)', fontSize:14 }}>Subtotal</span>
                <span style={{ color:'#fff', fontSize:14, fontWeight:600 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                <span style={{ color:'var(--text-sec)', fontSize:14 }}>Shipping</span>
                <span style={{ color: shipping===0 ? '#4caf50' : '#fff', fontSize:14, fontWeight:600 }}>{shipping===0?'FREE':'$'+shipping.toFixed(2)}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', padding:'14px 0', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color:'#fff', fontSize:17, fontWeight:700 }}>Total</span>
                <span style={{ fontSize:22, fontWeight:800, fontFamily:'Playfair Display,serif', color:'var(--gold)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn-gold" style={{ width:'100%', justifyContent:'center', padding:'15px', fontSize:16 }}>
              Checkout <ArrowRight size={16}/>
            </button>
            <button onClick={onClose} className="btn-glass" style={{ width:'100%', justifyContent:'center', padding:'13px', fontSize:15, marginTop:10 }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
      `}</style>
    </>
  );
};

export default Cart;

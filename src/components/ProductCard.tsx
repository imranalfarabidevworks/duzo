'use client';
import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [wish, setWish] = useState(false);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:`1px solid ${hovered?'rgba(200,146,42,0.4)':'rgba(255,255,255,0.09)'}`,borderRadius:20,overflow:'hidden',transition:'all 0.3s',transform:hovered?'translateY(-5px)':'none',boxShadow:hovered?'0 20px 48px rgba(0,0,0,0.35)':'none'}}
    >
      <div style={{position:'relative',height:210,overflow:'hidden'}}>
        <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',transform:hovered?'scale(1.07)':'scale(1)',transition:'transform 0.4s',filter:'brightness(0.85)'}}/>
        {product.badge && <div style={{position:'absolute',top:12,left:12,background:'linear-gradient(135deg,#c8922a,#e0a93a)',color:'#fff',fontSize:11,fontWeight:700,padding:'4px 12px',borderRadius:20,textTransform:'uppercase',letterSpacing:'0.06em'}}>{product.badge}</div>}
        <div style={{position:'absolute',top:10,right:10}}>
          <button onClick={()=>setWish(!wish)} style={{width:34,height:34,borderRadius:'50%',background:'rgba(0,0,0,0.55)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <Heart size={15} fill={wish?'#e74c3c':'none'} color={wish?'#e74c3c':'rgba(255,255,255,0.7)'}/>
          </button>
        </div>
      </div>
      <div style={{padding:'18px 20px 20px'}}>
        <p style={{color:'var(--gold)',fontSize:11,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:4,fontWeight:500}}>{product.category}</p>
        <h3 style={{fontSize:17,fontWeight:700,color:'#fff',marginBottom:4}}>{product.name}</h3>
        <p style={{color:'var(--text-s)',fontSize:12,marginBottom:10,lineHeight:1.5}}>{product.description}</p>
        <div style={{display:'flex',alignItems:'center',gap:3,marginBottom:14}}>
          {[...Array(5)].map((_,i)=><Star key={i} size={12} fill={i<Math.floor(product.rating)?'var(--gold)':'transparent'} color="var(--gold)"/>)}
          <span style={{fontSize:12,color:'var(--text-m)',marginLeft:4}}>({product.reviews})</span>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <span style={{fontSize:22,fontWeight:800,fontFamily:'Playfair Display,serif',color:'#fff'}}>${product.price}</span>
            {product.originalPrice && <span style={{fontSize:12,color:'var(--text-m)',textDecoration:'line-through',marginLeft:6}}>${product.originalPrice}</span>}
          </div>
          <button onClick={handleAdd} style={{background:added?'rgba(34,139,34,0.85)':'linear-gradient(135deg,#c8922a,#e0a93a)',border:'none',borderRadius:10,padding:'10px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:6,color:'#fff',fontSize:13,fontWeight:600,transition:'all 0.3s',boxShadow:added?'none':'0 4px 14px rgba(200,146,42,0.3)'}}>
            <ShoppingCart size={14}/> {added?'✓ Added':'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

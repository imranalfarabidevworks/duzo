import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  img: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  desc: string;
}

export const PRODUCTS: Product[] = [
  {
    id:1, name:'Medjool Dates', price:17.8, originalPrice:22,
    img:'https://i.ibb.co.com/XkvYTMxk/images-3.jpg',
    rating:4.9, reviews:312, badge:'Best Seller', category:'Dates',
    desc:'Premium jumbo dates, soft & caramel-rich'
  },
  {
    id:2, name:'Goji Berries', price:17.5, originalPrice:21,
    img:'https://i.ibb.co.com/KkV22X6/images-2.jpg',
    rating:4.7, reviews:189, badge:'New', category:'Berries',
    desc:'Sun-dried superfood berries from Tibet'
  },
  {
    id:3, name:'Dried Apricots', price:10.6,
    img:'https://images.unsplash.com/photo-1601004890657-3ef98f68fec0?w=400&q=80&auto=format&fit=crop',
    rating:4.5, reviews:97, category:'Fruits',
    desc:'Naturally sweet, no added sugar or sulfites'
  },
  {
    id:4, name:'Mixed Cashews', price:8.3,
    img:'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80&auto=format&fit=crop',
    rating:4.6, reviews:143, category:'Nuts',
    desc:'Whole roasted cashews, lightly salted'
  },
  {
    id:5, name:'Walnut Halves', price:14.9,
    img:'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80&auto=format&fit=crop',
    rating:4.8, reviews:256, badge:'Popular', category:'Nuts',
    desc:'Rich omega-3 walnuts, raw & unprocessed'
  },
  {
    id:6, name:'Dried Figs', price:12.4,
    img:'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=400&q=80&auto=format&fit=crop',
    rating:4.6, reviews:178, category:'Fruits',
    desc:'Turkish figs, naturally dried & chewy'
  },
  {
    id:7, name:'Blueberries', price:19.9, originalPrice:24,
    img:'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80&auto=format&fit=crop',
    rating:4.9, reviews:421, badge:'Premium', category:'Berries',
    desc:'Wild mountain blueberries, freeze-dried'
  },
  {
    id:8, name:'Almonds', price:16.5,
    img:'https://images.unsplash.com/photo-1574570068036-add3c9a491fd?w=400&q=80&auto=format&fit=crop',
    rating:4.7, reviews:203, category:'Nuts',
    desc:'California raw almonds, skin-on'
  },
];

const CATS = ['All','Dates','Berries','Nuts','Fruits'];

interface ProductsProps { onAddToCart: (p:Product)=>void; }

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [cat, setCat] = useState('All');
  const [wish, setWish] = useState<number[]>([]);
  const [addedId, setAddedId] = useState<number|null>(null);
  const [hoverId, setHoverId] = useState<number|null>(null);

  const filtered = cat==='All' ? PRODUCTS : PRODUCTS.filter(p=>p.category===cat);

  const handleAdd = (p:Product) => {
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(()=>setAddedId(null), 1400);
  };

  return (
    <section id="categories" style={{ padding:'96px 0', background:'var(--dark)' }}>
      <div className="wrap">
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <p style={{ color:'var(--gold)', fontSize:13, fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:14 }}>Our Collection</p>
          <h2 style={{ fontSize:'clamp(30px,4vw,48px)', fontWeight:700, color:'#fff', marginBottom:16 }}>Your Local Choice</h2>
          <p style={{ color:'var(--text-sec)', maxWidth:480, margin:'0 auto', fontSize:16 }}>Hand-picked from the finest farms worldwide. Every product carries our quality promise.</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:52 }}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setCat(c)} style={{
              padding:'9px 22px', borderRadius:24, border:'1px solid',
              borderColor: c===cat ? 'var(--gold)' : 'rgba(255,255,255,0.12)',
              background: c===cat ? 'linear-gradient(135deg,#c8922a,#e0a93a)' : 'rgba(255,255,255,0.05)',
              backdropFilter:'blur(8px)',
              color: c===cat ? '#fff' : 'rgba(255,255,255,0.65)',
              cursor:'pointer', fontSize:14, fontWeight:500,
              transition:'all 0.2s',
              boxShadow: c===cat ? '0 4px 14px rgba(200,146,42,0.3)' : 'none'
            }}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:24 }}>
          {filtered.map(p=>(
            <div key={p.id}
              onMouseEnter={()=>setHoverId(p.id)}
              onMouseLeave={()=>setHoverId(null)}
              style={{
                background:'rgba(255,255,255,0.05)',
                backdropFilter:'blur(20px)',
                border:`1px solid ${hoverId===p.id ? 'rgba(200,146,42,0.4)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius:20,
                overflow:'hidden',
                transition:'all 0.3s ease',
                transform: hoverId===p.id ? 'translateY(-6px)' : 'none',
                boxShadow: hoverId===p.id ? '0 16px 40px rgba(0,0,0,0.35)' : 'none',
              }}
            >
              {/* Image */}
              <div style={{ position:'relative', height:200, overflow:'hidden' }}>
                <img src={p.img} alt={p.name} style={{
                  width:'100%', height:'100%', objectFit:'cover',
                  transform: hoverId===p.id ? 'scale(1.06)' : 'scale(1)',
                  transition:'transform 0.4s ease',
                  filter:'brightness(0.88)'
                }}/>
                {/* Overlay on hover */}
                <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.15)', opacity: hoverId===p.id?1:0, transition:'opacity 0.3s' }}/>

                {p.badge && (
                  <div style={{ position:'absolute', top:12, left:12, background:'linear-gradient(135deg,#c8922a,#e0a93a)', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:20, letterSpacing:'0.06em', textTransform:'uppercase', boxShadow:'0 2px 8px rgba(200,146,42,0.4)' }}>{p.badge}</div>
                )}

                <div style={{ position:'absolute', top:10, right:10, display:'flex', flexDirection:'column', gap:8 }}>
                  <button onClick={()=>setWish(w=>w.includes(p.id)?w.filter(x=>x!==p.id):[...w,p.id])} style={{
                    width:34, height:34, borderRadius:'50%',
                    background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
                    border:'1px solid rgba(255,255,255,0.15)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer'
                  }}>
                    <Heart size={15} fill={wish.includes(p.id)?'#e74c3c':'none'} color={wish.includes(p.id)?'#e74c3c':'rgba(255,255,255,0.7)'}/>
                  </button>
                  <button style={{
                    width:34, height:34, borderRadius:'50%',
                    background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
                    border:'1px solid rgba(255,255,255,0.15)',
                    display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'
                  }}>
                    <Eye size={15} color="rgba(255,255,255,0.7)"/>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding:'18px 20px 20px' }}>
                <p style={{ color:'var(--gold)', fontSize:11, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:5, fontWeight:500 }}>{p.category}</p>
                <h3 style={{ fontSize:18, fontWeight:700, color:'#fff', marginBottom:5 }}>{p.name}</h3>
                <p style={{ color:'var(--text-sec)', fontSize:13, marginBottom:12, lineHeight:1.5 }}>{p.desc}</p>

                <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:16 }}>
                  {[...Array(5)].map((_,i)=><Star key={i} size={12} fill={i<Math.floor(p.rating)?'var(--gold)':'transparent'} color="var(--gold)"/>)}
                  <span style={{ fontSize:12, color:'var(--text-muted)', marginLeft:4 }}>({p.reviews})</span>
                </div>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <span style={{ fontSize:22, fontWeight:800, fontFamily:'Playfair Display,serif', color:'#fff' }}>${p.price}</span>
                    {p.originalPrice && <span style={{ fontSize:13, color:'var(--text-muted)', textDecoration:'line-through', marginLeft:8 }}>${p.originalPrice}</span>}
                  </div>
                  <button onClick={()=>handleAdd(p)} style={{
                    background: addedId===p.id ? 'rgba(34,139,34,0.8)' : 'linear-gradient(135deg,#c8922a,#e0a93a)',
                    border:'none', borderRadius:10,
                    padding:'10px 16px', cursor:'pointer',
                    display:'flex', alignItems:'center', gap:6,
                    color:'#fff', fontSize:13, fontWeight:600,
                    transition:'all 0.3s',
                    boxShadow: addedId===p.id ? 'none' : '0 4px 12px rgba(200,146,42,0.3)'
                  }}>
                    <ShoppingCart size={14}/>
                    {addedId===p.id ? '✓ Added' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

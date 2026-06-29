'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import { ArrowRight, Star, Truck, ShieldCheck, Leaf, RotateCcw, CheckCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);

  return (
    <main>
      <Navbar />
      <CartDrawer />

      {/* HERO */}
      <section style={{minHeight:'100vh',position:'relative',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:`url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1800&q=85&auto=format&fit=crop')`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.3)'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(13,26,13,0.9) 0%,rgba(13,26,13,0.4) 60%,rgba(13,26,13,0.65) 100%)'}}/>
        <div style={{position:'absolute',top:'15%',right:'10%',width:600,height:600,background:'radial-gradient(circle,rgba(200,146,42,0.1) 0%,transparent 65%)',pointerEvents:'none'}}/>

        <div className="wrap" style={{position:'relative',zIndex:2,paddingTop:100}}>
          <div style={{maxWidth:680,animation:'fadeUp 0.8s ease both'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:10,background:'rgba(200,146,42,0.12)',border:'1px solid rgba(200,146,42,0.28)',borderRadius:24,padding:'7px 18px',marginBottom:28}}>
              <span style={{width:7,height:7,borderRadius:'50%',background:'var(--gold)',display:'block'}}/>
              <span style={{color:'var(--gold)',fontSize:13,fontWeight:500,letterSpacing:'0.08em',textTransform:'uppercase'}}>100% Natural & Organic</span>
            </div>
            <h1 style={{fontSize:'clamp(40px,6vw,74px)',fontWeight:800,lineHeight:1.08,marginBottom:24,color:'#fff'}}>
              Dried Natural<br/>
              <span style={{background:'linear-gradient(90deg,#c8922a,#f0d060)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Crunchy Fruits</span>
            </h1>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:17,lineHeight:1.85,marginBottom:40,maxWidth:520}}>
              Hand-selected premium dried fruits & nuts from the world's finest farms. Naturally dried to lock in every nutrient and flavor.
            </p>
            <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:52}}>
              <a href="#categories" className="btn-gold" style={{fontSize:16,padding:'15px 36px'}}>Shop Now <ArrowRight size={17}/></a>
              <a href="#about" className="btn-glass" style={{fontSize:16,padding:'14px 32px'}}>Our Story</a>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{display:'flex'}}>
                {[...Array(5)].map((_,i)=><Star key={i} size={16} fill="var(--gold)" color="var(--gold)"/>)}
              </div>
              <span style={{color:'rgba(255,255,255,0.55)',fontSize:14}}>4.9 from 2,400+ happy customers</span>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,maxWidth:480,marginTop:64}}>
            {[{n:'50+',l:'Products'},{n:'12',l:'Countries'},{n:'98%',l:'Organic'}].map(s=>(
              <div key={s.n} className="glass" style={{padding:'20px 16px',textAlign:'center',borderRadius:16}}>
                <div style={{fontSize:30,fontWeight:800,fontFamily:'Playfair Display,serif',color:'var(--gold)'}}>{s.n}</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,0.45)',marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:6,opacity:0.4,animation:'float 2s ease-in-out infinite'}}>
          <span style={{fontSize:10,color:'#fff',letterSpacing:'0.1em',textTransform:'uppercase'}}>Scroll</span>
          <ChevronDown size={18} color="#fff"/>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{background:'rgba(255,255,255,0.025)',backdropFilter:'blur(20px)',borderTop:'1px solid rgba(255,255,255,0.07)',borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'28px 0'}}>
        <div className="wrap" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24}}>
          {[{Icon:Truck,t:'Free Shipping',d:'On orders over $35'},{Icon:ShieldCheck,t:'Secure Payment',d:'SSL encrypted checkout'},{Icon:Leaf,t:'Certified Organic',d:'Third-party verified'},{Icon:RotateCcw,t:'Easy Returns',d:'30-day guarantee'}].map(({Icon,t,d})=>(
            <div key={t} style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:46,height:46,borderRadius:12,background:'rgba(200,146,42,0.1)',border:'1px solid rgba(200,146,42,0.18)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <Icon size={20} color="var(--gold)"/>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>{t}</div>
                <div style={{fontSize:12,color:'var(--text-m)',marginTop:2}}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <section id="categories" style={{padding:'96px 0'}}>
        <div className="wrap">
          <div style={{textAlign:'center',marginBottom:52}}>
            <p style={{color:'var(--gold)',fontSize:13,fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Our Collection</p>
            <h2 style={{fontSize:'clamp(30px,4vw,48px)',fontWeight:700,color:'#fff',marginBottom:14}}>Your Local Choice</h2>
            <p style={{color:'var(--text-s)',maxWidth:480,margin:'0 auto',fontSize:16}}>Hand-picked from the finest farms worldwide. Every product carries our quality promise.</p>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginBottom:52}}>
            {CATEGORIES.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{padding:'9px 22px',borderRadius:24,border:'1px solid',borderColor:c===cat?'var(--gold)':'rgba(255,255,255,0.12)',background:c===cat?'linear-gradient(135deg,#c8922a,#e0a93a)':'rgba(255,255,255,0.05)',backdropFilter:'blur(8px)',color:c===cat?'#fff':'rgba(255,255,255,0.65)',cursor:'pointer',fontSize:14,fontWeight:500,transition:'all 0.2s',boxShadow:c===cat?'0 4px 14px rgba(200,146,42,0.3)':'none'}}>
                {c}
              </button>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:24}}>
            {filtered.map(p=><ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{padding:'96px 0',background:'rgba(255,255,255,0.015)'}}>
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:0,background:'rgba(255,255,255,0.045)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:24,overflow:'hidden',marginBottom:28}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:2}}>
              {['https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=300&q=75','https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&q=75','https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=75','https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=75'].map((src,i)=>(
                <div key={i} style={{height:210,overflow:'hidden'}}><img src={src+'&auto=format&fit=crop'} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.72)'}}/></div>
              ))}
            </div>
            <div style={{padding:'48px 44px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <p style={{color:'var(--gold)',fontSize:12,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:14}}>Chef's Pick</p>
              <h2 style={{fontSize:36,fontWeight:700,color:'#fff',lineHeight:1.2,marginBottom:18}}>Chef's Gourmet<br/>Choice Bundle</h2>
              <p style={{color:'var(--text-s)',fontSize:15,lineHeight:1.8,marginBottom:22}}>Curated by culinary experts — the world's finest dried fruits and nuts for gourmet cooking, healthy snacking, and premium gifting.</p>
              {['100% natural, zero additives','Certified organic farms','Rich in essential nutrients','Elegant gift packaging'].map(pt=>(
                <div key={pt} style={{display:'flex',alignItems:'center',gap:10,marginBottom:9}}>
                  <CheckCircle size={15} color="var(--gold)"/>
                  <span style={{color:'var(--text-s)',fontSize:14}}>{pt}</span>
                </div>
              ))}
              <a href="#categories" className="btn-gold" style={{marginTop:26,alignSelf:'flex-start',textDecoration:'none'}}>Order Bundle <ArrowRight size={16}/></a>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
            {[{img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80&auto=format&fit=crop',tag:'Seasonal',title:'Farm to Your Doorstep',desc:'Freshly harvested and carefully dried — our seasonal picks arrive at peak flavor.',cta:'Shop Seasonal'},
              {img:'https://images.unsplash.com/photo-1574570068036-add3c9a491fd?w=600&q=80&auto=format&fit=crop',tag:'Organic',title:'Certified Organic Range',desc:'Third-party certified purity — clean, natural nutrition you can trust every time.',cta:'Explore Organic'}
            ].map(card=>(
              <div key={card.tag} style={{borderRadius:20,overflow:'hidden',background:'rgba(255,255,255,0.045)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.09)',display:'grid',gridTemplateColumns:'1fr 1.1fr'}}>
                <div style={{minHeight:200,overflow:'hidden'}}><img src={card.img} alt={card.title} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.68)'}}/></div>
                <div style={{padding:'28px 24px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                  <p style={{color:'var(--gold)',fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>{card.tag}</p>
                  <h3 style={{fontSize:20,fontWeight:700,color:'#fff',lineHeight:1.3,marginBottom:12}}>{card.title}</h3>
                  <p style={{color:'var(--text-s)',fontSize:13,lineHeight:1.7,marginBottom:18}}>{card.desc}</p>
                  <a href="#categories" className="btn-gold" style={{padding:'9px 18px',fontSize:13,textDecoration:'none',alignSelf:'flex-start'}}>{card.cta} <ArrowRight size={13}/></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{padding:'96px 0'}}>
        <div className="wrap">
          <div style={{textAlign:'center',marginBottom:52}}>
            <p style={{color:'var(--gold)',fontSize:13,fontWeight:500,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Testimonials</p>
            <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:700,color:'#fff'}}>What Our Customers Say</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {[{name:'Sarah M.',role:'Health Coach',text:'Duzo has transformed my snacking habits. The medjool dates are incredible — rich, natural sweetness with zero additives.',img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop'},
              {name:'James T.',role:'Executive Chef',text:'As a professional chef, quality matters. Duzo delivers consistent premium produce that elevates every dish I create.',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop'},
              {name:'Amara O.',role:'Nutritionist',text:'I recommend Duzo to all my clients. Their organic certification is genuine and the nutrient density is exceptional.',img:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80&auto=format&fit=crop'}
            ].map(r=>(
              <div key={r.name} style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:20,padding:'28px 26px',transition:'border-color 0.3s',cursor:'default'}}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(200,146,42,0.35)'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.09)'}
              >
                <div style={{display:'flex',gap:2,marginBottom:14}}>
                  {[...Array(5)].map((_,i)=><Star key={i} size={14} fill="var(--gold)" color="var(--gold)"/>)}
                </div>
                <p style={{color:'rgba(255,255,255,0.68)',fontSize:14,lineHeight:1.85,marginBottom:22,fontStyle:'italic'}}>"{r.text}"</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <img src={r.img} alt={r.name} style={{width:44,height:44,borderRadius:'50%',objectFit:'cover',border:'2px solid rgba(200,146,42,0.4)'}}/>
                  <div>
                    <div style={{fontSize:15,fontWeight:700,color:'#fff'}}>{r.name}</div>
                    <div style={{fontSize:12,color:'var(--text-m)'}}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#060f06',borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:64}}>
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1fr',gap:48,paddingBottom:52}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                <div style={{background:'linear-gradient(135deg,#c8922a,#e0a93a)',borderRadius:'50%',width:34,height:34,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Leaf size={15} color="#fff"/>
                </div>
                <span style={{fontFamily:'Playfair Display,serif',fontSize:24,fontWeight:700,color:'#fff'}}>Duzo</span>
              </div>
              <p style={{color:'var(--text-s)',fontSize:13,lineHeight:1.85,marginBottom:20}}>Premium dried fruits and nuts, sourced from the world's finest farms. Pure nature in every bite.</p>
              <div style={{display:'flex',gap:4}}>
                {['Visa','Mastercard','PayPal','Apple Pay'].map(p=>(
                  <span key={p} style={{padding:'4px 10px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:6,fontSize:11,color:'var(--text-m)'}}>{p}</span>
                ))}
              </div>
            </div>
            {[{h:'Shop',l:['All Products','Dates','Berries','Nuts','Gift Bundles']},{h:'Company',l:['About Us','Blog','Careers','Press']},{h:'Support',l:['Help Center','Contact','Returns','Track Order']}].map(col=>(
              <div key={col.h}>
                <h4 style={{fontSize:14,fontWeight:700,color:'#fff',marginBottom:20}}>{col.h}</h4>
                {col.l.map(l=><a key={l} href="#" style={{display:'block',color:'var(--text-m)',textDecoration:'none',fontSize:13,marginBottom:12}}>{l}</a>)}
              </div>
            ))}
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'20px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <p style={{color:'var(--text-m)',fontSize:13}}>© 2026 Duzo. All rights reserved.</p>
            <div style={{display:'flex',gap:20}}>
              {['Privacy','Terms','Cookies'].map(l=><a key={l} href="#" style={{color:'var(--text-m)',textDecoration:'none',fontSize:13}}>{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

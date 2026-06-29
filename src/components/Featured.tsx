import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Featured: React.FC = () => {
  return (
    <section style={{ padding:'96px 0', background:'linear-gradient(180deg,var(--dark) 0%,var(--dark2) 100%)' }}>
      <div className="wrap">

        {/* Big feature card */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:0,
          background:'rgba(255,255,255,0.05)', backdropFilter:'blur(24px)',
          border:'1px solid rgba(255,255,255,0.1)', borderRadius:24,
          overflow:'hidden', marginBottom:28
        }}>
          {/* Image mosaic */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
            {[
              'https://images.unsplash.com/photo-1556105208-4640c70f1e7f?w=300&q=75&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1573848619717-c1aded7ff1e6?w=300&q=75&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=300&q=75&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&q=75&auto=format&fit=crop',
            ].map((src,i)=>(
              <div key={i} style={{ height:210, overflow:'hidden' }}>
                <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.75)' }}/>
              </div>
            ))}
          </div>
          {/* Content */}
          <div style={{ padding:'48px 44px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <p style={{ color:'var(--gold)', fontSize:12, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:16 }}>Chef's Pick</p>
            <h2 style={{ fontSize:36, fontWeight:700, color:'#fff', lineHeight:1.2, marginBottom:20 }}>Chef's Gourmet<br/>Choice Bundle</h2>
            <p style={{ color:'var(--text-sec)', fontSize:15, lineHeight:1.8, marginBottom:24 }}>
              Curated by culinary experts — the world's finest dried fruits and nuts for gourmet cooking, healthy snacking, and premium gifting.
            </p>
            {['100% natural, zero additives','Certified organic farms only','Rich in essential nutrients','Elegant gift packaging'].map(pt=>(
              <div key={pt} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <CheckCircle size={16} color="var(--gold)"/>
                <span style={{ color:'var(--text-sec)', fontSize:14 }}>{pt}</span>
              </div>
            ))}
            <button className="btn-gold" style={{ marginTop:28, alignSelf:'flex-start' }}>
              Order Bundle <ArrowRight size={16}/>
            </button>
          </div>
        </div>

        {/* Two promo cards */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          {[
            {
              img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80&auto=format&fit=crop',
              tag:'Seasonal', title:'Farm to Your Doorstep',
              desc:'Freshly harvested and carefully dried — our seasonal picks arrive at peak flavor.',
              cta:'Shop Seasonal'
            },
            {
              img:'https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=600&q=80&auto=format&fit=crop',
              tag:'Organic', title:'Certified Organic Range',
              desc:'Third-party certified purity — every product is clean, natural nutrition you can trust.',
              cta:'Explore Organic'
            }
          ].map(card=>(
            <div key={card.tag} style={{
              position:'relative', borderRadius:20, overflow:'hidden',
              background:'rgba(255,255,255,0.05)', backdropFilter:'blur(20px)',
              border:'1px solid rgba(255,255,255,0.1)',
              display:'grid', gridTemplateColumns:'1fr 1.1fr'
            }}>
              <div style={{ height:'100%', minHeight:200, overflow:'hidden' }}>
                <img src={card.img} alt={card.title} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.7)' }}/>
              </div>
              <div style={{ padding:'28px 24px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <p style={{ color:'var(--gold)', fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10 }}>{card.tag}</p>
                <h3 style={{ fontSize:20, fontWeight:700, color:'#fff', lineHeight:1.3, marginBottom:12 }}>{card.title}</h3>
                <p style={{ color:'var(--text-sec)', fontSize:13, lineHeight:1.7, marginBottom:18 }}>{card.desc}</p>
                <button className="btn-gold" style={{ padding:'9px 18px', fontSize:13 }}>
                  {card.cta} <ArrowRight size={13}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){
        section .wrap > div:first-child,
        section .wrap > div:last-child{grid-template-columns:1fr!important}
      }`}</style>
    </section>
  );
};

export default Featured;

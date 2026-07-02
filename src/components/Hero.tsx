import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=1600&q=80&auto=format&fit=crop';

const Hero: React.FC = () => {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  return (
    <section style={{ minHeight:'100vh', position:'relative', display:'flex', alignItems:'center', overflow:'hidden' }}>
      {/* BG Image */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`url(${HERO_BG})`,
        backgroundSize:'cover', backgroundPosition:'center',
        filter:'brightness(0.35)',
      }}/>
      {/* Gradient overlay */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(13,26,13,0.85) 0%, rgba(13,26,13,0.4) 60%, rgba(13,26,13,0.6) 100%)' }}/>
      {/* Gold glow */}
      <div style={{ position:'absolute', top:'20%', right:'15%', width:500, height:500, background:'radial-gradient(circle, rgba(200,146,42,0.12) 0%, transparent 65%)', pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative', zIndex:2, paddingTop:100, paddingBottom:60 }}>
        <div style={{ maxWidth:660, opacity:vis?1:0, transform:vis?'none':'translateY(32px)', transition:'all 0.8s ease' }}>
          {/* Tag */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(200,146,42,0.15)', border:'1px solid rgba(200,146,42,0.3)', borderRadius:24, padding:'6px 18px', marginBottom:28 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--gold)', display:'block' }}/>
            <span style={{ color:'var(--gold)', fontSize:13, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase' }}>100% Natural & Organic</span>
          </div>

          <h1 style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:800, lineHeight:1.1, marginBottom:24, color:'#fff' }}>
            Dried Natural<br />
            <span style={{ background:'linear-gradient(90deg,#c8922a,#e8c060)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Crunchy Fruits</span>
          </h1>

          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:17, lineHeight:1.85, marginBottom:40, maxWidth:520 }}>
            Hand-selected premium dried fruits & nuts from the world's finest farms — naturally dried to lock in every nutrient and flavor.
          </p>

       <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}>
  <button 
    className="btn-gold " 
    style={{ fontSize: 16, padding: '15px 36px', textDecoration: 'none' }}
  >
    Shop Now <ArrowRight size={17}/>
  </button>
  
  <button 
    className="btn-glass " 
    style={{ fontSize: 16, padding: '14px 32px', textDecoration: 'none' }}
  >
    Our Story
  </button>
</div>

          {/* Rating */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'flex' }}>
              {[...Array(5)].map((_,i) => <Star key={i} size={15} fill="var(--gold)" color="var(--gold)"/>)}
            </div>
            <span style={{ color:'rgba(255,255,255,0.55)', fontSize:14 }}>4.9 from 2,400+ happy customers</span>
          </div>
        </div>

        {/* Stats - glass cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, maxWidth:500, marginTop:64, opacity:vis?1:0, transition:'opacity 0.8s ease 0.3s' }}>
          {[{n:'50+',l:'Products'},{n:'12',l:'Countries'},{n:'98%',l:'Organic'}].map(s=>(
            <div key={s.n} className="glass" style={{ padding:'20px 16px', textAlign:'center' }}>
              <div style={{ fontSize:30, fontWeight:800, fontFamily:'Playfair Display,serif', color:'var(--gold)' }}>{s.n}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)', marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:0.5, animation:'floatAnim 2s ease-in-out infinite' }}>
        <span style={{ fontSize:11, color:'#fff', letterSpacing:'0.1em', textTransform:'uppercase' }}>Scroll</span>
        <ChevronDown size={18} color="#fff"/>
      </div>
    </section>
  );
};

export default Hero;

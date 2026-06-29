import React, { useState } from 'react';
import { Leaf, Share2, Users, MessageCircle, Play, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const sub = (e: React.FormEvent) => {
    e.preventDefault();
    if(email){ setDone(true); setEmail(''); }
  };

  return (
    <footer style={{ background:'#060f06', borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:72 }}>
      <div className="wrap">
        {/* Newsletter */}
        <div style={{
          background:'rgba(255,255,255,0.04)', backdropFilter:'blur(20px)',
          border:'1px solid rgba(200,146,42,0.2)', borderRadius:20,
          padding:'44px 52px', marginBottom:72,
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center'
        }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <Mail size={18} color="var(--gold)"/>
              <p style={{ color:'var(--gold)', fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>Newsletter</p>
            </div>
            <h3 style={{ fontSize:28, fontWeight:700, color:'#fff', marginBottom:8 }}>Get 15% Off Your First Order</h3>
            <p style={{ color:'var(--text-sec)', fontSize:15 }}>Exclusive deals, seasonal picks & health tips — no spam, ever.</p>
          </div>
          {done ? (
            <div style={{ color:'#4caf50', fontWeight:600, fontSize:16 }}>✓ Subscribed! Check your inbox.</div>
          ) : (
            <form onSubmit={sub} style={{ display:'flex', gap:12 }}>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" required
                style={{ flex:1, padding:'13px 18px', borderRadius:10, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.06)', backdropFilter:'blur(8px)', color:'#fff', fontSize:14, outline:'none' }}
              />
              <button type="submit" className="btn-gold" style={{ whiteSpace:'nowrap', padding:'0 24px' }}>Subscribe</button>
            </form>
          )}
        </div>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr', gap:48, paddingBottom:52 }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
              <div style={{ background:'linear-gradient(135deg,#c8922a,#e0a93a)', borderRadius:'50%', width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Leaf size={15} color="#fff"/>
              </div>
              <span style={{ fontFamily:'Playfair Display,serif', fontSize:24, fontWeight:700, color:'#fff' }}>Duzo</span>
            </div>
            <p style={{ color:'var(--text-sec)', fontSize:13, lineHeight:1.85, marginBottom:24 }}>
              Premium dried fruits and nuts, sourced from the world's finest farms and delivered straight to your door. Pure nature in every bite.
            </p>
            <div style={{ display:'flex', gap:4, marginBottom:20 }}>
              {[Share2,Users,MessageCircle,Play].map((Icon,i)=>(
                <button key={i} style={{ width:38, height:38, borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', backdropFilter:'blur(8px)', color:'var(--text-muted)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--gold)';(e.currentTarget as HTMLElement).style.color='var(--gold)';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.1)';(e.currentTarget as HTMLElement).style.color='var(--text-muted)';}}
                ><Icon size={15}/></button>
              ))}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <MapPin size={14} color="var(--gold)"/>
                <span style={{ fontSize:13, color:'var(--text-sec)' }}>123 Green Market, NY 10001</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Phone size={14} color="var(--gold)"/>
                <span style={{ fontSize:13, color:'var(--text-sec)' }}>+1 (800) 123-4567</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Mail size={14} color="var(--gold)"/>
                <span style={{ fontSize:13, color:'var(--text-sec)' }}>hello@duzo.com</span>
              </div>
            </div>
          </div>

          {/* Columns */}
          {[
            { h:'Information', links:['About Store','Product Detail','Order History','Return Policy','Shipping Info'] },
            { h:'Quick Support', links:['Contact Us','FAQ','Privacy Policy','Cookie Policy','Sitemap'] },
            { h:'Categories', links:['Dates & Figs','Mixed Nuts','Dried Berries','Dried Fruits','Gift Bundles'] },
          ].map(col=>(
            <div key={col.h}>
              <h4 style={{ fontSize:14, fontWeight:700, color:'#fff', marginBottom:22, letterSpacing:'0.03em' }}>{col.h}</h4>
              {col.links.map(l=>(
                <a key={l} href="#" style={{ display:'block', color:'var(--text-muted)', textDecoration:'none', fontSize:13, marginBottom:13, transition:'color 0.2s' }}
                  onMouseEnter={e=>(e.target as HTMLElement).style.color='var(--gold)'}
                  onMouseLeave={e=>(e.target as HTMLElement).style.color='var(--text-muted)'}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', padding:'20px 0', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <p style={{ color:'var(--text-muted)', fontSize:13 }}>© 2026 Duzo. All rights reserved.</p>
          <div style={{ display:'flex', gap:4 }}>
            {['Visa','Mastercard','PayPal','Apple Pay'].map(p=>(
              <span key={p} style={{ padding:'4px 12px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:6, fontSize:11, color:'var(--text-muted)' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){footer .wrap > div:nth-child(2){grid-template-columns:1fr 1fr!important}}@media(max-width:600px){footer .wrap > div:first-child{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
};

export default Footer;

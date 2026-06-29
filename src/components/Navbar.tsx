'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Leaf, User, LogOut, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background: scrolled ? 'rgba(13,26,13,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
      transition:'all 0.4s'
    }}>
      <div className="wrap" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 24px'}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <div style={{background:'linear-gradient(135deg,#c8922a,#e0a93a)',borderRadius:'50%',width:38,height:38,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 4px 14px rgba(200,146,42,0.4)'}}>
            <Leaf size={18} color="#fff"/>
          </div>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:26,fontWeight:700,color:'#fff'}}>Duzo</span>
        </Link>

        <div style={{display:'flex',gap:32,alignItems:'center'}} className="desk-nav">
          {[['Shop','/#categories'],['About','/#about'],['Orders','/orders']].map(([label,href])=>(
            <Link key={label} href={href} style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:14,fontWeight:500,transition:'color 0.2s'}}
              onMouseEnter={e=>(e.target as HTMLElement).style.color='#fff'}
              onMouseLeave={e=>(e.target as HTMLElement).style.color='rgba(255,255,255,0.7)'}
            >{label}</Link>
          ))}
        </div>

        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <button style={{background:'none',border:'none',color:'rgba(255,255,255,0.7)',cursor:'pointer'}}>
            <Search size={20}/>
          </button>
          <button onClick={()=>setIsOpen(true)} style={{background:'none',border:'none',color:'rgba(255,255,255,0.7)',cursor:'pointer',position:'relative'}}>
            <ShoppingCart size={20}/>
            {count>0 && <span style={{position:'absolute',top:-7,right:-7,background:'var(--gold)',color:'#fff',borderRadius:'50%',width:18,height:18,fontSize:11,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>{count}</span>}
          </button>

          {user ? (
            <div style={{position:'relative'}}>
              <button onClick={()=>setUserMenu(!userMenu)} style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,padding:'8px 14px',color:'#fff',cursor:'pointer'}}>
                <User size={16}/>
                <span style={{fontSize:13,fontWeight:500}}>{user.name.split(' ')[0]}</span>
              </button>
              {userMenu && (
                <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,background:'rgba(13,26,13,0.98)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:8,minWidth:180,zIndex:50}}>
                  <Link href="/orders" onClick={()=>setUserMenu(false)} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',color:'rgba(255,255,255,0.8)',textDecoration:'none',borderRadius:8,fontSize:14}}>
                    <Package size={15}/> My Orders
                  </Link>
                  <button onClick={()=>{logout();setUserMenu(false);}} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',color:'#ff6b6b',background:'none',border:'none',cursor:'pointer',width:'100%',borderRadius:8,fontSize:14}}>
                    <LogOut size={15}/> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" style={{}} className="btn-gold">Sign In</Link>
          )}
        </div>
      </div>

      <style>{`@media(max-width:768px){.desk-nav{display:none!important}}`}</style>
    </nav>
  );
}

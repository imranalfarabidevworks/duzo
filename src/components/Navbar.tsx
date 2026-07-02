'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Leaf, User, LogOut, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const goToSection = (id: string) => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };

  const navLinks = [
    { label: 'Home', action: () => { setMenuOpen(false); router.push('/'); } },
    { label: 'Shop', action: () => goToSection('categories') },
    { label: 'About', action: () => goToSection('about') },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(13,26,13,0.97)' : 'rgba(13,26,13,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'background 0.4s',
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ background: 'linear-gradient(135deg,#c8922a,#e0a93a)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(200,146,42,0.4)', flexShrink: 0 }}>
              <Leaf size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>Duzo</span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="nav-desktop">
            {navLinks.map(link => (
              <button key={link.label} onClick={link.action}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: '8px 16px', borderRadius: 8, transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)'; (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >{link.label}</button>
            ))}
            {user && (
              <Link href="/orders" style={{ color: pathname === '/orders' ? 'var(--gold)' : 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: 14, fontWeight: 500, padding: '8px 16px', borderRadius: 8 }}>
                Orders
              </Link>
            )}
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Cart */}
            <button onClick={() => setIsOpen(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', position: 'relative', padding: 6, display: 'flex' }}>
              <ShoppingCart size={20} />
              {count > 0 && (
                <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--gold)', color: '#fff', borderRadius: '50%', width: 17, height: 17, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{count > 9 ? '9+' : count}</span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div style={{ position: 'relative' }} className="nav-desktop">
                <button onClick={() => setUserMenu(!userMenu)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '7px 12px', color: '#fff', cursor: 'pointer' }}>
                  <User size={15} />
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{user.name.split(' ')[0]}</span>
                </button>
                {userMenu && (
                  <>
                    <div onClick={() => setUserMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'rgba(10,20,10,0.98)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 8, minWidth: 180, zIndex: 50 }}>
                      <Link href="/orders" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', borderRadius: 8, fontSize: 14 }}>
                        <Package size={15} /> My Orders
                      </Link>
                      <button onClick={() => { logout(); setUserMenu(false); router.push('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer', width: '100%', borderRadius: 8, fontSize: 14 }}>
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/auth" className="btn-gold nav-desktop" style={{ textDecoration: 'none', padding: '8px 18px', fontSize: 14 }}>Sign In</Link>
            )}

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', padding: 6, display: 'none' }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ background: 'rgba(10,20,10,0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '8px 0 16px' }}>
            {navLinks.map(link => (
              <button key={link.label} onClick={link.action} style={{ display: 'block', width: '100%', textAlign: 'left', color: 'rgba(255,255,255,0.85)', background: 'none', border: 'none', fontSize: 16, padding: '13px 24px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {link.label}
              </button>
            ))}
            {user ? (
              <>
                <Link href="/orders" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 16, padding: '13px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <Package size={16} /> My Orders
                </Link>
                <button onClick={() => { logout(); setMenuOpen(false); router.push('/'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', color: '#ff6b6b', background: 'none', border: 'none', fontSize: 16, padding: '13px 24px', cursor: 'pointer' }}>
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <div style={{ padding: '12px 24px' }}>
                <Link href="/auth" onClick={() => setMenuOpen(false)} className="btn-gold" style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', display: 'flex' }}>Sign In</Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (max-width: 900px) {
          .nav-desktop.btn-gold { display: none !important; }
        }
      `}</style>
    </>
  );
}

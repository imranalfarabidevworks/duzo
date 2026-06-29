'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Leaf, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [mode, setMode] = useState<'login'|'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const err = mode==='login' ? await login(email, password) : await register(name, email, password);
    setLoading(false);
    if (err) setError(err);
    else router.push('/');
  };

  return (
    <div style={{minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center',padding:24,position:'relative'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:`url('https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=1400&q=70&auto=format&fit=crop')`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.15)'}}/>
      <div style={{position:'absolute',inset:0,background:'rgba(13,26,13,0.8)'}}/>

      <div style={{position:'relative',zIndex:2,width:'100%',maxWidth:420}}>
        <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:8,color:'rgba(255,255,255,0.6)',textDecoration:'none',fontSize:14,marginBottom:32}}>
          <ArrowLeft size={16}/> Back to store
        </Link>

        <div style={{background:'rgba(255,255,255,0.06)',backdropFilter:'blur(24px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:24,padding:'40px 36px'}}>
          <div style={{textAlign:'center',marginBottom:32}}>
            <div style={{width:52,height:52,borderRadius:'50%',background:'linear-gradient(135deg,#c8922a,#e0a93a)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',boxShadow:'0 6px 20px rgba(200,146,42,0.35)'}}>
              <Leaf size={24} color="#fff"/>
            </div>
            <h1 style={{fontSize:26,fontWeight:700,color:'#fff',marginBottom:6}}>{mode==='login'?'Welcome Back':'Create Account'}</h1>
            <p style={{color:'var(--text-s)',fontSize:14}}>{mode==='login'?'Sign in to your Duzo account':'Join the Duzo community today'}</p>
          </div>

          {/* Toggle */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',background:'rgba(255,255,255,0.04)',borderRadius:12,padding:4,marginBottom:28}}>
            {(['login','register'] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} style={{padding:'10px',borderRadius:9,border:'none',background:mode===m?'linear-gradient(135deg,#c8922a,#e0a93a)':'transparent',color:mode===m?'#fff':'rgba(255,255,255,0.5)',fontSize:14,fontWeight:600,cursor:'pointer',transition:'all 0.2s'}}>
                {m==='login'?'Sign In':'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {mode==='register' && (
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,color:'var(--text-s)',display:'block',marginBottom:6}}>Full Name</label>
                <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name" required/>
              </div>
            )}
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,color:'var(--text-s)',display:'block',marginBottom:6}}>Email</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" required/>
            </div>
            <div style={{marginBottom:24,position:'relative'}}>
              <label style={{fontSize:13,color:'var(--text-s)',display:'block',marginBottom:6}}>Password</label>
              <input className="input" type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 6 characters" required style={{paddingRight:44}}/>
              <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:14,top:34,background:'none',border:'none',color:'var(--text-m)',cursor:'pointer'}}>
                {showPw?<EyeOff size={16}/>:<Eye size={16}/>}
              </button>
            </div>
            {error && <div style={{background:'rgba(255,80,80,0.1)',border:'1px solid rgba(255,80,80,0.2)',borderRadius:8,padding:'10px 14px',color:'#ff6b6b',fontSize:13,marginBottom:16}}>{error}</div>}
            <button type="submit" disabled={loading} className="btn-gold" style={{width:'100%',justifyContent:'center',padding:'15px',fontSize:16}}>
              {loading ? 'Please wait...' : mode==='login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p style={{textAlign:'center',color:'var(--text-m)',fontSize:13,marginTop:20}}>
            {mode==='login'?'No account? ':'Already have an account? '}
            <button onClick={()=>setMode(mode==='login'?'register':'login')} style={{background:'none',border:'none',color:'var(--gold)',cursor:'pointer',fontSize:13,fontWeight:600}}>{mode==='login'?'Create one':'Sign in</button>'}</button>
          </p>
        </div>
      </div>
    </div>
  );
}

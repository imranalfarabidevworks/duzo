'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const params = useSearchParams();
  const orderNum = params.get('order');
  const isDemo = params.get('demo') === 'true';

  return (
    <div style={{minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{textAlign:'center',maxWidth:520}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(76,175,80,0.15)',border:'2px solid #4caf50',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',animation:'fadeUp 0.6s ease'}}>
          <CheckCircle size={40} color="#4caf50"/>
        </div>
        <h1 style={{fontSize:36,fontWeight:800,color:'#fff',marginBottom:12}}>Order Placed! 🎉</h1>
        {orderNum && <p style={{fontSize:18,color:'var(--gold)',fontWeight:600,marginBottom:16}}>Order #{orderNum}</p>}
        <p style={{color:'var(--text-s)',fontSize:16,lineHeight:1.7,marginBottom:32}}>
          Thank you for your order! {isDemo ? 'This is a demo — add your Stripe keys to enable real payments.' : 'We\'ll send a confirmation email shortly. Your package will arrive in 3-5 business days.'}
        </p>
        {isDemo && (
          <div style={{background:'rgba(200,146,42,0.08)',border:'1px solid rgba(200,146,42,0.2)',borderRadius:12,padding:'16px 20px',marginBottom:24,textAlign:'left'}}>
            <p style={{color:'var(--gold)',fontSize:14,fontWeight:600,marginBottom:8}}>🚀 Enable Real Payments:</p>
            <p style={{color:'var(--text-s)',fontSize:13,lineHeight:1.7}}>Add your Stripe keys to <code style={{background:'rgba(255,255,255,0.08)',padding:'2px 6px',borderRadius:4,fontSize:12}}>.env.local</code> and the checkout will redirect to Stripe's secure payment page.</p>
          </div>
        )}
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/orders" style={{}} className="btn-gold">
            <Package size={16}/> View Orders <ArrowRight size={16}/>
          </Link>
          <Link href="/" className="btn-glass" style={{textDecoration:'none'}}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return <Suspense fallback={<div style={{minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'var(--text-s)'}}>Loading...</p></div>}><SuccessContent/></Suspense>;
}

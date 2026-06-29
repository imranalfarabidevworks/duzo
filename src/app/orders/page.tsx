'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Package, ArrowLeft, Clock, CheckCircle, Truck } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending: '#f0a030',
  confirmed: '#4caf50',
  processing: '#2196f3',
  shipped: '#9c27b0',
  delivered: '#4caf50',
  cancelled: '#f44336',
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock size={14}/>,
  confirmed: <CheckCircle size={14}/>,
  shipped: <Truck size={14}/>,
  delivered: <CheckCircle size={14}/>,
};

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/orders').then(r=>r.json()).then(d=>{ setOrders(d.orders||[]); setFetching(false); });
    }
  }, [user]);

  if (loading || fetching) return (
    <div style={{minHeight:'100vh',background:'var(--dark)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <p style={{color:'var(--text-s)'}}>Loading orders...</p>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:'var(--dark)',padding:'40px 0 80px'}}>
      <div className="wrap" style={{maxWidth:860}}>
        <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:8,color:'rgba(255,255,255,0.6)',textDecoration:'none',fontSize:14,marginBottom:32}}>
          <ArrowLeft size={16}/> Back to shop
        </Link>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:40}}>
          <Package size={28} color="var(--gold)"/>
          <h1 style={{fontSize:32,fontWeight:700,color:'#fff'}}>My Orders</h1>
        </div>

        {orders.length===0 ? (
          <div style={{textAlign:'center',padding:'80px 0'}}>
            <Package size={56} style={{marginBottom:16,opacity:0.25,color:'var(--text-s)'}}/>
            <p style={{color:'var(--text-s)',fontSize:18,marginBottom:16}}>No orders yet</p>
            <Link href="/" className="btn-gold" style={{textDecoration:'none'}}>Start Shopping</Link>
          </div>
        ) : orders.map((order: any)=>(
          <div key={order._id} style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:20,padding:'24px 28px',marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20,flexWrap:'wrap',gap:12}}>
              <div>
                <p style={{fontSize:18,fontWeight:700,color:'#fff',marginBottom:4}}>Order #{order.orderNumber}</p>
                <p style={{fontSize:13,color:'var(--text-m)'}}>{new Date(order.createdAt).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</p>
              </div>
              <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:20,background:`${STATUS_COLORS[order.status]}18`,border:`1px solid ${STATUS_COLORS[order.status]}40`,color:STATUS_COLORS[order.status],fontSize:13,fontWeight:600,textTransform:'capitalize'}}>
                  {STATUS_ICONS[order.status]||<Clock size={14}/>} {order.status}
                </span>
                <span style={{padding:'6px 14px',borderRadius:20,background:'rgba(200,146,42,0.1)',border:'1px solid rgba(200,146,42,0.2)',color:'var(--gold)',fontSize:13,fontWeight:600}}>
                  {order.payment.method==='cod'?'Cash on Delivery':'Card Payment'}
                </span>
              </div>
            </div>

            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:20}}>
              {order.items.map((item: any, i: number)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12,padding:'10px 14px'}}>
                  {item.image && <img src={item.image} alt={item.name} style={{width:36,height:36,borderRadius:8,objectFit:'cover'}}/>}
                  <div>
                    <p style={{fontSize:13,fontWeight:600,color:'#fff'}}>{item.name}</p>
                    <p style={{fontSize:12,color:'var(--text-m)'}}>x{item.quantity} · ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:16,alignItems:'center',flexWrap:'wrap',gap:12}}>
              <div>
                <p style={{fontSize:13,color:'var(--text-m)',marginBottom:2}}>Ship to: {order.shippingAddress.name}</p>
                <p style={{fontSize:13,color:'var(--text-m)'}}>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              </div>
              <div style={{textAlign:'right'}}>
                <p style={{fontSize:13,color:'var(--text-m)',marginBottom:2}}>Total</p>
                <p style={{fontSize:22,fontWeight:800,fontFamily:'Playfair Display,serif',color:'var(--gold)'}}>${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

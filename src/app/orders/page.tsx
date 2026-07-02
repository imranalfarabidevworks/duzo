'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Package, ArrowLeft, Clock, CheckCircle, Truck, ShoppingBag } from 'lucide-react';

const STATUS_COLOR: Record<string, string> = {
  pending: '#f0a030', confirmed: '#4caf50', processing: '#2196f3',
  shipped: '#9c27b0', delivered: '#4caf50', cancelled: '#f44336',
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
      fetch('/api/orders')
        .then(r => r.json())
        .then(d => { setOrders(d.orders || []); setFetching(false); })
        .catch(() => setFetching(false));
    }
  }, [user]);

  if (loading || fetching) return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(200,146,42,0.3)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--text-s)' }}>Loading orders...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', padding: '20px 0 80px' }}>
      <div className="wrap" style={{ maxWidth: 860, paddingTop: 80 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back to shop
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <Package size={26} color="var(--gold)" />
          <div>
            <h1 style={{ fontSize: 'clamp(22px,4vw,30px)', fontWeight: 700, color: '#fff' }}>My Orders</h1>
            <p style={{ fontSize: 13, color: 'var(--text-m)', marginTop: 2 }}>Hello, {user?.name} 👋</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '72px 0' }}>
            <ShoppingBag size={56} style={{ marginBottom: 16, opacity: 0.2, color: 'var(--text-s)', display: 'block', margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-s)', fontSize: 18, marginBottom: 8 }}>No orders yet</p>
            <p style={{ color: 'var(--text-m)', fontSize: 14, marginBottom: 24 }}>Start shopping to see your orders here</p>
            <Link href="/" className="btn-gold" style={{ textDecoration: 'none' }}>Start Shopping</Link>
          </div>
        ) : orders.map((order: any) => (
          <div key={order._id} style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 18, padding: 'clamp(18px,4vw,26px)', marginBottom: 18 }}>
            {/* Order header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ fontSize: 'clamp(15px,3vw,18px)', fontWeight: 700, color: '#fff', marginBottom: 4 }}>Order #{order.orderNumber}</p>
                <p style={{ fontSize: 12, color: 'var(--text-m)' }}>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 20, background: `${STATUS_COLOR[order.status] || '#888'}18`, border: `1px solid ${STATUS_COLOR[order.status] || '#888'}40`, color: STATUS_COLOR[order.status] || '#888', fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
                  {order.status === 'pending' ? <Clock size={12} /> : order.status === 'shipped' ? <Truck size={12} /> : <CheckCircle size={12} />}
                  {order.status}
                </span>
                <span style={{ padding: '5px 12px', borderRadius: 20, background: 'rgba(200,146,42,0.1)', border: '1px solid rgba(200,146,42,0.2)', color: 'var(--gold)', fontSize: 12, fontWeight: 600 }}>
                  {order.payment?.method === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
                </span>
              </div>
            </div>

            {/* Items */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
              {order.items?.map((item: any, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '9px 12px', minWidth: 0 }}>
                  {item.image && (
                    <img src={item.image} alt={item.name} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=60&q=60'; }} style={{ width: 34, height: 34, borderRadius: 7, objectFit: 'cover', flexShrink: 0 }} />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-m)' }}>x{item.quantity} · ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-m)', marginBottom: 2 }}>Ship to: {order.shippingAddress?.name}</p>
                <p style={{ fontSize: 12, color: 'var(--text-m)' }}>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 11, color: 'var(--text-m)', marginBottom: 2 }}>Total</p>
                <p style={{ fontSize: 'clamp(18px,3vw,22px)', fontWeight: 800, fontFamily: 'Playfair Display,serif', color: 'var(--gold)' }}>${order.total?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

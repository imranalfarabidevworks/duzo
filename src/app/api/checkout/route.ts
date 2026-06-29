import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Please login to checkout' }, { status: 401 });
    }

    const { items, shippingAddress, paymentMethod, subtotal, discount, promoCode } = await req.json();

    if (!items?.length || !shippingAddress) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    const shippingCost = subtotal > 35 ? 0 : 4.99;
    const total = subtotal - (discount || 0) + shippingCost;

    await connectDB();

    // For Stripe payment
    if (paymentMethod === 'stripe') {
      // Check if Stripe is configured
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey || stripeKey.includes('YOUR_')) {
        // Create pending order without Stripe (demo mode)
        const order = await Order.create({
          userId: session.userId,
          items: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category,
          })),
          shippingAddress,
          payment: { method: 'stripe', status: 'pending' },
          subtotal,
          shippingCost,
          discount: discount || 0,
          total,
          promoCode,
          status: 'pending',
        });

        return NextResponse.json({
          success: true,
          orderId: order._id,
          orderNumber: order.orderNumber,
          message: 'Order placed! (Stripe not configured - demo mode)',
          demo: true,
        });
      }

      // Real Stripe flow
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeKey);

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name, images: [item.image] },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        metadata: {
          userId: session.userId,
          shippingAddress: JSON.stringify(shippingAddress),
          promoCode: promoCode || '',
          subtotal: subtotal.toString(),
          discount: (discount || 0).toString(),
        },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      });

      return NextResponse.json({ url: stripeSession.url, sessionId: stripeSession.id });
    }

    // Cash on Delivery
    const order = await Order.create({
      userId: session.userId,
      items: items.map((item: any) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
      })),
      shippingAddress,
      payment: { method: 'cod', status: 'pending' },
      subtotal,
      shippingCost,
      discount: discount || 0,
      total,
      promoCode,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });

    return NextResponse.json({
      success: true,
      orderId: order._id,
      orderNumber: order.orderNumber,
    });

  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}

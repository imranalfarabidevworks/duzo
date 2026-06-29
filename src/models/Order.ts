import mongoose, { Schema, Document, CallbackWithoutResultAndOptionalError } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  orderNumber: string;
  items: Array<{ productId: string; name: string; price: number; quantity: number; image: string; category: string }>;
  shippingAddress: { name: string; email: string; phone: string; street: string; city: string; state: string; zip: string; country: string };
  payment: { method: string; status: string; stripeSessionId?: string };
  status: string;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  promoCode?: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderNumber: { type: String, unique: true },
  items: [{ productId: String, name: String, price: Number, quantity: Number, image: String, category: String }],
  shippingAddress: { name: String, email: String, phone: String, street: String, city: String, state: String, zip: String, country: { type: String, default: 'US' } },
  payment: { method: { type: String, default: 'stripe' }, status: { type: String, default: 'pending' }, stripeSessionId: String },
  status: { type: String, default: 'pending' },
  subtotal: Number,
  shippingCost: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: Number,
  promoCode: String,
}, { timestamps: true });

OrderSchema.pre('save', async function(this: IOrder) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `DZ-${String(count + 1001).padStart(5, '0')}`;
  }
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

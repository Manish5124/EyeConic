'use client';
import { useCartWishlist } from '../../context/CartWishlistContext';
import coupons from '../../data/coupons';
import storeConfig from '../../data/config';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Gift, ShieldCheck, Check, User, MapPin, CreditCard, Tag, ChevronRight, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

// Helper to safely parse prices like "₹1,399" or 1399
const parsePrice = (priceVal: any): number => {
  if (typeof priceVal === 'number') return priceVal;
  if (!priceVal) return 0;
  const clean = String(priceVal).replace(/[^0-9.]/g, '');
  return parseFloat(clean) || 0;
};

// Steps
type Step = 'cart' | 'checkout' | 'success';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartWishlist() as any;
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>('cart');

  // Coupon state
  const [promoCode, setPromoCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Checkout form
  const [form, setForm] = useState({ name: '', address: '', pincode: '', txnId: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Order confirmation state
  const [orderDetails, setOrderDetails] = useState<{ orderId: string; total: number } | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => { setMounted(true); }, []);

  // Calculations
  const subtotal: number = cart ? cart.reduce((sum: number, item: any) => sum + (parsePrice(item.product.price) * item.quantity), 0) : 0;
  const shippingFee = subtotal >= 2000 || subtotal === 0 ? 0 : 150;
  const discountAmt = appliedCoupon ? Math.round(subtotal * appliedCoupon.discount) : 0;
  const totalPayable = subtotal + shippingFee - discountAmt;

  const handleApplyPromo = (e: any) => {
    e.preventDefault();
    setPromoError('');
    const found = coupons.find((c: any) => c.code === promoCode.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      setPromoError('');
    } else {
      setPromoError(`Invalid code. Try: ${coupons.map((c: any) => c.code).join(', ')}`);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.address.trim()) errs.address = 'Delivery address is required.';
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = 'Enter a valid 6-digit pincode.';
    if (!form.txnId.trim()) errs.txnId = 'Transaction ID is required after payment.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    const orderId = `TEC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Construct the WhatsApp message
    const itemsText = cart.map((item: any) => 
      `- ${item.product.name} (Qty: ${item.quantity}, Color: ${item.color}) - ₹${(parsePrice(item.product.price) * item.quantity).toLocaleString('en-IN')}`
    ).join('\n');

    const message = `🛍️ *New Order from ${storeConfig.storeName || 'TheEyeConic'}*
----------------------------------
*Order ID:* #${orderId}
*Customer Name:* ${form.name}
*Delivery Address:* ${form.address}
*Pincode:* ${form.pincode}

*Items Ordered:*
${itemsText}

*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}
*Shipping:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
${appliedCoupon ? `*Discount (${appliedCoupon.code}):* -₹${discountAmt.toLocaleString('en-IN')}\n` : ''}*Total Paid:* ₹${totalPayable.toLocaleString('en-IN')}

*Payment Details:*
*Transaction/UTR ID:* ${form.txnId}
----------------------------------
Thank you for shopping with us!`;

    const url = `https://api.whatsapp.com/send?phone=${storeConfig.whatsappNumber}&text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);

    // Redirect to WhatsApp
    window.open(url, '_blank');

    setOrderDetails({ orderId, total: totalPayable });
    setStep('success');
    setTimeout(() => { clearCart(); }, 2000);
  };

  if (!mounted) {
    return (
      <div className="loading-wrap">
        <p>Loading...</p>
        <style jsx>{`.loading-wrap{display:flex;align-items:center;justify-content:center;min-height:70vh;font-size:15px;color:var(--text-secondary);}`}</style>
      </div>
    );
  }

  // ─── SUCCESS ──────────────────────────────────────────────────────
  if (step === 'success' && orderDetails) {
    return (
      <main className="cart-page success-view">
        <div className="success-card">
          <div className="success-icon-wrap">
            <Check size={48} strokeWidth={2.5} />
          </div>
          <h1 className="success-title">Order Confirmed! 🎉</h1>
          <p className="success-desc">
            Thank you, <strong>{form.name}</strong>! Your order has been placed successfully. We'll dispatch your eyewear soon.
          </p>
          <div className="success-details">
            <div className="detail-row"><span>Order ID</span><strong>#{orderDetails.orderId}</strong></div>
            <div className="detail-row"><span>Delivering to</span><strong>{form.address}, {form.pincode}</strong></div>
            <div className="detail-row"><span>Amount Paid</span><strong>₹{orderDetails.total.toLocaleString('en-IN')}</strong></div>
            <div className="detail-row"><span>Transaction ID</span><strong>{form.txnId}</strong></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            {whatsappUrl && (
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  background: '#25D366', 
                  color: '#fff', 
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  cursor: 'pointer'
                }}
              >
                <Phone size={16} /> Send via WhatsApp
              </a>
            )}
            <Link href="/products" className="btn btn-primary" style={{ gap: '8px', justifyContent: 'center' }}>
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <style jsx>{`
          .success-view { display:flex; align-items:center; justify-content:center; min-height:85vh; padding:120px 20px; background:var(--bg); }
          .success-card { text-align:center; max-width:520px; width:100%; padding:48px 32px; background:var(--card-bg); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow-lg); }
          .success-icon-wrap { display:inline-flex; align-items:center; justify-content:center; width:80px; height:80px; border-radius:50%; background:#dcfce7; color:#16a34a; margin-bottom:24px; animation:scaleUp 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
          @keyframes scaleUp { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
          .success-title { font-size:26px; font-weight:700; margin-bottom:12px; color:var(--text); }
          .success-desc { font-size:14px; color:var(--text-secondary); margin-bottom:24px; line-height:1.7; }
          .success-details { background:var(--bg-secondary); border:1px solid var(--border); border-radius:var(--radius-md); padding:20px; margin-bottom:32px; text-align:left; }
          .detail-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border); font-size:13px; color:var(--text-secondary); }
          .detail-row:last-child { border-bottom:none; }
          .detail-row strong { color:var(--text); font-size:13px; }
        `}</style>
      </main>
    );
  }

  // ─── CHECKOUT FORM ────────────────────────────────────────────────
  if (step === 'checkout') {
    return (
      <main className="cart-page">
        <div className="page-hero">
          <div className="hero-content">
            <span className="section-label">STEP 2 OF 2</span>
            <h1 className="page-title">Delivery & <strong>Payment</strong></h1>
            <p className="page-desc">Fill in your details and complete your PhonePe payment below.</p>
          </div>
        </div>

        <div className="container checkout-layout">
          {/* Left: Form */}
          <div className="checkout-form-section">
            {/* Delivery Details */}
            <div className="form-card">
              <div className="form-card-title">
                <User size={18} />
                <h2>Delivery Details</h2>
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Manish Kumar"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className={errors.name ? 'input-error' : ''}
                  id="checkout-name"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Full Delivery Address *</label>
                <textarea
                  placeholder="House No., Street, Area, City, State"
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className={errors.address ? 'input-error' : ''}
                  rows={3}
                  id="checkout-address"
                />
                {errors.address && <span className="error-msg">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  placeholder="6-digit pincode"
                  value={form.pincode}
                  onChange={e => setForm({ ...form, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  className={errors.pincode ? 'input-error' : ''}
                  maxLength={6}
                  id="checkout-pincode"
                />
                {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
              </div>
            </div>

            {/* PhonePe Payment Card */}
            <div className="form-card phonepe-card">
              <div className="form-card-title">
                <Phone size={18} />
                <h2>Pay via PhonePe</h2>
              </div>

              <div className="phonepe-inner">
                <div className="phonepe-left">
                  <div className="phonepe-qr-wrap">
                    <img src="/phonepe-qr.jpg" alt="PhonePe QR Code" className="qr-img" />
                  </div>
                  <div className="phonepe-brand">
                    <span className="pp-logo">Ph</span><span className="pp-logo-blue">one</span><span className="pp-logo">Pe</span>
                  </div>
                </div>

                <div className="phonepe-right">
                  <p className="pp-instruction">Scan this QR code with any UPI app to pay</p>
                  <div className="pp-amount-box">
                    <span className="pp-amount-label">Amount Payable</span>
                    <span className="pp-amount">₹{totalPayable.toLocaleString('en-IN')}</span>
                    {appliedCoupon && (
                      <span className="pp-saving">You save ₹{discountAmt.toLocaleString('en-IN')} with {appliedCoupon.code}!</span>
                    )}
                  </div>
                  <div className="pp-upi-id">
                    <span className="pp-upi-label">UPI ID</span>
                    <code className="pp-upi-val">theeyeconic@phonepe</code>
                  </div>
                  <div className="pp-steps">
                    <div className="pp-step"><span>1</span> Open PhonePe / GPay / Paytm</div>
                    <div className="pp-step"><span>2</span> Scan QR or use UPI ID above</div>
                    <div className="pp-step"><span>3</span> Pay ₹{totalPayable.toLocaleString('en-IN')} & copy the Transaction ID</div>
                    <div className="pp-step"><span>4</span> Paste Transaction ID below</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="form-card">
              <div className="form-card-title">
                <CreditCard size={18} />
                <h2>Transaction Confirmation</h2>
              </div>
              <div className="form-group">
                <label>Transaction ID / UTR Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 412345678901"
                  value={form.txnId}
                  onChange={e => setForm({ ...form, txnId: e.target.value })}
                  className={errors.txnId ? 'input-error' : ''}
                  id="checkout-txn"
                />
                {errors.txnId && <span className="error-msg">{errors.txnId}</span>}
                <p className="input-hint">Enter the 12-digit UTR number from your PhonePe payment success screen.</p>
              </div>
            </div>

            <div className="checkout-action-row">
              <button className="btn-back" onClick={() => setStep('cart')}>
                ← Back to Cart
              </button>
              <button className="btn-place-order" onClick={handlePlaceOrder}>
                Place Order <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: Mini Order Summary */}
          <div className="checkout-summary-sidebar">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="mini-items">
                {cart.map((item: any, i: number) => (
                  <div key={i} className="mini-item">
                    <div className="mini-img">
                      <img src={item.product.img} alt={item.product.name} />
                    </div>
                    <div className="mini-info">
                      <p className="mini-name">{item.product.name}</p>
                      <p className="mini-meta">Qty: {item.quantity} · <span style={{background:item.color, width:10, height:10, borderRadius:'50%', display:'inline-block', verticalAlign:'middle', border:'1px solid #ccc'}}></span></p>
                    </div>
                    <span className="mini-price">₹{(parsePrice(item.product.price) * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className="summary-rows">
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="summary-row"><span>Shipping</span><span>{shippingFee === 0 ? <strong className="free-label">FREE</strong> : `₹${shippingFee}`}</span></div>
                {appliedCoupon && (
                  <div className="summary-row discount-row">
                    <span>{appliedCoupon.label} Discount</span>
                    <span>-₹{discountAmt.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <hr className="divider"/>
                <div className="summary-row total-row"><span>Total Payable</span><span>₹{totalPayable.toLocaleString('en-IN')}</span></div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .cart-page { padding-bottom:100px; min-height:80vh; background:var(--bg); }
          .page-hero { background:linear-gradient(135deg,var(--color-primary,#1a1a2e) 0%,#0d0d1a 100%); padding:120px 40px 60px; text-align:center; color:#fff; }
          .hero-content { max-width:560px; margin:0 auto; }
          .page-title { font-size:clamp(28px,5vw,44px); font-weight:300; letter-spacing:-1px; margin:10px 0 16px; color:#fff; }
          .page-title strong { font-weight:700; color:var(--color-accent,#c9a96e); }
          .page-desc { font-size:15px; color:rgba(255,255,255,0.6); font-weight:300; line-height:1.7; }

          .checkout-layout { display:grid; grid-template-columns:1.6fr 1fr; gap:40px; padding-top:48px; padding-bottom:80px; }

          /* Form Cards */
          .checkout-form-section { display:flex; flex-direction:column; gap:24px; }
          .form-card { background:var(--card-bg); border:1px solid var(--border); border-radius:var(--radius-lg,16px); padding:28px; }
          .form-card-title { display:flex; align-items:center; gap:10px; margin-bottom:24px; color:var(--color-accent,#c9a96e); }
          .form-card-title h2 { font-size:16px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--text); }

          .form-group { display:flex; flex-direction:column; gap:6px; margin-bottom:20px; }
          .form-group:last-child { margin-bottom:0; }
          .form-group label { font-size:12px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; color:var(--text-secondary); }
          .form-group input, .form-group textarea {
            padding:14px 16px; border-radius:var(--radius-md,8px); border:1.5px solid var(--border);
            background:var(--bg); color:var(--text); font-size:14px; font-family:inherit;
            outline:none; transition:border-color 0.2s;
          }
          .form-group input:focus, .form-group textarea:focus { border-color:var(--color-accent,#c9a96e); }
          .form-group textarea { resize:vertical; min-height:80px; }
          .input-error { border-color:#e53e3e !important; }
          .error-msg { font-size:11px; color:#e53e3e; }
          .input-hint { font-size:11px; color:var(--text-secondary); margin-top:4px; line-height:1.5; }

          /* PhonePe Card */
          .phonepe-card { background:linear-gradient(135deg,#f8f0ff 0%,#ede0fc 100%); border-color:#d6b8fc; }
          .phonepe-inner { display:flex; gap:28px; align-items:flex-start; }
          .phonepe-left { display:flex; flex-direction:column; align-items:center; gap:10px; flex-shrink:0; }
          .phonepe-qr-wrap { width:180px; height:auto; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(95,37,159,0.2); background:#000; padding:0; }
          .qr-img { width:100%; height:auto; display:block; }
          .phonepe-brand { font-size:18px; font-weight:700; letter-spacing:-0.5px; }
          .pp-logo { color:#5f259f; }
          .pp-logo-blue { color:#00aee4; }

          .phonepe-right { flex:1; }
          .pp-instruction { font-size:13px; color:#5f259f; font-weight:600; margin-bottom:16px; }
          .pp-amount-box { background:rgba(95,37,159,0.08); border-radius:var(--radius-md); padding:14px 16px; margin-bottom:16px; }
          .pp-amount-label { font-size:11px; color:#5f259f; display:block; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; }
          .pp-amount { font-size:26px; font-weight:800; color:#5f259f; display:block; }
          .pp-saving { font-size:11px; color:#16a34a; font-weight:600; margin-top:4px; display:block; }
          .pp-upi-id { display:flex; flex-direction:column; gap:4px; margin-bottom:16px; }
          .pp-upi-label { font-size:11px; color:#5f259f; text-transform:uppercase; letter-spacing:0.5px; }
          .pp-upi-val { font-size:13px; font-weight:700; color:#5f259f; background:rgba(95,37,159,0.08); padding:6px 12px; border-radius:6px; display:inline-block; }
          .pp-steps { display:flex; flex-direction:column; gap:8px; }
          .pp-step { display:flex; align-items:flex-start; gap:10px; font-size:12px; color:#5f259f; }
          .pp-step span { background:#5f259f; color:#fff; width:18px; height:18px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; margin-top:1px; }

          /* Checkout Actions */
          .checkout-action-row { display:flex; gap:16px; justify-content:space-between; align-items:center; }
          .btn-back { background:none; border:1.5px solid var(--border); color:var(--text-secondary); padding:14px 24px; border-radius:var(--radius-full); font-size:13px; font-weight:600; transition:all 0.2s; }
          .btn-back:hover { border-color:var(--text); color:var(--text); }
          .btn-place-order { flex:1; background:var(--color-primary,#1a1a2e); color:#fff; padding:16px 24px; border-radius:var(--radius-full); font-size:14px; font-weight:700; letter-spacing:1px; text-transform:uppercase; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.25s; }
          .btn-place-order:hover { background:var(--color-accent,#c9a96e); transform:translateY(-2px); box-shadow:var(--shadow-lg); }

          /* Sidebar Summary */
          .checkout-summary-sidebar { position:sticky; top:120px; height:fit-content; }
          .summary-card { background:var(--card-bg); border:1px solid var(--border); border-radius:var(--radius-lg); padding:28px; box-shadow:var(--shadow-md); }
          .summary-card h3 { font-size:16px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:20px; }
          .mini-items { display:flex; flex-direction:column; gap:12px; margin-bottom:20px; }
          .mini-item { display:flex; align-items:center; gap:12px; }
          .mini-img { width:48px; height:36px; border-radius:6px; overflow:hidden; background:var(--bg-secondary); border:1px solid var(--border); flex-shrink:0; }
          .mini-img img { width:100%; height:100%; object-fit:cover; }
          .mini-info { flex:1; }
          .mini-name { font-size:12px; font-weight:600; line-height:1.3; }
          .mini-meta { font-size:11px; color:var(--text-secondary); margin-top:2px; }
          .mini-price { font-size:13px; font-weight:700; white-space:nowrap; }
          .summary-rows { display:flex; flex-direction:column; gap:12px; }
          .summary-row { display:flex; justify-content:space-between; font-size:14px; color:var(--text-secondary); }
          .discount-row { color:#16a34a; font-weight:600; }
          .free-label { color:#16a34a; font-weight:700; }
          .divider { border:0; border-top:1px solid var(--border); margin:4px 0; }
          .total-row { font-size:17px; font-weight:700; color:var(--text); }

          @media (max-width:900px) {
            .checkout-layout { grid-template-columns:1fr; }
            .checkout-summary-sidebar { position:static; }
            .phonepe-inner { flex-direction:column; }
            .phonepe-qr-wrap { width:140px; height:140px; }
          }
          @media (max-width:600px) {
            .page-hero { padding:100px 20px 40px; }
          }
        `}</style>
      </main>
    );
  }

  // ─── CART (Step 1) ────────────────────────────────────────────────
  return (
    <main className="cart-page">
      <div className="page-hero">
        <div className="hero-content">
          <span className="section-label">SHOPPING BAG</span>
          <h1 className="page-title">Your <strong>Cart</strong></h1>
          <p className="page-desc">Review your selected frames and proceed to checkout.</p>
        </div>
      </div>

      <div className="container">
        {cart.length > 0 ? (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items-section">
              <div className="cart-header">
                <h2>Items ({cart.length})</h2>
                <button onClick={clearCart} className="clear-cart-btn">Clear All</button>
              </div>

              <div className="cart-list">
                {cart.map((item: any, idx: number) => {
                  const unitPrice = parsePrice(item.product.price);
                  const itemSubtotal = unitPrice * item.quantity;
                  return (
                    <div className="cart-item" key={`${item.product.id}-${item.color}-${idx}`}>
                      <div className="item-img-wrap">
                        <img src={item.product.img} alt={item.product.name} />
                      </div>
                      <div className="item-details">
                        <span className="item-type">{item.product.type}</span>
                        <h3 className="item-name">{item.product.name}</h3>
                        <div className="item-meta">
                          <span className="color-label">Color:</span>
                          <span className="color-dot" style={{ background: item.color }} title={item.color} />
                        </div>
                        <div className="item-actions-mobile">
                          <div className="qty-selector">
                            <button onClick={() => updateQuantity(item.product.id, item.color, item.quantity - 1)} aria-label="Decrease"><Minus size={14} /></button>
                            <span className="qty-value">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.color, item.quantity + 1)} aria-label="Increase"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.product.id, item.color)} className="remove-btn" aria-label="Remove"><Trash2 size={16} /></button>
                        </div>
                      </div>
                      <div className="item-qty-desktop">
                        <div className="qty-selector">
                          <button onClick={() => updateQuantity(item.product.id, item.color, item.quantity - 1)} aria-label="Decrease"><Minus size={14} /></button>
                          <span className="qty-value">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.color, item.quantity + 1)} aria-label="Increase"><Plus size={14} /></button>
                        </div>
                      </div>
                      <div className="item-price">
                        <span className="unit-price">₹{unitPrice.toLocaleString('en-IN')} each</span>
                        <strong className="subtotal-price">₹{itemSubtotal.toLocaleString('en-IN')}</strong>
                        <button onClick={() => removeFromCart(item.product.id, item.color)} className="remove-btn-desktop" aria-label="Remove"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="summary-section">
              <div className="summary-card">
                <h3>Order Summary</h3>
                <div className="summary-rows">
                  <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                  <div className="summary-row"><span>Shipping</span><span>{shippingFee === 0 ? <strong className="free-shipping">FREE</strong> : `₹${shippingFee}`}</span></div>
                  {appliedCoupon && (
                    <div className="summary-row discount-row">
                      <span>{appliedCoupon.label} Discount</span>
                      <span>-₹{discountAmt.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {subtotal < 2000 && (
                    <div className="shipping-notice">💡 Add <strong>₹{(2000 - subtotal).toLocaleString('en-IN')}</strong> more for <strong>FREE Shipping</strong>!</div>
                  )}
                  <hr className="divider" />
                  <div className="summary-row total-row"><span>Total</span><span>₹{totalPayable.toLocaleString('en-IN')}</span></div>
                </div>

                {/* Coupon */}
                <form onSubmit={handleApplyPromo} className="promo-form">
                  <div className="promo-input-group">
                    <Tag size={14} />
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      disabled={!!appliedCoupon}
                      aria-label="Promo code"
                    />
                    <button type="submit" disabled={!!appliedCoupon}>Apply</button>
                  </div>
                  {appliedCoupon && (
                    <p className="promo-success-msg">
                      <Gift size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      <strong>{appliedCoupon.code}</strong> — {appliedCoupon.label} applied!
                    </p>
                  )}
                  {promoError && <p className="promo-error-msg">{promoError}</p>}
                </form>

                <button onClick={() => setStep('checkout')} className="btn btn-primary checkout-btn">
                  Proceed to Checkout <ArrowRight size={16} strokeWidth={1.5} />
                </button>

                <div className="trust-badges">
                  <div className="badge-item"><ShieldCheck size={16} /><span>Secure Payment</span></div>
                  <div className="badge-item"><Check size={16} /><span>Genuine Products</span></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-card">
              <div className="empty-icon-wrap"><ShoppingBag size={44} strokeWidth={1.5} /></div>
              <h2 className="empty-title">Your Cart is Empty</h2>
              <p className="empty-desc">Discover our stylish collections and find the perfect frame for you.</p>
              <Link href="/products" className="btn btn-primary" style={{ gap: '8px' }}>
                Shop Eyewear <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-page { padding-bottom:100px; min-height:80vh; background:var(--bg); }
        .page-hero { background:linear-gradient(135deg,var(--color-primary,#1a1a2e) 0%,#0d0d1a 100%); padding:120px 40px 60px; text-align:center; color:#fff; }
        .hero-content { max-width:560px; margin:0 auto; }
        .page-title { font-size:clamp(30px,5vw,48px); font-weight:300; letter-spacing:-1px; margin:10px 0 16px; color:#fff; }
        .page-title strong { font-weight:700; color:var(--color-accent,#c9a96e); }
        .page-desc { font-size:15px; color:rgba(255,255,255,0.6); font-weight:300; line-height:1.7; }

        .cart-layout { display:grid; grid-template-columns:1.8fr 1fr; gap:40px; margin-top:40px; }
        .cart-header { display:flex; justify-content:space-between; align-items:center; padding:12px 0; margin-bottom:24px; border-bottom:1px solid var(--border); }
        .cart-header h2 { font-size:20px; font-weight:600; }
        .clear-cart-btn { font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; color:var(--color-danger,#e53e3e); background:none; border:none; transition:opacity 0.2s; }
        .clear-cart-btn:hover { opacity:0.7; text-decoration:underline; }

        .cart-list { display:flex; flex-direction:column; gap:16px; }
        .cart-item { display:flex; align-items:center; gap:20px; padding:20px; border-radius:var(--radius-lg,16px); background:var(--card-bg); border:1px solid var(--border); transition:box-shadow var(--transition-fast); }
        .cart-item:hover { box-shadow:var(--shadow-sm); }
        .item-img-wrap { width:110px; height:80px; border-radius:var(--radius-md,8px); overflow:hidden; background:var(--bg-secondary); border:1px solid var(--border); flex-shrink:0; }
        .item-img-wrap img { width:100%; height:100%; object-fit:cover; }
        .item-details { flex:1; }
        .item-type { font-size:9px; letter-spacing:1.5px; text-transform:uppercase; color:var(--text-secondary); display:block; margin-bottom:2px; }
        .item-name { font-size:15px; font-weight:600; margin-bottom:8px; }
        .item-meta { display:flex; align-items:center; gap:6px; }
        .color-label { font-size:12px; color:var(--text-secondary); }
        .color-dot { width:14px; height:14px; border-radius:50%; border:1.5px solid var(--border); display:inline-block; }
        .item-actions-mobile { display:none; }

        .qty-selector { display:inline-flex; align-items:center; border:1px solid var(--border); border-radius:var(--radius-full); padding:4px; background:var(--bg-secondary); }
        .qty-selector button { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:var(--card-bg); color:var(--text); border:1px solid var(--border); transition:all 0.2s; }
        .qty-selector button:hover { background:var(--color-primary); color:#fff; border-color:var(--color-primary); }
        .qty-value { font-size:13px; font-weight:600; padding:0 12px; min-width:34px; text-align:center; }
        .item-qty-desktop { display:block; }

        .item-price { display:flex; flex-direction:column; align-items:flex-end; gap:4px; min-width:120px; text-align:right; }
        .unit-price { font-size:11px; color:var(--text-secondary); }
        .subtotal-price { font-size:16px; font-weight:700; }
        .remove-btn-desktop { background:none; border:none; color:var(--text-secondary); cursor:pointer; margin-top:10px; padding:4px; border-radius:4px; transition:color 0.2s; }
        .remove-btn-desktop:hover { color:var(--color-danger,#e53e3e); }
        .remove-btn { background:none; border:none; color:var(--text-secondary); cursor:pointer; padding:6px; border-radius:4px; transition:color 0.2s; }
        .remove-btn:hover { color:var(--color-danger,#e53e3e); }

        .summary-section { position:sticky; top:120px; height:fit-content; }
        .summary-card { padding:32px; background:var(--card-bg); border:1px solid var(--border); border-radius:var(--radius-lg,16px); box-shadow:var(--shadow-md); }
        .summary-card h3 { font-size:18px; font-weight:600; margin-bottom:24px; text-transform:uppercase; letter-spacing:0.5px; }
        .summary-rows { display:flex; flex-direction:column; gap:16px; }
        .summary-row { display:flex; justify-content:space-between; font-size:14px; color:var(--text-secondary); }
        .free-shipping { color:#16a34a; font-weight:700; }
        .discount-row { color:#16a34a; font-weight:600; }
        .shipping-notice { font-size:12px; background:#fef3c7; color:#b45309; padding:10px 12px; border-radius:var(--radius-md); line-height:1.5; }
        .divider { border:0; border-top:1px solid var(--border); margin:4px 0; }
        .total-row { font-size:18px; font-weight:700; color:var(--text); }

        .promo-form { margin:24px 0; }
        .promo-input-group { display:flex; align-items:center; gap:8px; border:1.5px solid var(--border); border-radius:var(--radius-md); padding:4px 4px 4px 12px; background:var(--bg); }
        .promo-input-group input { flex:1; border:none; background:transparent; color:var(--text); font-size:13px; outline:none; }
        .promo-input-group button { padding:9px 18px; border-radius:var(--radius-md); background:var(--color-primary); color:#fff; font-size:13px; font-weight:600; transition:background 0.2s; border:none; }
        .promo-input-group button:hover:not(:disabled) { background:var(--color-accent); }
        .promo-input-group button:disabled { opacity:0.5; cursor:not-allowed; }
        .promo-success-msg { font-size:11px; color:#16a34a; margin-top:8px; }
        .promo-error-msg { font-size:11px; color:var(--color-danger,#e53e3e); margin-top:8px; }

        .checkout-btn { width:100%; padding:16px; border-radius:var(--radius-full); font-size:14px; letter-spacing:1px; gap:8px; margin-bottom:20px; }
        .trust-badges { display:flex; justify-content:space-around; }
        .badge-item { display:flex; align-items:center; gap:6px; font-size:11px; color:var(--text-secondary); }

        .empty-state { display:flex; justify-content:center; align-items:center; padding:80px 20px; }
        .empty-card { text-align:center; max-width:480px; padding:48px 32px; border-radius:var(--radius-lg,16px); border:1px solid var(--border); background:var(--card-bg); box-shadow:var(--shadow-md); }
        .empty-icon-wrap { display:inline-flex; align-items:center; justify-content:center; width:90px; height:90px; border-radius:50%; background:var(--bg-secondary); color:var(--color-accent); margin-bottom:24px; }
        .empty-title { font-size:22px; font-weight:600; margin-bottom:12px; color:var(--text); }
        .empty-desc { font-size:14px; color:var(--text-secondary); margin-bottom:32px; line-height:1.6; }

        @media (max-width:992px) { .cart-layout { grid-template-columns:1fr; gap:32px; } .summary-section { position:static; } }
        @media (max-width:768px) {
          .page-hero { padding:100px 20px 48px; }
          .cart-item { padding:16px; align-items:flex-start; }
          .item-img-wrap { width:80px; height:60px; }
          .item-qty-desktop { display:none; }
          .remove-btn-desktop { display:none; }
          .item-actions-mobile { display:flex; align-items:center; justify-content:space-between; margin-top:12px; gap:16px; }
          .item-price { min-width:unset; }
        }
      `}</style>
    </main>
  );
}

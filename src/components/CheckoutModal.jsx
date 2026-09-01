import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function CheckoutModal() {
  const { isCheckoutModalOpen, setIsCheckoutModalOpen, currentDojoOrder } = useCart();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', date: '', notes: '' });

  if (!isCheckoutModalOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      showToast('Please fill all required fields');
      return;
    }
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2500); // simulate processing
  };

  const close = () => {
    setIsCheckoutModalOpen(false);
    setStep(1);
    setFormData({ name: '', phone: '', email: '', date: '', notes: '' });
  };

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="modal-overlay" style={{ display: 'flex', zIndex: 100000 }} onClick={close}>
      <div className="modal-content dojo-checkout-sheet" style={{ maxWidth: '540px', width: '95%', maxHeight: '90vh', overflowY: 'auto', padding: '25px', borderRadius: '24px', background: '#FFFBF7' }} onClick={e => e.stopPropagation()}>
        <span className="close-dojo-modal" style={{ position: 'absolute', top: '15px', right: '20px', fontSize: '28px', fontWeight: 'bold', cursor: 'pointer', color: '#4A2311' }} onClick={close}>&times;</span>
        
        <div style={{ textAlign: 'center', borderBottom: '2px solid rgba(74, 35, 17, 0.1)', paddingBottom: '16px', marginBottom: '18px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#E8F5E9', color: '#2E7D32', fontSize: '0.75rem', fontWeight: 700, padding: '5px 12px', borderRadius: '50px', marginBottom: '8px' }}>
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>DOJO SECURE CHECKOUT • GBP</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#4A2311' }}>Complete Your Order</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#6d4834' }}>Merchant: <strong>sp218466ugbloc1</strong> (Paymentsense Cloud)</p>
        </div>

        {step === 1 && (
          <form onSubmit={handlePay}>
            <div style={{ background: 'rgba(255, 94, 0, 0.08)', border: '1px solid rgba(255, 94, 0, 0.25)', borderRadius: '14px', padding: '14px 18px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span style={{ fontSize: '0.75rem', color: '#8c5d45', fontWeight: 600, textTransform: 'uppercase' }}>Selected Item</span>
                    <h4 style={{ margin: '2px 0 0', fontSize: '1.05rem', color: '#4A2311' }}>{currentDojoOrder.title} ({currentDojoOrder.weight})</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#8c5d45', fontWeight: 600 }}>Total to Pay</span>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#D83A00' }}>£{currentDojoOrder.price}.00</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4A2311', marginBottom: '4px' }}>Your Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Ahmed Mahamed" style={{ width: '100%', padding: '11px 14px', border: '1.5px solid rgba(74, 35, 17, 0.25)', borderRadius: '10px', fontSize: '0.95rem', boxSizing: 'border-box' }} required />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4A2311', marginBottom: '4px' }}>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 07912 345 678" style={{ width: '100%', padding: '11px 14px', border: '1.5px solid rgba(74, 35, 17, 0.25)', borderRadius: '10px', fontSize: '0.95rem', boxSizing: 'border-box' }} required />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4A2311', marginBottom: '4px' }}>Pickup / Required Date * (Min. 48h Notice)</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} style={{ width: '100%', padding: '11px 14px', border: '1.5px solid rgba(74, 35, 17, 0.25)', borderRadius: '10px', fontSize: '0.95rem', boxSizing: 'border-box' }} required />
                </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#4A2311', marginBottom: '8px' }}>Select Dojo Payment Method:</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    <button type="button" className="dojo-method-btn active" style={{ padding: '10px 8px', border: '2px solid #FF5E00', background: 'rgba(255, 94, 0, 0.1)', borderRadius: '10px', fontWeight: 700, fontSize: '0.8rem', color: '#4A2311', cursor: 'pointer' }}>💳 Card</button>
                    <button type="button" className="dojo-method-btn" style={{ padding: '10px 8px', border: '1.5px solid rgba(74, 35, 17, 0.2)', background: '#ffffff', borderRadius: '10px', fontWeight: 700, fontSize: '0.8rem', color: '#4A2311', cursor: 'pointer' }}>📱 Wallet</button>
                    <button type="button" className="dojo-method-btn" style={{ padding: '10px 8px', border: '1.5px solid rgba(74, 35, 17, 0.2)', background: '#ffffff', borderRadius: '10px', fontWeight: 700, fontSize: '0.8rem', color: '#4A2311', cursor: 'pointer' }}>🏬 Terminal</button>
                </div>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid rgba(74, 35, 17, 0.15)', borderRadius: '12px', padding: '14px', marginBottom: '18px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#6d4834', marginBottom: '4px' }}>Card Number</label>
                    <input type="tel" placeholder="•••• •••• •••• ••••" style={{ width: '100%', padding: '10px 12px', border: '1px solid rgba(74, 35, 17, 0.25)', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }} />
                </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #168038 0%, #0D5E25 100%)', color: '#FFFFFF', border: '2px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 8px 25px rgba(22, 128, 56, 0.45)', fontWeight: 800, fontSize: '1.15rem', padding: '17px 20px', borderRadius: '16px', cursor: 'pointer' }}>
                PAY £{currentDojoOrder.price}.00 NOW
            </button>
          </form>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: '56px', height: '56px', border: '5px solid rgba(255, 94, 0, 0.2)', borderTopColor: '#FF5E00', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
              <h3 style={{ margin: '0 0 8px', color: '#4A2311', fontSize: '1.25rem' }}>Authorising Dojo Payment...</h3>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ background: '#ffffff', border: '2px solid #4A2311', borderRadius: '16px', padding: '24px', color: '#4A2311', textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px', color: '#4A2311' }}>FURQAN SWEETS</h2>
                <div style={{ background: '#E8F5E9', color: '#2E7D32', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', margin: '14px auto', display: 'inline-block' }}>✓ PAID VIA DOJO SECURE</div>
                
                <div style={{ background: 'rgba(74, 35, 17, 0.04)', borderRadius: '10px', padding: '16px', textAlign: 'left', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6d4834', fontSize: '0.85rem' }}>Customer:</span><strong style={{ fontSize: '0.9rem' }}>{formData.name}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6d4834', fontSize: '0.85rem' }}>Item:</span><strong style={{ fontSize: '0.9rem' }}>{currentDojoOrder.title}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px dashed rgba(74, 35, 17, 0.2)' }}><span style={{ color: '#4A2311', fontWeight: 800, fontSize: '1.1rem' }}>Total Paid:</span><strong style={{ color: '#FF5E00', fontSize: '1.2rem' }}>£{currentDojoOrder.price}.00</strong></div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => {
                        const msg = `Hello Furqan Sweets! I have just paid online for an Order via Dojo Secure.\n\n*Order:* ${currentDojoOrder.title}\n*Total Paid:* £${currentDojoOrder.price}.00 GBP\n*Customer:* ${formData.name}\n*Phone:* ${formData.phone}\n*Pickup Date:* ${formData.date}\n\nPlease confirm my order!`;
                        const enc = encodeURIComponent(msg);
                        window.open(`https://api.whatsapp.com/send?phone=+447956911759&text=${enc}`, '_blank');
                    }} style={{ width: '100%', background: '#25D366', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        Send WhatsApp Receipt
                    </button>
                    <button onClick={() => window.print()} style={{ width: '100%', background: '#f4f3ec', color: '#4a2311', border: '1px solid #e5e4e7', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                        Print Receipt
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;

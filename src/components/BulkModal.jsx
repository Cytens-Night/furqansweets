import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function BulkModal() {
  const {
    isBulkModalOpen,
    setIsBulkModalOpen,
    bulkBaseKg,
    bulkBasePrice,
    bulkExtraKgPrice,
    extraKilos,
    setExtraKilos,
    mainFlavour,
    setMainFlavour,
    currentBulkWeight,
    totalBulkPrice,
    openCheckout
  } = useCart();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!isBulkModalOpen) return null;

  const handleExtraKgChange = (flavour, delta) => {
    setExtraKilos(prev => {
      const current = prev[flavour];
      const next = current + delta;
      return { ...prev, [flavour]: Math.max(0, next) };
    });
  };

  const flavours = [
    { value: 'Traditional Plain Halwa (Xalwo Caadi)', title: 'Traditional Plain Halwa', sub: 'Xalwo Caadi • Classic authentic taste' },
    { value: 'Sesame Halwa (Xalwo Sisinta)', title: 'Sesame Halwa', sub: 'Xalwo Sisinta • Rich toasted sesame aroma' },
    { value: 'Mixed Nuts Halwa (Xalwo Loos)', title: 'Mixed Nuts Halwa', sub: 'Xalwo Loos • Loaded with premium nuts & cardamom' },
    { value: 'Assorted Mixed Halwa (Isku-dhafan)', title: 'Assorted Mixed Halwa', sub: 'Isku-dhafan • Perfect variety of all signature flavours' }
  ];

  const selectedFlavour = flavours.find(f => f.value === mainFlavour);

  return (
    <div className="modal-overlay" style={{ display: 'flex', zIndex: 100000 }} onClick={() => setIsBulkModalOpen(false)}>
      <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={() => setIsBulkModalOpen(false)}>&times;</span>
        <div className="modal-header">
          <h2>Customise Your Bulk Order</h2>
        </div>
        <div className="modal-body">
          <img src="/assets/square_bucket_halwa.png" alt="Square Bucket of Halwa" className="modal-halwa-img" />
          <p className="modal-desc">15kg base bucket can serve about 120 to 150 people.</p>
          <div style={{ background: '#FFF3E0', borderLeft: '4px solid #FF5E00', padding: '10px 14px', borderRadius: '8px', marginBottom: '15px', textAlign: 'left', fontSize: '0.82rem', color: '#5D2906', lineHeight: '1.4', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
             <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
             <div><strong>48 Hours Advance Notice Required:</strong> All bulk online orders require at least 48 hours notice. For emergencies or urgent same-day orders, please call us directly at <a href="tel:02088383030" style={{ color: '#4A2311', fontWeight: 'bold', textDecoration: 'underline' }}>020 8838 3030</a>.</div>
          </div>
          
          <div className="bulk-flavour-controls" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            <div className="main-bucket-card" style={{ background: '#FFF9F2', border: '2px solid #FF5E00', borderRadius: '16px', padding: '16px', textAlign: 'left' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.02rem', color: '#4A2311' }}>1. Main Base Bucket (Fixed: 1 Bucket)</span>
                  <span className="base-info-pill" style={{ background: '#FF5E00', color: '#fff', fontWeight: 700, fontSize: '0.8rem', padding: '4px 10px', borderRadius: '50px' }}>15kg • £120</span>
              </div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#6d4834', marginBottom: '8px' }}>Select Main Bucket Flavour:</label>
              
              <div className="custom-dropdown-container" style={{ position: 'relative', width: '100%' }}>
                  <div className="custom-dropdown-trigger" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ background: '#FFFFFF', border: '2px solid #E6D5C3', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', boxShadow: '0 4px 12px rgba(74, 35, 17, 0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#FFF3E0', color: '#FF5E00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          </div>
                          <div>
                              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#4A2311', lineHeight: 1.2 }}>{selectedFlavour?.title}</div>
                              <div style={{ fontSize: '0.78rem', color: '#8c5d45', fontWeight: 600 }}>{selectedFlavour?.sub.split(' • ')[0]}</div>
                          </div>
                      </div>
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="#FF5E00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  
                  {dropdownOpen && (
                    <div className="custom-dropdown-menu" style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '100%', background: '#FFFFFF', border: '2px solid #FF5E00', borderRadius: '16px', boxShadow: '0 16px 40px rgba(74, 35, 17, 0.18)', zIndex: 10000, overflow: 'hidden' }}>
                      {flavours.map(f => (
                        <div key={f.value} onClick={() => { setMainFlavour(f.value); setDropdownOpen(false); }} className={`custom-dropdown-item ${mainFlavour === f.value ? 'active' : ''}`} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: '1px solid #f2eBE3' }}>
                           <div>
                              <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#4A2311' }}>{f.title}</div>
                              <div style={{ fontSize: '0.75rem', color: '#8c5d45' }}>{f.sub}</div>
                          </div>
                          {mainFlavour === f.value && <span style={{ color: '#FF5E00', fontWeight: 800, fontSize: '1.2rem' }}>✓</span>}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            <div className="extra-kilos-section" style={{ background: '#FFFFFF', border: '1px solid #EBE2D8', borderRadius: '16px', padding: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f0e6dc', paddingBottom: '10px' }}>
                    <div>
                        <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#4A2311', display: 'block' }}>2. Add Extra Kilos by Flavour</span>
                        <span style={{ fontSize: '0.78rem', color: '#8c5d45' }}>Optional extra weight (£9 / extra kg)</span>
                    </div>
                    <button onClick={() => setExtraKilos({ plain: 0, sesame: 0, nuts: 0 })} style={{ background: '#f0e6dc', color: '#4A2311', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>Reset Extras</button>
                </div>
                
                {[
                  { key: 'plain', title: 'Traditional Plain', sub: 'Xalwo Caadi' },
                  { key: 'sesame', title: 'Sesame Halwa', sub: 'Xalwo Sisinta' },
                  { key: 'nuts', title: 'Mixed Nuts Halwa', sub: 'Xalwo Loos' }
                ].map((flavour, idx) => (
                  <div key={flavour.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: idx < 2 ? '1px dashed #f0e6dc' : 'none' }}>
                      <div style={{ flex: 1 }}>
                          <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#4A2311', display: 'block' }}>{flavour.title}</span>
                          <span style={{ fontSize: '0.73rem', color: '#8c5d45' }}>{flavour.sub}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button onClick={() => handleExtraKgChange(flavour.key, -1)} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #d9b8a3', background: '#fff', color: '#4A2311', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                          <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 800, fontSize: '1.02rem', color: '#FF5E00' }}>{extraKilos[flavour.key]}</span>
                          <span style={{ fontSize: '0.78rem', color: '#6d4834', fontWeight: 700, marginRight: '2px' }}>kg</span>
                          <button onClick={() => handleExtraKgChange(flavour.key, 1)} style={{ padding: '6px 9px', borderRadius: '8px', border: 'none', background: '#FF5E00', color: '#fff', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>+1kg</button>
                          <button onClick={() => handleExtraKgChange(flavour.key, 5)} style={{ padding: '6px 9px', borderRadius: '8px', border: 'none', background: '#4A2311', color: '#fff', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer' }}>+5kg</button>
                      </div>
                  </div>
                ))}
            </div>

            <div className="bulk-summary-panel" style={{ background: '#FDFBF7', border: '1.5px solid #EAE0D5', borderRadius: '16px', padding: '14px 18px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#6d4834', marginBottom: '6px' }}>
                    <span>Main Base Bucket (15kg):</span>
                    <strong style={{ textAlign: 'right', maxWidth: '58%' }}>{mainFlavour}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#6d4834', marginBottom: '8px' }}>
                    <span>Extra Kilos ({(extraKilos.plain + extraKilos.sesame + extraKilos.nuts)}kg):</span>
                    <strong style={{ textAlign: 'right', maxWidth: '58%' }}>
                      {[extraKilos.plain && `${extraKilos.plain}kg Plain`, extraKilos.sesame && `${extraKilos.sesame}kg Sesame`, extraKilos.nuts && `${extraKilos.nuts}kg Nuts`].filter(Boolean).join(', ') || 'None'}
                    </strong>
                </div>
                <div style={{ borderTop: '1px solid #EAE0D5', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '0.78rem', color: '#8c5d45', display: 'block', fontWeight: 700 }}>TOTAL ORDER WEIGHT</span>
                        <strong style={{ fontSize: '1.25rem', color: '#4A2311' }}>{currentBulkWeight} kg</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.78rem', color: '#8c5d45', display: 'block', fontWeight: 700 }}>ESTIMATED TOTAL</span>
                        <strong style={{ fontSize: '1.4rem', color: '#FF5E00' }}>£{totalBulkPrice}</strong>
                    </div>
                </div>
            </div>
            
            <button className="btn-primary bulk-checkout-btn" onClick={() => {
              setIsBulkModalOpen(false);
              const extraDesc = [extraKilos.plain && `${extraKilos.plain}kg Plain`, extraKilos.sesame && `${extraKilos.sesame}kg Sesame`, extraKilos.nuts && `${extraKilos.nuts}kg Nuts`].filter(Boolean).join(', ');
              const title = `Bulk Halwa (${mainFlavour})` + (extraDesc ? ` + Extras: ${extraDesc}` : '');
              openCheckout(title, totalBulkPrice, `${currentBulkWeight}kg`);
            }}>
              Proceed to Payment - £{totalBulkPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkModal;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';

function Home() {
  const { setIsBulkModalOpen } = useCart();
  const { data } = useData();
  const s = data?.siteSettings || {};
  
  return (
    <>
      
      <div className="welcome-banner" style={{"display":"flex","justifyContent":"center","alignItems":"center","gap":"15px","flexWrap":"wrap"}}>
            <p style={{"margin":"0","display":"flex","alignItems":"center","gap":"8px"}}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <strong>Open Everyday:</strong> {s.openHours} <span style={{"fontSize":"0.8em","opacity":"0.8","marginLeft":"5px"}}>(Times may vary)</span>
            </p>
            <span style={{"opacity":"0.4"}}>|</span>
            <p style={{"margin":"0","display":"flex","alignItems":"center","gap":"8px"}}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href={s.phoneTel} className="call-modal-trigger" style={{"color":"#ffb03a","textDecoration":"none","fontWeight":"bold"}}>{s.phoneNumber}</a>
            </p>
        </div>
      
      
      
      <section className="bulk-orders-section" id="bulk">
            <div className="bulk-orders-wrapper">
                <div className="bulk-content-left">
                    <h2>{s.bulkTitle} <span className="translation" style={{"fontSize":"0.6em","marginTop":"5px"}}>{s.bulkTitleSomali}</span></h2>
                    <p className="bulk-intro-text">{s.bulkDesc}</p>
                    
                    <div className="occasions-grid">
                        <div className="occasion-item">
                            <span className="occasion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                            <span className="occasion-text">Weddings <span className="translation">Aroos</span></span>
                        </div>
                        <div className="occasion-item">
                            <span className="occasion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                            <span className="occasion-text">Parties & Events <span className="translation">Xafladaha</span></span>
                        </div>
                        <div className="occasion-item">
                            <span className="occasion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>
                            <span className="occasion-text">Eid & Ramadan <span className="translation">Ciid</span></span>
                        </div>
                        <div className="occasion-item">
                            <span className="occasion-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                            <span className="occasion-text">Family Gatherings <span className="translation">Qoyska</span></span>
                        </div>
                    </div>
                </div>

                <div className="bulk-content-right">
                    <div className="bulk-price-box">
                        <div className="price-tag">
                            <span className="amount">{s.bulkPrice}</span>
                            <span className="unit">/ {s.bulkWeight}</span>
                        </div>
                        <button className="btn-primary" onClick={() => setIsBulkModalOpen(true)}>Customize & Order Now</button>
                    </div>
                </div>
            </div>
        </section>
      
      
      <section className="collections-section" id="snacks-scroll" style={{ marginTop: '50px', marginBottom: '60px' }}>
         <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 className="section-title" style={{ marginBottom: '10px' }}>Our Bakery &amp; Snacks <span className="translation" style={{ fontSize: '0.55em', display: 'block', color: '#8c5d45', fontWeight: '500', marginTop: '6px' }}>Buskudka &amp; Macmacaanka Fudud</span></h2>
              <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>Enjoy our freshly baked biscuits and traditional Somali snacks. Swipe or scroll horizontally to explore!</p>
          </div>
          <h3 style={{ color: '#4a2311', fontSize: '1.5rem', marginBottom: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Biscuit Bags <span className="translation" style={{ fontSize: '0.65em', fontWeight: '400', color: '#8c5d45' }}>(Buskud)</span></span>
              <Link to="/shop" style={{ fontSize: '0.9rem', color: '#ff5e00', textDecoration: 'none', fontWeight: '600' }}>View All &rarr;</Link>
          </h3>
          <div className="collections-scroll-wrapper">
              <div className="collections-row" id="biscuit-bags-row">
                  {data.snacks.filter(p => p.category === 'Biscuits Bags').map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
          </div>

          <h3 style={{ color: '#4a2311', fontSize: '1.5rem', marginTop: '40px', marginBottom: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Extra Snacks <span className="translation" style={{ fontSize: '0.65em', fontWeight: '400', color: '#8c5d45' }}>(Fudud Dheeraad ah)</span></span>
              <Link to="/shop" style={{ fontSize: '0.9rem', color: '#ff5e00', textDecoration: 'none', fontWeight: '600' }}>View All &rarr;</Link>
          </h3>
          <div className="collections-scroll-wrapper">
              <div className="collections-row" id="extra-snacks-row">
                  {data.snacks.filter(p => p.category === 'Extra Snacks').map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
          </div>
      </section>

      
                            <div style={{"background":"#fff","padding":"6px","borderRadius":"12px","border":"1px solid rgba(74,35,17,0.08)","boxShadow":"0 4px 12px rgba(74,35,17,0.08)","display":"flex","alignItems":"center","justifyContent":"center","flexShrink":"0"}}>
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fmaps.google.com%2F%3Fq%3DFurqan%2BSweet%2B175%2BHillside%2BLondon%2BNW10%2B8LL&color=4A2311&bgcolor=FFFFFF" alt="Google Maps QR" style={{"width":"60px","height":"60px","display":"block","borderRadius":"6px"}} />
                            </div>
                            <div style={{"textAlign":"left"}}>
                                <div style={{"fontSize":"1.05rem","fontWeight":"700","color":"#4a2311","display":"flex","alignItems":"center","gap":"6px"}}>
                                    Store Navigation QR
                                </div>
                                <div style={{"fontSize":"0.82rem","color":"#8c5d45","marginTop":"3px"}}>Tap or scan for instant Google Maps directions</div>
                            </div>
                        </div>
                        <div className="store-nav-badge-btn" style={{"background":"#FF5E00","color":"#fff","fontSize":"0.78rem","fontWeight":"700","padding":"10px 18px","borderRadius":"50px","display":"flex","alignItems":"center","gap":"6px","letterSpacing":"0.5px","boxShadow":"0 4px 14px rgba(255, 94, 0, 0.3)","flexShrink":"0"}}>
                            GET DIRECTIONS
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                    </a>
                </div>

                
                <div className="map-display-card" style={{"background":"#ffffff","border":"1px solid rgba(255, 94, 0, 0.2)","borderRadius":"26px","padding":"32px","boxShadow":"0 15px 35px rgba(74, 35, 17, 0.07)","display":"flex","flexDirection":"column","justifyContent":"space-between"}}>
                    <div style={{"display":"flex","alignItems":"center","justifyContent":"space-between","marginBottom":"18px"}}>
                        <span style={{"fontSize":"0.9rem","fontWeight":"700","color":"#4a2311","display":"flex","alignItems":"center","gap":"8px"}}>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#FF5E00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                            Live Location Map
                        </span>
                        <span style={{"fontSize":"0.78rem","color":"#8c5d45","fontWeight":"600"}}>London NW10 8LL</span>
                    </div>

                    
                    <div style={{"position":"relative","width":"100%","height":"350px","borderRadius":"20px","overflow":"hidden","border":"1px solid rgba(74, 35, 17, 0.12)","boxShadow":"0 10px 25px rgba(74, 35, 17, 0.08)","flexGrow":"1"}}>
                        <iframe 
                            className="map-display-iframe"
                            src="https://www.google.com/maps?q=Furqan+Sweet,+175+Hillside,+London+NW10+8LL&output=embed" 
                            style={{"position":"absolute","top":"-55px","left":"0","width":"100%","height":"calc(100% + 55px)","border":"0"}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>

      
      <section className="reviews-section">
            
            

            <h2 className="section-title">What Our Customers Say <span className="translation" style={{"fontSize":"0.6em"}}>Maxay Macaamiisheenu Yiraahdaan</span></h2>
            <div className="reviews-grid">
                <div className="review-card">
                    <div className="stars" style={{"color":"#FFB000","display":"flex","gap":"4px","marginBottom":"12px"}}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                    <p className="review-text">"Absolutely the best Somali Halwa I have ever tasted outside of Mogadishu! It's perfectly sweet, fresh, and reminds me of home."<span className="translation" style={{"display":"block","marginTop":"10px","fontSize":"0.85em"}}>"Runtii waa Xalwadii Soomaaliyeed ee ugu fiicnayd ee aan abid dhadhamiyo meel ka baxsan Muqdisho! Waa mid si fiican u macaan, cusub, oo i xasuusinaysa dhulkeygii."</span></p>
                    <p className="reviewer-name">- Ahmed M.</p>
                </div>
                <div className="review-card">
                    <div className="stars" style={{"color":"#FFB000","display":"flex","gap":"4px","marginBottom":"12px"}}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                    <p className="review-text">"I ordered a bulk bucket for my sister's wedding and everyone was asking where it came from. So rich and delicious!"<span className="translation" style={{"display":"block","marginTop":"10px","fontSize":"0.85em"}}>"Waxaan u dalbaday baaldi weyn arooska walaashay, qof kastana wuxuu i weydiinayay meesha ay ka timid. Aad bay u qani tahay oo u dhadhan fiican tahay!"</span></p>
                    <p className="reviewer-name">- Fadumo S.</p>
                </div>
                <div className="review-card">
                    <div className="stars" style={{"color":"#FFB000","display":"flex","gap":"4px","marginBottom":"12px"}}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                    <p className="review-text">"The sesame halwa is incredibly addictive. Their biscuits also go perfectly with my afternoon shaah. Highly recommend!"<span className="translation" style={{"display":"block","marginTop":"10px","fontSize":"0.85em"}}>"Xalwo sisintu aad bay u macaan tahay. Buskudkooda wuxuu sidoo kale si fiican ula socdaa shaahayga galabnimada. Aad baan ugu talinayaa!"</span></p>
                    <p className="reviewer-name">- Omar Ali</p>
                </div>
            </div>

            
            <div className="google-reviews-banner" style={{"margin":"45px auto 0","maxWidth":"980px","background":"#ffffff","border":"1px solid rgba(255, 94, 0, 0.25)","borderRadius":"28px","padding":"35px 38px","boxShadow":"0 15px 40px rgba(74, 35, 17, 0.08)","display":"flex","alignItems":"center","justifyContent":"space-between","gap":"35px"}}>
                <div className="google-reviews-banner-left" style={{"flex":"1","textAlign":"left"}}>
                    <div style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"rgba(255, 94, 0, 0.12)","border":"1px solid rgba(255, 94, 0, 0.35)","color":"#c92a00","padding":"6px 16px","borderRadius":"50px","fontSize":"0.78rem","fontWeight":"700","letterSpacing":"1.2px","textTransform":"uppercase","marginBottom":"14px"}}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        Verified Google Reviews
                    </div>
                    <h3 style={{"color":"#4a2311","fontSize":"1.7rem","fontWeight":"700","marginBottom":"8px","lineHeight":"1.3"}}>
                        Love Our Sweets? Leave Us a 5-Star Review on Google
                        <span className="translation" style={{"display":"block","fontSize":"0.55em","color":"#8c5d45","fontWeight":"500","marginTop":"5px"}}>Ma jeceshahay macmacaankeena? Qiimeyn 5-xidigood ah nooga tag Google</span>
                    </h3>
                    <p style={{"color":"#6b4c3a","fontSize":"1.02rem","lineHeight":"1.6","marginBottom":"22px","maxWidth":"520px"}}>
                        Your reviews help our London bakery grow and share authentic Somali sweets with more families. Scan the QR code or tap the button below!
                    </p>
                    <a href="https://www.google.com/search?q=Furqan+Sweets+London+Reviews" target="_blank" rel="noopener noreferrer" className="google-reviews-action-btn" style={{"display":"inline-flex","alignItems":"center","gap":"10px","background":"#FF5E00","color":"#fff","textDecoration":"none","padding":"14px 28px","borderRadius":"50px","fontSize":"0.92rem","fontWeight":"700","letterSpacing":"0.5px","boxShadow":"0 8px 25px rgba(255, 94, 0, 0.3)","transition":"all 0.3s ease"}}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        TAP TO OPEN GOOGLE REVIEWS
                    </a>
                </div>

                <div className="google-reviews-qr-card" style={{"background":"#ffffff","border":"1px solid rgba(74, 35, 17, 0.12)","borderRadius":"24px","padding":"18px","boxShadow":"0 10px 30px rgba(74, 35, 17, 0.07)","display":"flex","flexDirection":"column","alignItems":"center","textAlign":"center","flexShrink":"0"}}>
                    <a href="https://www.google.com/search?q=Furqan+Sweets+London+Reviews" target="_blank" rel="noopener noreferrer" style={{"display":"block","background":"#fff","padding":"8px","borderRadius":"14px","textDecoration":"none","transition":"transform 0.3s ease"}}>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3DFurqan%2BSweets%2BLondon%2BReviews&color=4A2311&bgcolor=FFFFFF" alt="Google Reviews QR Code" style={{"width":"150px","height":"150px","display":"block","borderRadius":"8px"}} />
                    </a>
                    <span style={{"fontSize":"0.85rem","fontWeight":"700","color":"#4a2311","marginTop":"10px","display":"block"}}>Scan with Camera</span>
                    <span style={{"fontSize":"0.72rem","color":"#8c5d45","marginTop":"2px"}}>Google Reviews QR</span>
                </div>
            </div>
        </section>
    </>
  );
}

export default Home;

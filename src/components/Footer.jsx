import React from 'react';
import { Link } from 'react-router-dom';
import { Visa, Mastercard, Amex } from 'react-svg-credit-card-payment-icons/icons/flat-rounded';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src="/assets/furqansweets_logo.svg" alt="Furqan Sweets" className="footer-logo" />
          <p>Authentic Somali Sweets, made with love and tradition.<span className="translation">Macmacaan Soomaaliyeed oo dhab ah, oo lagu sameeyay jacayl iyo dhaqan.</span></p>
          <p style={{ marginTop: '15px' }}><strong>Email:</strong> info@furqansweets.com</p>
          <p><strong>Opening Times:</strong> 9am to 10pm everyday<br /><span style={{ fontSize: '0.85em', opacity: 0.8 }}>(times may vary, please call 020 8838 3030)</span></p>
        </div>
        <div className="footer-links">
          <h3>Quick Links <span className="translation">Xiriiriyeyaasha Degdega ah</span></h3>
          <ul>
            <li><Link to="/">Home <span className="translation" style={{ display: 'inline', marginLeft: '5px' }}>(Bogga Hore)</span></Link></li>
            <li><Link to="/#bulk" id="footer-bulk-link">Bulk Orders <span className="translation" style={{ display: 'inline', marginLeft: '5px' }}>(Dalabyo Waawayn)</span></Link></li>
            <li><Link to="/shop">Shop Snacks <span className="translation" style={{ display: 'inline', marginLeft: '5px' }}>(Dukaanka Fudud)</span></Link></li>
            <li><a href="#" className="call-modal-trigger">Contact Us <span className="translation" style={{ display: 'inline', marginLeft: '5px' }}>(Nala Soo Xiriir)</span></a></li>
          </ul>
        </div>
        <div className="footer-policies">
          <h3>Legal <span className="translation">Sharci</span></h3>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy <span className="translation" style={{ display: 'inline', marginLeft: '5px' }}>(Shuruucda Qarsoodiga)</span></Link></li>
            <li><Link to="/terms">Terms of Service <span className="translation" style={{ display: 'inline', marginLeft: '5px' }}>(Shuruucda Adeegga)</span></Link></li>
            <li><Link to="/refund-policy">Refund Policy <span className="translation" style={{ display: 'inline', marginLeft: '5px' }}>(Shuruucda Lacag Celinta)</span></Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-payment-logos" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px' }}>
        <Visa width={40} />
        <Mastercard width={40} />
        <Amex width={40} />
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 FURQAN SWEETS LTD. All rights reserved. <span className="translation">Dhammaan xuquuqaha way xifdisan yihiin.</span></p>
      </div>
    </footer>
  );
}

export default Footer;

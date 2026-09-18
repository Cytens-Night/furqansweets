import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="top-menu">
      <div className="top-menu-inner">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/assets/furqansweets_logo.svg" alt="Furqan Sweets" className="header-logo" />
          </Link>
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {isHome ? (
          <>
            <a href="#halwa" className="nav-link" onClick={closeMenu}>Halwa</a>
            <a href="#bulk" className="nav-link" onClick={closeMenu}>Bulk Orders</a>
          </>
        ) : (
          <>
            <Link to="/#halwa" className="nav-link" onClick={closeMenu}>Halwa</Link>
            <Link to="/#bulk" className="nav-link" onClick={closeMenu}>Bulk Orders</Link>
          </>
        )}
        <Link to="/shop" className="nav-link shop-link" onClick={closeMenu}>Shop Snacks</Link>
      </nav>
    </header>
  );
}

export default Navbar;

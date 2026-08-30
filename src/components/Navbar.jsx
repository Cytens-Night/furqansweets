import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="top-menu">
      <div className="logo">
        <Link to="/">
          <img src="/assets/furqansweets_logo.svg" alt="Furqan Sweets" className="header-logo" />
        </Link>
      </div>
      <nav className="main-nav">
        {isHome ? (
          <>
            <a href="#halwa" className="nav-link">Halwa</a>
            <a href="#bulk" className="nav-link">Bulk Orders</a>
          </>
        ) : (
          <>
            <Link to="/#halwa" className="nav-link">Halwa</Link>
            <Link to="/#bulk" className="nav-link">Bulk Orders</Link>
          </>
        )}
        <Link to="/shop" className="nav-link shop-link">Shop Snacks</Link>
      </nav>
    </header>
  );
}

export default Navbar;

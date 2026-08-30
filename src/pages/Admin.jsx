import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div style={{ background: '#120F0D', color: '#fff', fontFamily: "'Outfit', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', margin: 0, textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#FF5E00', marginBottom: '10px' }}>404</h1>
      <p style={{ color: '#aaa', marginBottom: '20px' }}>The page you are looking for does not exist.</p>
      <Link to="/" style={{ background: 'linear-gradient(135deg, #FF5E00, #E04800)', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600 }}>
        Return to Homepage
      </Link>
    </div>
  );
}

export default Admin;

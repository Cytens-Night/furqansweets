import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useData } from '../context/DataContext';

function Shop() {
  const { data } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh', paddingBottom: '60px' }}>
      <header className="shop-header">
        <h1>Shop All Snacks</h1>
        <p>Browse our complete collection of traditional Somali sweets, biscuits, and extra snacks.</p>
      </header>

      <div className="shop-container">
        
        <div className="shop-category">
          <h2>Biscuit Bags <span className="translation" style={{ fontSize: '0.65em', fontWeight: 400, color: '#8c5d45' }}>(Buskud)</span></h2>
          <div className="shop-grid">
            {data.snacks.filter(p => p.category === 'Biscuits Bags').map(product => (
              <ProductCard key={product.id} product={product} variant="shop" />
            ))}
          </div>
        </div>

        <div className="shop-category">
          <h2>Extra Snacks <span className="translation" style={{ fontSize: '0.65em', fontWeight: 400, color: '#8c5d45' }}>(Fudud Dheeraad ah)</span></h2>
          <div className="shop-grid">
            {data.snacks.filter(p => p.category === 'Extra Snacks').map(product => (
              <ProductCard key={product.id} product={product} variant="shop" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Shop;

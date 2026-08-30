import React from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      {product.isNew && <span className="badge-new">New</span>}
      <img src={product.image} alt={product.title} className="product-img" />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        {product.translation && <p className="product-translation">{product.translation}</p>}
        <p className="product-price">£{product.price.toFixed(2)}</p>
        <button className="btn-add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="collection-card">
      {product.isNew && <span className="badge-new">New</span>}
      <img src={product.image} alt={product.title} className="collection-img" />
      <div className="product-info">
        <h3 className="product-name">{product.title}</h3>
        {product.translation && <p className="product-translation">{product.translation}</p>}
        <p className="price">£{Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;

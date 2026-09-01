import React from 'react';

function ProductCard({ product, variant = 'collection' }) {
  const isShop = variant === 'shop';
  
  const cardClass = isShop ? 'shop-card' : 'collection-card';
  const imgClass = isShop ? 'shop-card-img' : 'collection-img';
  const titleClass = isShop ? 'shop-card-title' : 'product-name';
  const priceClass = isShop ? 'shop-card-price' : 'price';
  
  const title = product.name || product.title;

  return (
    <div className={cardClass}>
      {product.isNew && <span className="badge-new">New</span>}
      <img src={product.image} alt={title} className={imgClass} />
      <div className={isShop ? '' : 'product-info'}>
        <h3 className={titleClass}>{title}</h3>
        {product.translation && <p className="product-translation">{product.translation}</p>}
        <p className={priceClass}>£{Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;

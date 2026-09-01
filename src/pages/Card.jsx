import React from 'react';

function Card() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe src="/card.html" title="Checkout Card" style={{ width: '100%', height: '100%', border: 'none' }} />
    </div>
  );
}

export default Card;

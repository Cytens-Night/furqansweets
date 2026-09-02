import React from 'react';

function Access() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 9999, 
      backgroundColor: '#0F0D0C' 
    }}>
      <iframe src="/access.html" title="CRM Access" style={{ width: '100%', height: '100%', border: 'none' }} />
    </div>
  );
}

export default Access;

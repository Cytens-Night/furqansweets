import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4A2311',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '30px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          zIndex: 999999,
          fontSize: '0.95rem',
          fontWeight: 600,
          animation: 'toastFadeInOut 3.2s ease forwards'
        }}>
          {toastMessage}
          <style>
            {`
              @keyframes toastFadeInOut {
                0% { opacity: 0; bottom: 0px; }
                10% { opacity: 1; bottom: 20px; }
                90% { opacity: 1; bottom: 20px; }
                100% { opacity: 0; bottom: 0px; }
              }
            `}
          </style>
        </div>
      )}
    </ToastContext.Provider>
  );
};

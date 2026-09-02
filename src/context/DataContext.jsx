import React, { createContext, useContext, useState, useEffect } from 'react';
import staticData from '../data.json';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(staticData);

  const loadData = () => {
    try {
      const localStr = localStorage.getItem('furqan_crm_data');
      if (localStr) {
        const parsed = JSON.parse(localStr);
        if (parsed && parsed.siteSettings) {
          setData(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to parse CRM data from localStorage', e);
    }
    // Fallback to static if empty
    setData(staticData);
  };

  useEffect(() => {
    // Initial load
    loadData();

    // Listen to changes in other tabs or iframe
    const handleStorage = (e) => {
      if (e.key === 'furqan_crm_data') {
        loadData();
      }
    };
    
    // We also can poll every second since iframe might not reliably trigger 'storage' event in some browsers
    const intervalId = setInterval(loadData, 2000);

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

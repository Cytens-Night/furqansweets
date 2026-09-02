import React, { createContext, useContext, useState, useEffect } from 'react';
import staticData from '../data.json';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(staticData);

  const syncFromLocal = () => {
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
    // Fallback if local is empty/invalid
    setData(staticData);
  };

  const syncFromSupabase = async () => {
    try {
      const SUPABASE_URL = "https://twzkccwkatbczcflyxet.supabase.co";
      const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3emtjY3drYXRiY3pjZmx5eGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM2NDcsImV4cCI6MjEwMTA3OTY0N30.hx3N-k7Ptc3i4lYa1G3tLUxOq5PjEAw6UZ7ctHSXiXU";
      
      const res = await fetch(`${SUPABASE_URL}/rest/v1/store_config?id=eq.furqan-main&select=*`, {
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      });
      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) {
            const row = rows[0];
            const srvData = {
                siteSettings: row.site_settings_json || {},
                halwaVariants: row.halwa_variants_json || [],
                snacks: row.snacks_json || []
            };
            setData(srvData);
            localStorage.setItem('furqan_crm_data', JSON.stringify(srvData));
        }
      }
    } catch (e) {
      console.error('Failed to fetch from Supabase', e);
    }
  };

  useEffect(() => {
    // 1. Instantly load from local cache for speed
    syncFromLocal();
    
    // 2. Fetch fresh data from Supabase in the background
    syncFromSupabase();

    // 3. Listen to changes in other tabs or CRM iframe (saves to localStorage)
    const handleStorage = (e) => {
      if (e.key === 'furqan_crm_data') {
        syncFromLocal();
      }
    };
    
    // Fallback polling for iframe sync issues
    const intervalId = setInterval(syncFromLocal, 2000);

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

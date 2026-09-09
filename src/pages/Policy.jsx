import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';

function Policy({ type }) {
  const { siteSettings: s = {} } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const renderText = (text) => {
    return text.split('\n\n').map((block, idx) => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length > 1 && lines[0].length < 40 && !lines[0].endsWith('.')) {
         return (
             <React.Fragment key={idx}>
                 <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>{lines[0]}</h3>
                 <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>{lines.slice(1).join(' ')}</p>
             </React.Fragment>
         );
      }
      return <p key={idx} style={{ marginBottom: '16px', lineHeight: '1.7' }}>{block}</p>;
    });
  };

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      content: s.privacyPolicyText ? renderText(s.privacyPolicyText) : (
        <>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>We value your privacy. We only collect the necessary information to process your orders and ensure the best experience possible.</p> 
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Data Collection</h3> 
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>Any personal details shared with us, such as names, phone numbers, or addresses for orders, are kept strictly confidential and are not shared with third parties.</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Payment Processing</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>All online payments are securely processed by our PCI-compliant payment provider, Dojo (Paymentsense Ltd). We do not store your credit card or payment information on our servers.</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Contact Us</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>If you have any questions regarding this privacy policy, please contact us at {s.publicEmail || 'info@furqansweets.com'}.</p>
        </>
      )
    },
    terms: {
      title: 'Terms of Service',
      content: s.termsPolicyText ? renderText(s.termsPolicyText) : (
        <>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>By placing an order with FURQAN SWEETS LTD, you agree to the following terms and conditions.</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Orders and Cancellation</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>All online bulk orders require a minimum of 48 hours notice. Cancellations must be made at least 24 hours prior to the pickup date to receive a full refund.</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Product Information</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>Our halwa is made with fresh ingredients. Please note that products containing nuts are prepared in the same facility and cross-contamination may occur.</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Payment</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>Full payment is required at the time of order placement. We accept all major credit and debit cards securely through Dojo.</p>
        </>
      )
    },
    refund: {
      title: 'Refund Policy',
      content: s.refundPolicyText ? renderText(s.refundPolicyText) : (
        <>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>Your satisfaction is our priority at FURQAN SWEETS LTD. Due to the perishable nature of our products, our refund policy is as follows:</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Cancellations</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>Orders can be cancelled with a full refund if the request is made at least 24 hours before the scheduled pickup time.</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Issues with Orders</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>If you are unsatisfied with your order upon collection, please let us know immediately so we can rectify the issue or process a refund.</p>
          <h3 style={{ fontSize: '1.25rem', color: '#4A2311', marginTop: '24px', marginBottom: '8px', fontWeight: '800' }}>Refund Processing Time</h3>
          <p style={{ marginBottom: '16px', lineHeight: '1.7' }}>Approved refunds are processed back to the original payment method (via Dojo) and may take 3-5 business days to appear on your statement.</p>
        </>
      )
    }
  };

  const selectedPolicy = policies[type];

  return (
    <div style={{ backgroundColor: '#faf8f5', minHeight: '80vh', padding: '60px 20px' }}>
      <section className="policy-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: '#FF5E00', marginBottom: '20px', fontSize: '2.5rem' }}>{selectedPolicy.title}</h1>
        <div style={{ color: '#6d4834', fontSize: '1.05rem', lineHeight: '1.6' }}>
          {selectedPolicy.content}
        </div>
      </section>
    </div>
  );
}

export default Policy;

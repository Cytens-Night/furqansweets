import React, { useEffect } from 'react';

function Policy({ type }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      content: (
        <>
          <p>We value your privacy. We only collect the necessary information to process your orders and ensure the best experience possible.</p> 
          <h3>Data Collection</h3> 
          <p>Any personal details shared with us, such as names, phone numbers, or addresses for orders, are kept strictly confidential and are not shared with third parties.</p>
          <h3>Payment Processing</h3>
          <p>All online payments are securely processed by our PCI-compliant payment provider, Dojo (Paymentsense Ltd). We do not store your credit card or payment information on our servers.</p>
          <h3>Contact Us</h3>
          <p>If you have any questions regarding this privacy policy, please contact us at info@furqansweets.com.</p>
        </>
      )
    },
    terms: {
      title: 'Terms of Service',
      content: (
        <>
          <p>By placing an order with FURQAN SWEETS LTD, you agree to the following terms and conditions.</p>
          <h3>Orders and Cancellation</h3>
          <p>All online bulk orders require a minimum of 48 hours notice. Cancellations must be made at least 24 hours prior to the pickup date to receive a full refund.</p>
          <h3>Product Information</h3>
          <p>Our halwa is made with fresh ingredients. Please note that products containing nuts are prepared in the same facility and cross-contamination may occur.</p>
          <h3>Payment</h3>
          <p>Full payment is required at the time of order placement. We accept all major credit and debit cards securely through Dojo.</p>
        </>
      )
    },
    refund: {
      title: 'Refund Policy',
      content: (
        <>
          <p>Your satisfaction is our priority at FURQAN SWEETS LTD. Due to the perishable nature of our products, our refund policy is as follows:</p>
          <h3>Cancellations</h3>
          <p>Orders can be cancelled with a full refund if the request is made at least 24 hours before the scheduled pickup time.</p>
          <h3>Issues with Orders</h3>
          <p>If you are unsatisfied with your order upon collection, please let us know immediately so we can rectify the issue or process a refund.</p>
          <h3>Refund Processing Time</h3>
          <p>Approved refunds are processed back to the original payment method (via Dojo) and may take 3-5 business days to appear on your statement.</p>
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

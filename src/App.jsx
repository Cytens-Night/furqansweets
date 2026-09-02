import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import BulkModal from './components/BulkModal';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Admin from './pages/Admin';
import Access from './pages/Access';
import Card from './pages/Card';
import Policy from './pages/Policy';

function App() {
  return (
    <DataProvider>
      <ToastProvider>
        <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/access" element={<Access />} />
            <Route path="/card" element={<Card />} />
            <Route path="/privacy-policy" element={<Policy type="privacy" />} />
            <Route path="/terms" element={<Policy type="terms" />} />
            <Route path="/refund-policy" element={<Policy type="refund" />} />
          </Routes>
          <Footer />
          <CheckoutModal />
          <BulkModal />
        </Router>
        </CartProvider>
      </ToastProvider>
    </DataProvider>
  );
}

export default App;

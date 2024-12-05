import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PayPalScriptProvider options={{ "AcKFcoq5Yg0UfbHxLdeTvZpJmCSopQ0h47JNohpVxUwCWITeibULy2AZPbIdEOCd_IL9tbwkYWS1KjPs": "test" }}>
          <Router>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
import React from 'react';
import ProductPage from './pages/ProductPage';
import { ProductProvider } from './contexts/ProductContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ProductProvider>
      <ProductPage />
      <ToastContainer position="top-right" autoClose={3000} />
    </ProductProvider>
  );
}

export default App;

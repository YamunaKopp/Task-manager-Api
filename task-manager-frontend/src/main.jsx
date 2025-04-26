import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Toaster } from 'react-hot-toast'; // ✅ VERY IMPORTANT!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" reverseOrder={false} /> {/* ✅ Toast available everywhere */}
    </BrowserRouter>
  </React.StrictMode>
);

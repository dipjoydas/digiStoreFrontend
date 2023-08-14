import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/Cart_context.jsx'
import { AuthProvider } from './context/Auth_context.jsx'
import { CompareProvider } from './context/Compare_context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CompareProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </CompareProvider>
    </AuthProvider>
  </React.StrictMode>,
)

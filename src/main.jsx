import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Add this import statement
import App from './components/App.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
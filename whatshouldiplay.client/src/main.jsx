import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";


import './index.css'
import About from './About.jsx'; 
import App from './App.jsx'
import Steam from './Routes/Steam';
import MarvelRivals from './Routes/MarvelRivals';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/steam" element={<Steam />} />
                <Route path="/marvelrivals" element={<MarvelRivals />} />

            </Routes>
        </BrowserRouter>
  </StrictMode>,
)

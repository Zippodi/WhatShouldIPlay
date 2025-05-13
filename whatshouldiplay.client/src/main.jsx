import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";


import './index.css'
import Register from './Routes/Register'
import Login from './Routes/Login'
import App from './App.jsx'
import Steam from './Routes/Steam';
import MarvelRivals from './Routes/MarvelRivals';
import EditProfile from './Routes/EditProfile';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/steam" element={<Steam />} />
                <Route path="/marvelrivals" element={<MarvelRivals />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="editprofile" element={<EditProfile />} />
            </Routes>
        </BrowserRouter>
  </StrictMode>,
)

import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router';

export default function ProfileDropdown({ username }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const links = [
        { path: '/', label: 'Home' },
        { path: '/marvelrivals', label: 'Choose a Marvel Rivals Character!' },
        { path: '/steam', label: 'Choose a Steam Game!' },
        { path: '/editprofile', label: 'Edit Profile' },
    ]
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("wsip_user");
        navigate("/");
        window.location.reload(); // Ensures header and any other state-dependent components update
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500 hover:bg-blue-400 font-bold drop-shadow-[0_0_10px_#60a5fa] text-black px-4 py-2 rounded"
            >
                {username}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-[#161b22] text-white rounded shadow-lg z-50">
                    {links
                        .filter(link => link.path !== currentPath)
                        .map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setOpen(false)}
                                className="block px-4 py-2 hover:bg-blue-600 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-blue-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

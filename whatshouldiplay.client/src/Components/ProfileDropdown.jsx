import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router';

export default function ProfileDropdown({ username, isMobile = false }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const links = [
        { path: '/', label: 'Home' },
        { path: '/marvelrivals', label: 'Choose a Marvel Rivals Character!' },
        { path: '/steam', label: 'Choose a Steam Game!' },
        { path: '/editprofile', label: 'Edit Profile' },
    ];

    const handleLogout = () => {
        localStorage.removeItem("wsip_user");
        navigate("/");
        window.location.reload(); // Kept as per original, but see notes for optimization
    };

    // Mobile: Render links directly as a vertical list
    if (isMobile) {
        return (
            <div className="flex flex-col space-y-2">
                {links
                    .filter(link => link.path !== currentPath)
                    .map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-2 text-white hover:bg-blue-600 transition-colors rounded"
                        >
                            {link.label}
                        </Link>
                    ))}
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600 transition-colors rounded"
                >
                    Logout
                </button>
            </div>
        );
    }

    // Desktop: Render as a toggleable dropdown
    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500 hover:bg-blue-400 font-bold drop-shadow-[0_0_10px_#60a5fa] text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base"
            >
                {username}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-[#161b22] text-white rounded shadow-lg z-50">
                    {links
                        .filter(link => link.path !== currentPath)
                        .map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setOpen(false)}
                                className="block px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-600 transition-colors text-sm sm:text-base"
                            >
                                {link.label}
                            </Link>
                        ))}
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-blue-600 transition-colors text-sm sm:text-base"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
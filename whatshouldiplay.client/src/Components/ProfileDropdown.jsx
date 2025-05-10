import { useState } from "react";
import { Link } from 'react-router';

export default function ProfileDropdown({ username }) {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("wsip_user");
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
                    <Link
                        to="/editprofile"
                        className="block px-4 py-2 hover:bg-blue-600 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Edit Profile
                    </Link>
                    <Link
                        to="/marvelrivals"
                        className="block px-4 py-2 hover:bg-blue-600 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Choose a Marvel Rivals Character!
                    </Link>
                    <Link
                        to="/steam"
                        className="block px-4 py-2 hover:bg-blue-600 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Choose a Steam Game!
                    </Link>
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

import { useEffect, useState } from 'react';
import '../App.css';
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router'; // Kept as per your instruction
import { Menu, X } from 'lucide-react';

function Header() {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("wsip_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-[#161b22] text-white shadow-md">
            <div className="max-w-full mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left">
                    What Should I Play?
                </h1>

                <div className="hidden md:flex items-center space-x-4 ml-auto">
                    {user ? (
                        <ProfileDropdown username={user.username} />
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="bg-blue-500 hover:bg-blue-400 font-bold drop-shadow-[0_0_10px_#60a5fa] text-black px-4 py-2 rounded">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-blue-500 hover:bg-blue-400 font-bold drop-shadow-[0_0_10px_#60a5fa] text-black px-4 py-2 rounded">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-[#161b22] px-4 py-4 border-t border-gray-700">
                    {user ? (
                        <ProfileDropdown username={user.username} isMobile={true} />
                    ) : (
                        <div className="flex flex-col space-y-4">
                            <Link to="/login" onClick={toggleMenu}>
                                <button className="w-full bg-blue-500 hover:bg-blue-400 font-bold drop-shadow-[0_0_10px_#60a5fa] text-black px-4 py-2 rounded">
                                    Login
                                </button>
                            </Link>
                            <Link to="/register" onClick={toggleMenu}>
                                <button className="w-full bg-blue-500 hover:bg-blue-400 font-bold drop-shadow-[0_0_10px_#60a5fa] text-black px-4 py-2 rounded">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
//import { useEffect, useState } from 'react';
import '../App.css';
import ProfileDropdown from './ProfileDropdown';

import { Link } from 'react-router';
function Header() {



    return (
        <div className="bg-[#161b22] text-white shadow-md">
            <div className="max-w-full mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-5xl font-bold text-center md:text-left">What Should I Play?</h1>
                <div className="flex space-x-4 ml-auto hidden md:flex">
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
                    <ProfileDropdown username="Zippodi" />
                </div>
            </div>
        </div>



    );


}

export default Header;

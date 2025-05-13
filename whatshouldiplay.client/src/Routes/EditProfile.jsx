import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import '../App.css'; // Ensure custom styles are imported
import Header from '../Components/Header';

export default function EditProfile() {
    const [user, setUser] = useState({
        username: '',
        marvelrivalsusername: '',
        steamid: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Pre-populate form with user data from localStorage
        const storedUser = localStorage.getItem("wsip_user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
                username: parsedUser.username || '',
                marvelrivalsusername: parsedUser.marvelrivalsusername || '',
                steamid: parsedUser.steamid || '',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate saving to localStorage or an API
        setTimeout(() => {
            localStorage.setItem("wsip_user", JSON.stringify(user));
            setLoading(false);
            alert('Profile updated successfully!');
            // Add navigation or API call here if needed
        }, 2000); // 2-second delay for demonstration
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Header />
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center">Edit Your Profile</h1>

                    {loading ? (
                        <div className="flex justify-center items-center text-xl">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your username"
                                />
                            </div>

                            {/* Marvel Rivals Username */}
                            <div className="mb-4">
                                <label htmlFor="marvelrivalsusername" className="block text-sm font-medium text-gray-300 mb-2">
                                    Marvel Rivals Username
                                </label>
                                <input
                                    type="text"
                                    id="marvelrivalsusername"
                                    name="marvelrivalsusername"
                                    value={user.marvelrivalsusername}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your Marvel Rivals username"
                                />
                            </div>

                            {/* Steam ID */}
                            <div className="mb-4">
                                <label htmlFor="steamid" className="block text-sm font-medium text-gray-300 mb-2">
                                    Steam ID
                                </label>
                                <input
                                    type="text"
                                    id="steamid"
                                    name="steamid"
                                    value={user.steamid}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your Steam ID"
                                />
                            </div>

                            {/* Save Changes Button */}
                            <div className="mt-6 text-center">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                                >
                                    Save Changes
                                </button>
                            </div>

                            {/* Cancel Button */}
                            <div className="mt-4 text-center">
                                <Link
                                    to="/"
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-2xl shadow inline-block"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
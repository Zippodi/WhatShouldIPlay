import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';

function Register() {
    const [username, setUsername] = useState("");
    const [steamId, setSteamId] = useState("");
    const [marvelUsername, setMarvelUsername] = useState("");
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registering in with:", { username, steamId, marvelUsername });
        const user = { username, steamId, marvelUsername };
        localStorage.setItem("wsip_user", JSON.stringify(user));
        console.log("Registered and stored in localStorage:", user);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                        required
                    />
                    <label htmlFor="steamId" className="block text-sm font-medium text-gray-300 mb-2">
                        Steam ID
                    </label>
                    <input
                        type="text"
                        id="steamId"
                        value={steamId}
                        onChange={(e) => setSteamId(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Steam ID"
                        required
                    />
                    <p className="text-sm text-gray-400 mb-4">
                        You can find your Steam ID by going to your Steam Profile, then Account Details, and then you can find it under your username. 
                    </p>
                    <label htmlFor="marvelUsername" className="block text-sm font-medium text-gray-300 mb-2">
                        Marvel Rivals Username
                    </label>
                    <input
                        type="text"
                        id="marvelUsername"
                        value={marvelUsername}
                        onChange={(e) => setMarvelUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Marvel Rivals Username"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );


}

export default Register;

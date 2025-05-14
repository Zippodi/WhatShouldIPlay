import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';

function Register() {
    const [username, setUsername] = useState("");
    const [steamId, setSteamId] = useState("");
    const [marvelRivalsUsername, setMarvelRivalsUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear any previous error

        const user = {
            username,
            steamId,
            marvelRivalsUsername,
        };

        try {
            const response = await fetch(`https://whatshouldiplayserver20250513213811-abb0gfhdeqhhdebd.canadacentral-01.azurewebsites.net/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.status === 400) {
                setError("Username is required.");
                return;
            }

            if (response.status === 409) {
                setError("A user with that username already exists.");
                return;
            }

            if (!response.ok) {
                setError("An unexpected error occurred.");
                return;
            }

            const registeredUser = await response.json();
            localStorage.setItem("wsip_user", JSON.stringify(registeredUser));
            console.log("User registered and stored in localStorage:", registeredUser);
            navigate("/");
        } catch (err) {
            console.error("Registration error:", err);
            setError("Could not connect to the server.");
        }
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

                    <label htmlFor="steamId" className="block text-sm font-medium text-gray-300 mb-2 mt-4">
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

                    <label htmlFor="marvelRivalsUsername" className="block text-sm font-medium text-gray-300 mb-2">
                        Marvel Rivals Username
                    </label>
                    <input
                        type="text"
                        id="marvelRivalsUsername"
                        value={marvelRivalsUsername}
                        onChange={(e) => setMarvelRivalsUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Marvel Rivals Username"
                        required
                    />

                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;

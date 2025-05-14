import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';

function Login() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://whatshouldiplayserver20250513213811-abb0gfhdeqhhdebd.canadacentral-01.azurewebsites.net/user/currentuser/${encodeURIComponent(username)}`);

            if (!response.ok) {
                if (response.status === 404) {
                    setError("User not found.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
                return;
            }

            const user = await response.json();
            localStorage.setItem("wsip_user", JSON.stringify(user));
            console.log("User fetched and stored in localStorage:", user);
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError("Could not connect to the server.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
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
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
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

export default Login;

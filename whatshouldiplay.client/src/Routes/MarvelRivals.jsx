import { useState } from 'react';
import '../App.css'; // Make sure your custom styles are imported if needed

export default function MarvelRivals() {
    const [season, setSeason] = useState("all");
    const [playstyles, setPlaystyles] = useState([]);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    const [audio] = useState(new Audio("/wolverine_claw.mp3")); // Replace with the path to your MP3 file

    // Placeholder fetch function (not implemented yet)
    const fetchHeroes = () => {
        setLoading(true);
        // Placeholder for the fetch request
        setTimeout(() => {
            // Simulate loading end
            setLoading(false);
            // You can add fetch logic here when you're ready
        }, 2000); // 2 seconds for demonstration
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchHeroes();
    };

    const handleWolverineClick = () => {
        audio.play();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-6">
            <div className="bg-gray-800 p-8 rounded-2xl shadow max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Marvel Rivals Character</h1>

                {loading ? (
                    <div className="flex justify-center items-center text-xl">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Season Selection */}
                        <div className="mb-4">
                            <label htmlFor="season" className="block text-sm font-medium text-gray-300 mb-2">
                                Select Season
                            </label>
                            <select
                                id="season"
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Seasons</option>
                                <option value="1">Season 1</option>
                                <option value="2">Season 2</option>
                            </select>
                        </div>

                        {/* Playstyle Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Select Playstyles</label>
                            <div className="flex flex-wrap space-x-4">
                                {["dive", "peel", "shield", "poke", "pressure", "control", "flank", "buff", "heal", "sniper"].map((playstyle) => (
                                    <label key={playstyle} className="inline-flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={playstyle}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setPlaystyles([...playstyles, playstyle]);
                                                } else {
                                                    setPlaystyles(playstyles.filter((ps) => ps !== playstyle));
                                                }
                                            }}
                                            className="form-checkbox text-blue-500"
                                        />
                                        <span>{playstyle}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                                Select Role
                            </label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Choose a Role</option>
                                <option value="duelist">Duelist</option>
                                <option value="vanguard">Vanguard</option>
                                <option value="strategist">Strategist</option>
                            </select>
                        </div>

                            {/* WOLVERINE! Button */}
                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleWolverineClick}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                                >
                                    WOLVERINE!
                                </button>
                            </div>

                        {/* Pick My Hero Button */}
                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                            >
                                Pick My Hero!
                            </button>
                        </div>
                    </form>
                )}

                
            </div>
        </div>
    );
}



//async function fetchAllHeroes() {
//    const response = await fetch('hero/mostPlayedHeroes/Zippodi');
//    if (response.ok) {
//        const data = await response.json();
//        console.log(data);
//        setHeroes(data);
//    } else {
//        console.error('Failed to fetch heroes');
//    }
//}
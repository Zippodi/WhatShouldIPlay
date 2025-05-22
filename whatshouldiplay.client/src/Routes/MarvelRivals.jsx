import { useState, useRef } from 'react';
import '../App.css';
import Header from '../Components/Header';
import ChosenHero from '../Components/ChosenHero';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

export default function MarvelRivals() {
    const [season, setSeason] = useState("all");
    const [playstyles, setPlaystyles] = useState([]);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [chosenHero, setChosenHero] = useState(null);
    const [width, height] = useWindowSize();

    const wolverineAudio = useRef(new Audio("/wolverine_claw.mp3"));
    const confettiAudio = useRef(new Audio("/Confetti.mp3"));

    const fetchHeroes = async () => {
        setLoading(true);
        setChosenHero(null);

        const username = "someUsername"; // Replace this with your actual logic for getting the username
        const baseUrl = "https://whatshouldiplayserver20250513213811-abb0gfhdeqhhdebd.canadacentral-01.azurewebsites.net";
        const endpoint = season === "all"
            ? `/hero/mostPlayedHeroes/${encodeURIComponent(username)}`
            : `/hero/mostPlayedHeroes/${encodeURIComponent(username)}/${season}`;

        try {
            const response = await fetch(`${baseUrl}${endpoint}`);
            if (!response.ok) throw new Error("Failed to fetch heroes");
            const heroes = await response.json();

            // Filter by role
            let filteredHeroes = heroes;
            if (role) {
                filteredHeroes = filteredHeroes.filter(hero => hero.role.toLowerCase() === role.toLowerCase());
            }

            // Filter by playstyles (at least one match)
            if (playstyles.length > 0) {
                filteredHeroes = filteredHeroes.filter(hero =>
                    playstyles.some(style => hero.playstyles.includes(style))
                );
            }

            if (filteredHeroes.length === 0) {
                alert("No heroes found with those filters.");
                setLoading(false);
                return;
            }

            // Pick a random hero from filtered list
            const randomHero = filteredHeroes[Math.floor(Math.random() * filteredHeroes.length)];

            // Use hardcoded image for now
            setChosenHero({
                name: randomHero.name,
                image: "wintersoldier.webp",
            });

            // Play confetti sound effect
            confettiAudio.current.currentTime = 0;
            confettiAudio.current.play();
        } catch (error) {
            console.error(error);
            alert("Something went wrong while fetching heroes.");
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchHeroes();
    };

    const handleTryAgain = () => {
        setChosenHero(null);
    };

    const handleWolverineClick = () => {
        wolverineAudio.current.currentTime = 0;
        wolverineAudio.current.play();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Header />
            {chosenHero && <Confetti width={width} height={height} />}
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Marvel Rivals Character</h1>

                    {loading ? (
                        <div className="flex justify-center items-center text-xl">
                            <p>Loading...</p>
                        </div>
                    ) : chosenHero ? (
                        <>
                            <ChosenHero name={chosenHero.name} imageId={chosenHero.imageId} />
                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleTryAgain}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                                >
                                    Try Again
                                </button>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="season" className="block text-sm font-medium text-gray-300 mb-2">
                                    Select Season
                                </label>
                                <select
                                    id="season"
                                    value={season}
                                    onChange={(e) => setSeason(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Seasons</option>
                                    <option value="1">Season 1</option>
                                    <option value="2">Season 2</option>
                                </select>
                            </div>

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

                            <div className="mb-4">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                                    Select Role
                                </label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Choose a Role</option>
                                    <option value="duelist">Duelist</option>
                                    <option value="vanguard">Vanguard</option>
                                    <option value="strategist">Strategist</option>
                                </select>
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    type="button"
                                    onClick={handleWolverineClick}
                                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                                >
                                    WOLVERINE!
                                </button>
                            </div>

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
        </div>
    );
}

import { useState, useRef, useEffect } from 'react';
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
    const [user, setUser] = useState(null);
    const [useStats, setUseStats] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("wsip_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const wolverineAudio = useRef(new Audio("/wolverine_claw.mp3"));
    const confettiAudio = useRef(new Audio("/Confetti.mp3"));

    const fetchHeroes = async () => {
        setLoading(true);
        setChosenHero(null);
        setErrorMessage(null);

        const baseUrl = "https://whatshouldiplayserver20250513213811-abb0gfhdeqhhdebd.canadacentral-01.azurewebsites.net";
        let endpoint;

        if (useStats && user?.marvelRivalsUsername) {
            endpoint = season === "all"
                ? `/hero/mostPlayedHeroes/${encodeURIComponent(user.marvelRivalsUsername)}`
                : `/hero/mostPlayedHeroes/${encodeURIComponent(user.marvelRivalsUsername)}/${season}`;
        } else {
            endpoint = '/hero';
        }

        try {
            const response = await fetch(`${baseUrl}${endpoint}`);
            if (!response.ok) throw new Error("Failed to fetch heroes");
            let heroes = await response.json();

            // Ensure playstylesArray is used for filtering
            heroes = heroes.map(hero => ({
                ...hero,
                playstylesArray: hero.playstylesArray || hero.playstyles.split(',').map(style => style.trim())
            }));

            // Filter by role
            let filteredHeroes = heroes;
            if (role) {
                filteredHeroes = filteredHeroes.filter(hero => hero.role.toLowerCase() === role.toLowerCase());
            }

            // Filter by playstyles (all selected playstyles must match)
            if (playstyles.length > 0) {
                filteredHeroes = filteredHeroes.filter(hero =>
                    playstyles.every(style => hero.playstylesArray.includes(style))
                );
            }

            if (filteredHeroes.length === 0) {
                alert("No heroes found with those filters.");
                setLoading(false);
                return;
            }

            // Pick a random hero from filtered list
            const randomHero = filteredHeroes[Math.floor(Math.random() * filteredHeroes.length)];

            // Use API-provided imageId
            setChosenHero({
                name: randomHero.name,
                imageId: randomHero.imageId || "wintersoldier.webp",
            });

            // Play confetti sound effect
            confettiAudio.current.currentTime = 0;
            confettiAudio.current.play();
        } catch (error) {
            console.error(error);
            if (useStats) {
                setErrorMessage("Failed to fetch stats, try not using them.");
            } else {
                alert("Something went wrong while fetching heroes.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchWolverine = async () => {
        setLoading(true);
        setChosenHero(null);
        setErrorMessage(null);

        const baseUrl = "https://whatshouldiplayserver20250513213811-abb0gfhdeqhhdebd.canadacentral-01.azurewebsites.net";
        const endpoint = '/hero/Wolverine';

        try {
            const response = await fetch(`${baseUrl}${endpoint}`);
            if (!response.ok) throw new Error("Failed to fetch Wolverine");
            const wolverine = await response.json();

            // Set Wolverine as the chosen hero
            setChosenHero({
                name: wolverine.name,
                imageId: wolverine.imageId || "wintersoldier.webp",
            });

            // Play both wolverine and confetti sound effects
            wolverineAudio.current.currentTime = 0;
            wolverineAudio.current.play();
            confettiAudio.current.currentTime = 0;
            confettiAudio.current.play();
        } catch (error) {
            console.error(error);
            alert("Something went wrong while fetching Wolverine.");
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
        setErrorMessage(null);
    };

    const handleWolverineClick = () => {
        fetchWolverine();
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
                            {errorMessage && (
                                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                            )}
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
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Use Player Statistics
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={useStats}
                                        onChange={(e) => setUseStats(e.target.checked)}
                                        className="form-checkbox text-blue-500"
                                    />
                                    <span className="ml-2">Use my stats</span>
                                </label>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="season" className="block text-sm font-medium text-gray-300 mb-2">
                                    Select Season
                                </label>
                                <select
                                    id="season"
                                    value={season}
                                    onChange={(e) => setSeason(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!useStats}
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

                            {errorMessage && (
                                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                            )}

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
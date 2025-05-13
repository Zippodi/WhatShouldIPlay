import { useState, useRef } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import Header from '../Components/Header';
import ChosenGame from '../Components/ChosenGame';
import Confetti from 'react-confetti';

const genres = [
    'Action', 'Adventure', 'Casual', 'Indie', 'Massively Multiplayer', 'Racing',
    'RPG', 'Simulation', 'Sports', 'Strategy', 'Puzzle', 'Horror', 'Platformer'
];

export default function SteamPage() {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [preference, setPreference] = useState('new');
    const [loading, setLoading] = useState(false);
    const [chosenGame, setChosenGame] = useState(null);
    const [useSteamAPI, setUseSteamAPI] = useState(false);
    const [width, height] = useWindowSize();

    const confettiAudio = useRef(new Audio("/Confetti.mp3"));

    const handlePickGame = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // For demonstration, we'll choose "Kingdom Hearts III" and its app ID
            setChosenGame({
                name: "Kingdom Hearts III",
                appId: 2552450
            });

            // Play the confetti sound effect
            confettiAudio.current.currentTime = 0;
            confettiAudio.current.play();
        }, 2000); // Simulate loading delay
    };

    const handleTryAgain = () => {
        setChosenGame(null);
        setSelectedGenre('');
        setPreference('new');
        setUseSteamAPI(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Header />
            {chosenGame && <Confetti width={width} height={height} />}
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-xl">
                    {/* If no game is chosen, show the game picker */}
                    {!chosenGame && (
                        <>
                            <h1 className="text-3xl font-bold text-center mb-6">Steam Game Picker</h1>

                            {/* Genre Selection */}
                            <label className="block text-sm mb-2 text-gray-300">Select a Genre</label>
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="w-full mb-4 px-4 py-2 bg-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Choose a genre --</option>
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>

                            {/* Preference Selection */}
                            <label className="block text-sm mb-2 text-gray-300">Do you want a game you've played before or something new?</label>
                            <div className="flex space-x-4 mb-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="new"
                                        checked={preference === 'new'}
                                        onChange={(e) => setPreference(e.target.value)}
                                        className="mr-2"
                                    />
                                    New
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="played"
                                        checked={preference === 'played'}
                                        onChange={(e) => setPreference(e.target.value)}
                                        className="mr-2"
                                    />
                                    Played Before
                                </label>
                            </div>

                            {/* Steam API Option */}
                            <label className="block text-sm mb-2 text-gray-300">Would you like to use your Steam API Statistics?</label>
                            <div className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    checked={useSteamAPI}
                                    onChange={() => setUseSteamAPI(!useSteamAPI)}
                                    className="mr-2"
                                />
                                <span className="text-sm">Use Steam API (retrieves latest Steam statistics, may take up to 2 minutes)</span>
                            </div>

                            {/* Pick My Game Button */}
                            <button
                                onClick={handlePickGame}
                                className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-2xl shadow"
                            >
                                Pick My Game!
                            </button>

                            {loading && (
                                <p className="text-center text-gray-300 mt-4 animate-pulse">Finding the perfect game...</p>
                            )}
                        </>
                    )}

                    {/* If a game is chosen, show only the game and the try again button */}
                    {chosenGame && (
                        <>
                            <ChosenGame name={chosenGame.name} appId={chosenGame.appId} />
                            <button
                                onClick={handleTryAgain}
                                className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                            >
                                Try Again
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

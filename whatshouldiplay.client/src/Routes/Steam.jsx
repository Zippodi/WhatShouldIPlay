import { useState } from 'react';
import { Link } from 'react-router';
import Header from '../Components/Header';



const genres = [
    'Action', 'Adventure', 'Casual', 'Indie', 'Massively Multiplayer', 'Racing',
    'RPG', 'Simulation', 'Sports', 'Strategy', 'Puzzle', 'Horror', 'Platformer'
];

export default function SteamPage() {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [preference, setPreference] = useState('new');
    const [loading, setLoading] = useState(false);
    const [useSteamAPI, setUseSteamAPI] = useState(false);

    const handlePickGame = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Your fetch logic goes here
        }, 2000); // Simulated loading delay
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-xl">
                    <h1 className="text-3xl font-bold text-center mb-6">Steam Game Picker</h1>

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
                    <button
                        onClick={handlePickGame}
                        className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-2xl shadow"
                    >
                        Pick My Game!
                    </button>

                    {loading && (
                        <p className="text-center text-gray-300 mt-4 animate-pulse">Finding the perfect game...</p>
                    )}
                </div>
            </div>
            
        </div>
    );
}





//import { useEffect, useState } from 'react';
//import { Link } from 'react-router';


//function Steam() {
//    const [games, setGames] = useState([]);

//    useEffect(() => {
//        fetchGames();
//    }, []);

//    const contents = games.length === 0
//        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
//        : <ul>
//            {games.map(game =>

//                <li key={game.id}>
//                    <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.SteamID}/${game.imageIconHash}.jpg`} alt="icon" />
//                    <img
//                        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.SteamID}/header.jpg`}
//                        onError={(e) => { e.target.src = '/assets/react.svg'; }}
//                        alt="Game Header"
//                    />

//                    {game.name}
//                </li>
//            )}
//        </ul>;

   
   


//    return (
//        <div>
//            <h1 className="text-3xl font-bold underline">Games List</h1>
//            <p><Link to="/">Go to Home Page</Link></p>
//            <p><Link to="/marvelrivals">Go to Marvel Rivals Page</Link></p>
//            <p>This component demonstrates fetching data from the server.</p>
//            {contents}
//        </div>
//    );

//    async function fetchGames() {
//        const response = await fetch('steamgame/steamgames/76561198150694738');
//        if (response.ok) {
//            const data = await response.json();
//            console.log(data);
//            setGames(data);
//        } else {
//            console.error('Failed to fetch games');
//        }
//    }
    
//}
//export default Steam;

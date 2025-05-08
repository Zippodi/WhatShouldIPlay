import { useEffect, useState } from 'react';
import { Link } from 'react-router';


function Steam() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const contents = games.length === 0
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <ul>
            {games.map(game =>

                <li key={game.id}>
                    <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.SteamID}/${game.imageIconHash}.jpg`} alt="icon" />
                    <img
                        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.SteamID}/header.jpg`}
                        onError={(e) => { e.target.src = '/assets/react.svg'; }}
                        alt="Game Header"
                    />

                    {game.name}
                </li>
            )}
        </ul>;

   
   


    return (
        <div>
            <h1 className="text-3xl font-bold underline">Games List</h1>
            <p><Link to="/">Go to Home Page</Link></p>
            <p><Link to="/marvelrivals">Go to Marvel Rivals Page</Link></p>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function fetchGames() {
        const response = await fetch('steamgame/steamgames/76561198150694738');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setGames(data);
        } else {
            console.error('Failed to fetch games');
        }
    }
    
}
export default Steam;

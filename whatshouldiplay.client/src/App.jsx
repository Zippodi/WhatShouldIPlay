import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import './App.css';

function App() {
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        fetchAllHeroes();
    }, []);

    //const contents = heroes.length === 0
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
    //    : <ul>
    //        {heroes.map(hero =>

    //            <li key={hero.id}>
    //                <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${hero.SteamID}/${hero.imageIconHash}.jpg`} alt="icon" />
    //                <img
    //                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${hero.SteamID}/header.jpg`}
    //                    onError={(e) => { e.target.src = '/assets/react.svg'; }}
    //                    alt="Game Header"
    //                />

    //                {hero.name}
    //            </li>
    //        )}
    //    </ul>;

    const contents = heroes.length === 0
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <ul>
            
            {heroes.map(hero =>
                <li key={hero.id}>
                    
                    {hero.name}
                </li>
            )}
        </ul>;
        {/*    {heroes.map(hero =>*/}
        {/*        <li key={hero.id}>*/}
        {/*            */}{/* Icon image */}
        {/*            <img*/}
        {/*                src={`https://media.steampowered.com/steamcommunity/public/images/apps/${hero.steamID}/${hero.imageIconHash}.jpg`}*/}
        {/*                alt="icon"*/}
        {/*            />*/}

        {/*            */}{/* Header image with fallback */}
        {/*            <img*/}
        {/*                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${hero.steamID}/header.jpg`}*/}
        {/*                onError={(e) => {*/}
        {/*                    console.log('Error loading header image:', e.target.src);*/}
        {/*                }}*/}
        {/*                alt="Game Header"*/}
        {/*            />*/}

        {/*            {hero.name}*/}
        {/*        </li>*/}
        {/*    )}*/}
        {/*</ul>;*/}


    return (
        <div>
            <h1 class="text-3xl font-bold underline">Hero List</h1>
            <p><Link to="/steam">Go to Steam Page</Link></p>
            <p><Link to="/marvelrivals">Go to Marvel Rivals Page</Link></p>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function fetchAllHeroes() {
        const response = await fetch('hero/mostPlayedHeroes/Zippodi');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setHeroes(data);
        } else {
            console.error('Failed to fetch heroes');
        }
    }
}

export default App;

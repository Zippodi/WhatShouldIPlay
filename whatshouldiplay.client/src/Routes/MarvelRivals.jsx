import { useEffect, useState } from 'react';
import { Link } from 'react-router';


function MarvelRivals() {
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        fetchAllHeroes();
    }, []);



    const contents = heroes.length === 0
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <ul>

            {heroes.map(hero =>
                <li key={hero.id}>

                    {hero.name}
                </li>
            )}
        </ul>;


    return (
        <div>
            <h1 class="text-3xl font-bold underline">Hero List</h1>
            <p><Link to="/steam">Go to Steam Page</Link></p>
            <p><Link to="/">Go to Home Page</Link></p>
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
export default MarvelRivals;
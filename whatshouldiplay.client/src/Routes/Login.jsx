//import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../App.css';

function Login() {

    return (
        <div>
            <h1 class="text-3xl font-bold underline">Home Page</h1>
            <p><Link to="/steam">Go to Steam Page</Link></p>
            <p><Link to="/marvelrivals">Go to Marvel Rivals Page</Link></p>
            <p>This component demonstrates fetching data from the server.</p>
        </div>
    );


}

export default Login;

import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import FadingImages from './Components/FadingImages';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("wsip_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#0d1117] text-gray-200 overflow-y-auto">
            <Header />
            <div className="w-full flex justify-center bg-gray-900">
                <div className="w-full max-w-6xl px-4">
                    <FadingImages />
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8 sm:pt-10">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-400 text-center md:text-left mt-4 sm:mt-5 ml-0 md:ml-10 mb-4 sm:mb-6 tracking-widest shadow-lg">
                    Not Sure What To Play?
                </h1>

                <div className="mt-6 lg:ml-14 flex flex-col md:flex-row items-start md:items-stretch mb-16 sm:mb-20">
                    <div className="text-base sm:text-lg text-white text-center md:text-left md:w-2/3 break-words mb-6 md:mb-0">
                        <p className="mt-4">
                            Well then you're in luck! <span className="text-yellow-400 font-semibold">What Should I Play</span> is a web application that helps you decide what you wanna play!
                        </p>
                        <p className="mt-4">
                            <span className="text-yellow-400 font-semibold">What Should I Play</span> uses Steam's Web API and a Marvel Rivals API to retrieve your stats: your most played games and heroes!
                        </p>
                        <p className="mt-4">
                            Using this, you can see filters and parameters, and <span className="text-yellow-400 font-semibold">What Should I Play</span> will select a game, character, or a short list of either for you to choose!
                        </p>
                    </div>

                    <div className="mt-6 md:mt-0 md:w-1/3 flex flex-row md:flex-col justify-center md:items-end gap-4 sm:gap-6">
                        <img
                            src="/marvelrivals.png"
                            alt="Marvel Rivals Logo"
                            className="h-16 sm:h-20 md:h-24 lg:h-28 object-contain mb-0 md:mb-6"
                        />
                        <img
                            src="/steamlogo.png"
                            alt="Steam Logo"
                            className="h-16 sm:h-20 md:h-24 lg:h-28 object-contain"
                        />
                    </div>
                </div>

                <div className="mt-8 sm:mt-10 md:mt-14 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4">Get Started</h2>
                    {user ? (
                        <p className="text-base sm:text-lg text-white mb-4 sm:mb-6 break-words">
                            To get started, <Link to="/steam" className="text-blue-500 hover:text-blue-400">go to Steam Games</Link> or <Link to="/marvelrivals" className="text-blue-500 hover:text-blue-400">go to Marvel Rivals</Link>. Begin exploring now!
                        </p>
                    ) : (
                        <p className="text-base sm:text-lg text-white mb-4 sm:mb-6 break-words">
                            To get started, <Link to="/register" className="text-blue-500 hover:text-blue-400">register</Link> or <Link to="/login" className="text-blue-500 hover:text-blue-400">login</Link>. After that, navigate to either the Steam Games page or the Marvel Rivals page, and begin!
                        </p>
                    )}
                    {user ? (
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                            <Link
                                to="/steam"
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-white rounded-lg text-lg sm:text-xl font-semibold hover:bg-yellow-400 transition"
                            >
                                Steam Games
                            </Link>
                            <Link
                                to="/marvelrivals"
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-white rounded-lg text-lg sm:text-xl font-semibold hover:bg-yellow-400 transition"
                            >
                                Marvel Rivals
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to="/register"
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-white rounded-lg text-lg sm:text-xl font-semibold hover:bg-yellow-400 transition"
                        >
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
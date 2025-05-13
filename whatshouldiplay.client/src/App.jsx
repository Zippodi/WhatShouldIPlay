import { Link } from 'react-router';
import './App.css';
import Header from './Components/Header';
import FadingImages from './Components/FadingImages';

function App() {
    return (
        <div className="flex flex-col min-h-screen bg-[#0d1117] text-gray-200 overflow-y-auto">            <Header />
            <FadingImages />

            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 text-center md:text-left mt-5 ml-0 md:ml-10 mb-6 tracking-widest shadow-lg">
                    Not Sure What To Play?
                </h1>

                <div className="mt-8 lg:ml-14 flex flex-col md:flex-row items-center md:items-start">
                    <div className="text-lg text-white text-center md:text-left md:w-2/3 break-words">
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

                    <div className="mt-8 md:mt-0 md:w-1/3 flex justify-center md:justify-end gap-6 items-center">
                        <img
                            src="/marvelrivals.png"
                            alt="Marvel Rivals Logo"
                            className="h-20 md:h-24 lg:h-28 object-contain"
                        />
                        <img
                            src="/steamlogo.png"
                            alt="Steam Logo"
                            className="h-20 md:h-24 lg:h-28 object-contain"
                        />
                    </div>
                </div>

                <div className="mt-14 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Get Started</h2>
                    <p className="text-lg text-white mb-6 break-words">
                        To get started, <Link to="/register" className="text-blue-500 hover:text-blue-400">register</Link> or <Link to="/login" className="text-blue-500 hover:text-blue-400">login</Link>. After that, navigate to either the Steam Games page or the Marvel Rivals page, and begin!
                    </p>
                    <Link
                        to="/register"
                        className="px-6 py-3 bg-yellow-500 text-white rounded-lg text-xl font-semibold hover:bg-yellow-400 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default App;

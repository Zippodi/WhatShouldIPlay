import { useState, useEffect } from 'react';

const marvelRivalsCharacters = [
    '/sm.png',
    '/im.png',
    '/bp.png',
    '/sl.png',
    '/punisher.png',
    '/groot.png',
    '/rr.png',
    '/strange.png',
    '/loki.png',
    '/mantis.png',
    
];

const steamGameImages = [
    '/eldenring.jpg',
    '/stardewvalley.jpg',
    '/cs2.jpg',
    '/tf2.jpg',
    '/rdr2.jpg',
    '/p2.jpg',
    '/khazan.jpg',
    '/persona3.jpg',
    '/jedisurvivor.jpg',
    '/ff7.jpg',
    '/gtav.jpg',
    '/ds3.jpg',
    '/dota2.jpg',
    '/cuphead.jpg',
    '/bg3.jpg',
    '/liesofp.jpg',
];

const FadingImages = () => {
    const [currentMarvelIndex, setCurrentMarvelIndex] = useState(0);
    const [currentSteamIndex, setCurrentSteamIndex] = useState(0);
    const [fadeMarvel, setFadeMarvel] = useState(true);
    const [fadeSteam, setFadeSteam] = useState(true);

    const getRandomIndex = (currentIndex, arrayLength) => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * arrayLength);
        } while (newIndex === currentIndex);
        return newIndex;
    };

    useEffect(() => {
        const marvelInterval = setInterval(() => {
            setFadeMarvel(false);
            setTimeout(() => {
                setCurrentMarvelIndex(getRandomIndex(currentMarvelIndex, marvelRivalsCharacters.length));
                setFadeMarvel(true);
            }, 1000);
        }, 4000);

        return () => clearInterval(marvelInterval);
    }, [currentMarvelIndex]);

    useEffect(() => {
        const steamInterval = setInterval(() => {
            setFadeSteam(false);
            setTimeout(() => {
                setCurrentSteamIndex(getRandomIndex(currentSteamIndex, steamGameImages.length));
                setFadeSteam(true);
            }, 1000);
        }, 4000);

        return () => clearInterval(steamInterval);
    }, [currentSteamIndex]);

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-10">
            {/* Marvel Character */}
            <div className="w-[28rem] aspect-[16/9] flex items-center justify-center bg-gray-800 rounded-xl overflow-hidden">
                <img
                    src={marvelRivalsCharacters[currentMarvelIndex]}
                    alt="Marvel Character"
                    className={`w-full h-full object-contain transition-opacity duration-1000 ${fadeMarvel ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>

            {/* Steam Game */}
            <div className="w-[28rem] aspect-[16/9] flex items-center justify-center bg-gray-800 rounded-xl overflow-hidden">
                <img
                    src={steamGameImages[currentSteamIndex]}
                    alt="Steam Game"
                    className={`w-full h-full object-contain transition-opacity duration-1000 ${fadeSteam ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
        </div>
    );
};

export default FadingImages;

import React from 'react';

export default function ChosenHero({ name = "Spider-Man", image = "sm.png" }) {
    return (
        <div className="mt-10 text-center bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Congrats! You got {name}!</h2>
            <img
                src={`/${image}`}
                alt={name}
                className="mx-auto h-40 md:h-48 object-contain rounded-lg"
            />
        </div>
    );
}

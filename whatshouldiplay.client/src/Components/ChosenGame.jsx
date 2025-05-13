// src/Components/ChosenGame.jsx
export default function ChosenGame({ name, appId }) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <img
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`}
                alt={name}
                className="mx-auto rounded-lg shadow-lg"
            />
        </div>
    );
}

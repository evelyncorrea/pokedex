import './PokemonCard.css';

export function PokemonCard({ pokeName, pokeImage }) {
    return (
        <div className="pokemon-card-wrapper">
            <img src={pokeImage} alt={pokeName} /> 
            <h2>{pokeName}</h2>
        </div>
    )
}
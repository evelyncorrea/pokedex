import { pokeImageBaseURL } from '../../../../api/api-clients';
import { parsePokemonId } from '../../../../utils/pokeImageParser';
import './PokemonCard.css';

export function PokemonCard({ pokeName, pokeUrl }) {
    const pokeId = parsePokemonId(pokeUrl);
    const pokeImage = `${pokeImageBaseURL}${pokeId}.png`;
    
    return (
        <div className="pokemon-card-wrapper">
            <img src={pokeImage} alt={pokeName} /> 
            <h2>{pokeName}</h2>
        </div>
    )
}
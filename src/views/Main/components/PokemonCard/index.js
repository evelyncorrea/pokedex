import { useNavigate } from 'react-router-dom';
import { pokeImageBaseURL } from '../../../../api/api-clients';
import { parsePokemonId } from '../../../../utils/pokeImageParser';
import './PokemonCard.css';

export function PokemonCard({ pokeName, pokeUrl }) {
    const navigate = useNavigate();

    const pokeId = parsePokemonId(pokeUrl);
    const pokeImage = `${pokeImageBaseURL}${pokeId}.png`;
    
    const redirectTo = () => {
        navigate(`/pokedex/pokemon/${pokeId}`);
    }

    return (
        <div className="pokemon-card-wrapper" onClick={redirectTo}>
            <img src={pokeImage} alt={pokeName} /> 
            <h2>{pokeName}</h2>
        </div>
    )
}
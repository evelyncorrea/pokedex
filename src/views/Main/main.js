import { SearchBar } from './components/SearchBar';
import { PokemonCard } from './components/PokemonCard';
import './main.css';
import usePokemon from '../../contexts/pokemons';
import { Pagination } from './components/Pagination';

export function MainPage() {
    const { pokemons, isLoading } = usePokemon();

    return (
        <div className='main-page-wrapper'>
            <SearchBar />
            <div className='main-page-content'>
                {isLoading && <div>Loading...</div>}
                {!isLoading && pokemons?.length > 0 && 
                    <>
                        <div className='pokemons-list'>
                            {pokemons.map(pokemon => (
                                <PokemonCard key={pokemon.name} pokeUrl={pokemon.url} pokeName={pokemon.name} />
                            ))}

                        </div>
                        
                        <Pagination />
                    </>
                }
                {!isLoading && pokemons?.length === 0 &&
                    <div className='no-pokemon-found'>
                        Nenhum pokémon foi encontrado!
                    </div>
                }
            </div>
        </div>
    );
}
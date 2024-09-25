import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { PokemonCard } from './components/PokemonCard';
import './main.css';
import { getPokemons } from '../../api/poke-api';

export function MainPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [allPokemons, setAllPokemons] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        async function getPokemonData() {
            await getPokemons().then(({ results }) => {
                setAllPokemons(results);
                setIsLoading(false);
            })
        }

        getPokemonData();
    }, [])

    return (
        <div className='main-page-wrapper'>
            <SearchBar />
            <div className='main-page-content'>
                {isLoading && <div>Loading...</div>}
                {!isLoading && allPokemons.length && 
                    <div className='pokemons-list'>
                       {allPokemons.map(pokemon => (
                        <PokemonCard pokeImage={pokemon.image} pokeName={pokemon.name} />
                       ))}
                    </div>
                }
                {!isLoading && allPokemons.length === 0 &&
                    <div className='no-pokemon-found'>
                        Nenhum pokémon foi encontrado!
                    </div>
                }
            </div>
        </div>
    );
}
import { useEffect } from 'react';
import usePokemonDetails from '../../contexts/pokemon-details';
import { useNavigate, useParams } from 'react-router-dom';
import './details.css';

export function DetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, pokemonData, fetchPokemonData } = usePokemonDetails();

    useEffect(() => {
        fetchPokemonData(id);
    }, [])

    const customColor = (type) => {
        const availableColors = {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            dragon: '#6F35FC',
            dark: '#705746',
            steel: '#B7B7CE',
            fairy: '#D685AD',
        };

        return availableColors[type];
    }

    const normalizeName = (name) => {
        return name.replace('-', ' ');
    }

    const redirectToTypeSearch = (type) => {
        navigate('/', { state: { searchType: 'type', searchInput: type }});
    }

    return (
        <div className='details-page-wrapper'>
            {isLoading && <div>Loading...</div>}
            {!isLoading && <div className='details-page-content'>
                <div className='pokemon-sprites'>
                    <img src={pokemonData.sprites.front_default} alt='sprite pokemon default' width='125px'/>
                    <img src={pokemonData.sprites.front_shiny} alt='sprite pokemon shiny' width='125px' />
                </div>
                <div className='pokemon-information'>
                    <h1>#{pokemonData.id}. {pokemonData.name}</h1>

                    <div className='pokemon-types'>
                        {pokemonData.types.map(({ type }) => (
                            <p 
                                className='type-tag' 
                                style={{ backgroundColor: customColor(type.name) }}
                                onClick={() => redirectToTypeSearch(type.name)}
                            >
                                {type.name}
                            </p>
                        ))}
                    </div>

                    <div className='pokemon-stats'>
                        {pokemonData.stats.map(stat => 
                           <p className='stat-tag'>{`${normalizeName(stat.stat.name)}: ${stat.base_stat} `}</p>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    )
}
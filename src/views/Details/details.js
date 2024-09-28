import { useEffect, useState } from 'react';
import usePokemonDetails from '../../contexts/pokemon-details';
import { useNavigate, useParams } from 'react-router-dom';
import './details.css';

export function DetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoading, pokemonData, fetchPokemonData } = usePokemonDetails();

    const [showDefaultSprite, setShowDefaultSprite] = useState(true);
    const [firstType, setFirstType] = useState('');
    
    const { 
        name,
        types,
        stats,
        id: pokemonId,
        sprites: { front_default, front_shiny }
    } = pokemonData;

    useEffect(() => {
        fetchPokemonData(id);
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        setFirstType(pokemonData.types[0]?.type?.name);
    }, [pokemonData.types]);

    const toggleSprite = () => {
        setShowDefaultSprite(curr => !curr);
    }

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
        navigate('/pokedex/', { state: { searchType: 'type', searchInput: type }});
    }

    return (
        <div className='details-page-wrapper'>
            {isLoading && <div>Loading...</div>}
            {!isLoading && <div className='details-page-content'>
                <div className='pokemon-sprites' style={{ backgroundColor: customColor(firstType) }}>
                    <div className='pokemon-sprite'>
                        <img 
                            src={showDefaultSprite ? front_default : front_shiny} 
                            alt={`sprite pokemon ${showDefaultSprite ? 'default' : 'shiny'}`}
                            className={showDefaultSprite ? 'sprite default' : 'sprite shiny'}
                            width='125px'
                        />
                    </div>
                    <div className='choose-sprite'>
                        <h3>Sprite Type</h3>
                        <div className='sprite-toggle'>
                            <input 
                                id='default' 
                                type='radio'
                                name='sprite'
                                checked={showDefaultSprite}
                                onChange={toggleSprite} 
                            />
                            <label htmlFor='default'>Default</label>
                            
                            <input 
                                id='shiny' 
                                name='sprite' 
                                type='radio'
                                checked={!showDefaultSprite}
                                onChange={toggleSprite} 
                            />
                            <label htmlFor='shiny'>Shiny</label>
                        </div>
                    </div>
                </div>
                <div className='pokemon-information'>
                    <h1>#{pokemonId}. {name}</h1>

                    <div className='pokemon-types-wrapper'>
                        <h3>Types</h3>
                        <div className='pokemon-types'>
                            {types.map(({ type }, index) => (
                                <p 
                                    key={index}
                                    className='type-tag' 
                                    style={{ backgroundColor: customColor(type.name) }}
                                    onClick={() => redirectToTypeSearch(type.name)}
                                >
                                    {type.name}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className='pokemon-stats-wrapper'>
                        <h3>Stats</h3>
                        <div className='pokemon-stats'>
                        {stats.map((stat, index) => 
                            <p className='stat-tag' key={index}>
                                <b>{`${normalizeName(stat.stat.name)}:`}</b><br/>
                                <span>{stat.base_stat}</span>
                            </p>
                        )}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
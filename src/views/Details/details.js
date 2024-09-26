import { useEffect } from 'react';
import usePokemonDetails from '../../contexts/pokemon-details';
import { useParams } from 'react-router-dom';
import './details.css';

export function DetailsPage() {
    const { id } = useParams();
    const { pokemonData, fetchPokemonData } = usePokemonDetails();

    useEffect(() => {
        fetchPokemonData(id);
    }, [])

    return (
        <div className='details-page-wrapper'>
            <div className='details-page-content'>
                <div className='pokemon-sprites'>
                    <img src={pokemonData.sprites.front_default} alt='sprite pokemon default' width='125px'/>
                    <img src={pokemonData.sprites.front_shiny} alt='sprite pokemon shiny' width='125px' />
                </div>
                <div className='pokemon-information'>
                    <h1>{pokemonData.name}</h1>
                    <h2>{pokemonData.id}</h2>
                    <div className='pokemon-types'>
                        {pokemonData.types.map(({ type }) => (
                            <p className='type-tag'>{type.name}</p>
                            ))
                        }
                    </div>
                    <div className='pokemon-stats'>
                        {pokemonData.stats.map(stat => 
                           <p className='stat-tag'>{`${stat.stat.name}: ${stat.base_stat} `}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
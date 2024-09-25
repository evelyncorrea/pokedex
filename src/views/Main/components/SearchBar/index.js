import { useState } from 'react';
import './SearchBar.css';

const SEARCH_TYPES = {
    NAME_OR_ID: 'name/id',
    TYPE: 'type',
}

export function SearchBar({ callback }) {
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('name/id');
    const [placeholder, setPlaceholder] = useState('name or number');

    const search = () => {
        console.log({ searchInput, searchType });
    }

    const changeSearchType = (e) => {
        const { value } = e.target;
        setSearchType(value);

        if(value === SEARCH_TYPES.NAME_OR_ID) setPlaceholder('name or number');
        if(value === SEARCH_TYPES.TYPE) setPlaceholder('type')
    }

    return (
        <div className='search-bar-wrapper'>
            <img src="pokelogo.png" alt='Pokemon Logo' height='150px' />
            <div className='input-section'>
                <div className='radio-inputs'>
                    <b>Search for:</b>
                    <input 
                        type="radio" 
                        id="name-id" 
                        name="search-type" 
                        value={SEARCH_TYPES.NAME_OR_ID}
                        checked={searchType === SEARCH_TYPES.NAME_OR_ID}
                        onChange={changeSearchType}
                    />
                    <label for="name-id">Name/ID</label>
                    <input 
                        type="radio" 
                        id="type" 
                        name="search-type" 
                        value={SEARCH_TYPES.TYPE}
                        checked={searchType === SEARCH_TYPES.TYPE}
                        onChange={changeSearchType}
                    />
                    <label for="type">Type</label>
                </div>
                <input 
                    className='search-bar-input'
                    value={searchInput} 
                    placeholder={`Insert the ${placeholder} of the pokemon you want to search for`}
                    onChange={el => setSearchInput(el.target.value)}
                />
                <button className='search-bar-button' onClick={search}>Search </button>
            </div>
        </div>
    )
}
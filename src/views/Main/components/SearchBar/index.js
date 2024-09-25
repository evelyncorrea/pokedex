import { useState } from 'react';
import './SearchBar.css';

export function SearchBar({ callback }) {
    const [searchInput, setSearchInput] = useState('');

    const search = () => {
        console.log(searchInput);
    }

    return (
        <div className='search-bar-wrapper'>
            <input 
                className='search-bar-input'
                value={searchInput} 
                placeholder='Type the name or number of the pokemon you want to search for'
                onChange={el => setSearchInput(el.target.value)}
            />
            <button className='search-bar-button' onClick={search}>Search </button>
        </div>
    )
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PokemonProvider } from './contexts/pokemons';
import { PokemonDetailsProvider } from './contexts/pokemon-details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonProvider>
      <PokemonDetailsProvider>
        <App />
      </PokemonDetailsProvider>
    </PokemonProvider>
  </React.StrictMode>
);

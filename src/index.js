import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { PokemonProvider } from './contexts/pokemons';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>
);

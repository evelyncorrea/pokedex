import axios from "axios";

export const pokeImageBaseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
export const pokeApiBaseURL = 'https://pokeapi.co/api/v2';
export const pokeApiClient = axios.create({
    baseURL: pokeApiBaseURL,
});
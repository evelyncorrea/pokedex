import axios from "axios";

export const pokeApiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
})

export const pokeImageBaseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
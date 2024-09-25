import axios from "axios";

export const pokeApiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
})

export const pokeAssetsClient = axios.create({
    baseURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
})
import { pokeApiBaseURL, pokeApiClient } from "./api-clients";

export async function getAllPokemons({ offset = 0, limit = 20 }) {
    return await pokeApiClient.get(`/pokemon?limit=${limit}&offset=${offset}`)
        .then(result => result.data)
        .catch(error => ({ error }));
}

export async function getPokemonByNameOrId({ input }) {
    return await pokeApiClient.get(`/pokemon/${input}`)
        .then(result => ({
            name: result.data.name,
            url: `${pokeApiBaseURL}/pokemon/${result.data.id}`
        }))
        .catch(error => ({ error }));
}

export async function getPokemonByType({ input }) {
    return await pokeApiClient.get(`/type/${input}`)
        .then(result => result.data)
        .catch(error => ({ error }));
}
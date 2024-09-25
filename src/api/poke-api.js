import { pokeApiClient } from "./api-clients";

export async function getPokemons(offset = 0, limit = 20) {
    return await pokeApiClient.get(`/pokemon?limit=${limit}&offset=${offset}`).then(result => result.data)
}
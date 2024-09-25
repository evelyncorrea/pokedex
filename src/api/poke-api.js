import { pokeApiClient, pokeAssetsClient } from "./api-clients";

export async function getPokemons(limit = 20, offset = 0) {
    return await pokeApiClient.get(`/pokemon?limit=${limit}&offset=${offset}`).then(result => result.data)
}

export async function getPokeImage(id) {
    return await pokeAssetsClient.get(`/${id}.png`)
}
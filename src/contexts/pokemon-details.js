import { createContext, useContext, useReducer } from "react";
import { getPokemonByNameOrId } from "../api/poke-api";

const initialState = {
    isLoading: true,
    pokemonData: {
        id: 0,
        name: "",
        sprites: {
            front_default: null,
            front_shiny: null
        },
        stats: [],
        types: []
    }
};

const TYPES = {
    SET_POKEMON_INFO: 'SET_POKEMON_INFO'
};

const PokemonDetailsContext = createContext(initialState);

const PokemonDetailsReducer = (state, action) => {
    const { type, payload } = action;

    if(type === TYPES.SET_POKEMON_INFO) {
        return {
            ...state,
            pokemonData: payload,
            isLoading: false,
        }
    }

    return state;
}

export const PokemonDetailsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PokemonDetailsReducer, initialState);

    const fetchPokemonData = async (id) => {
        const data = await getPokemonByNameOrId({ input: id });

        dispatch({ 
            type: TYPES.SET_POKEMON_INFO, 
            payload: {
                id,
                name: data.name,
                sprites: {
                    front_default: data.sprites?.front_default,
                    front_shiny: data.sprites?.front_shiny
                },
                stats: data.stats,
                types: data.types
            } 
        });
    }

    const value = {
        ...state,
        fetchPokemonData
    }

    return <PokemonDetailsContext.Provider value={value}>{children}</PokemonDetailsContext.Provider>
}

const usePokemonDetails = () => {
    const context = useContext(PokemonDetailsContext);

    if (context === undefined) {
        throw new Error("usePokemonDetails must be used within PokemonDetailsContext");
    }

    return context;
};

export default usePokemonDetails;
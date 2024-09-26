import { createContext, useContext, useReducer } from "react";
import { getAllPokemons, getPokemonByNameOrId, getPokemonByType } from "../api/poke-api";

const initialState = {
    isLoading: true,
    pokemons: []
}

export const PokemonContext = createContext(initialState);

const PokemonReducer = (state, action) => {
    const { type, payload } = action;

    if(type === 'updateData') {
        return {
            isLoading: false,
            pokemons: payload.data
        }
    }
}

export const PokemonProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PokemonReducer, initialState);

    const fetchAllPokemons = async (offset, limit) => {
        const data = await getAllPokemons({ offset, limit });
        dispatch({type: 'updateData', payload: { data: data.results }});
    }

    const fetchPokemonByNameOrId = async (input) => {
        const data = await getPokemonByNameOrId({ input });
        dispatch({type: 'updateData', payload: { data: [data] }});
    }

    const fetchPokemonByType = async (input) => {
        const data = await getPokemonByType({ input });
        const parsedData = data.map(mon => mon.pokemon);

        dispatch({type: 'updateData', payload: { data: parsedData }});
    }

    const value = {
        ...state,
        fetchAllPokemons,
        fetchPokemonByNameOrId,
        fetchPokemonByType,
    }

    return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}

const usePokemon = () => {
    const context = useContext(PokemonContext);

    if (context === undefined) {
        throw new Error("usePokemon must be used within PokemonContext");
    }

    return context;
};

export default usePokemon;
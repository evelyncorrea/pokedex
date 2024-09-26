import { createContext, useContext, useReducer } from "react";
import { getAllPokemons, getPokemonByNameOrId, getPokemonByType } from "../api/poke-api";

const initialState = {
    isLoading: true,
    pokemons: [],
    currentPage: 0,
    totalPages: 1,
    totalResults: 0,
    offset: 0,
    limit: 20,
    searchType: 'all',
    searchInput: ''
}

const TYPES = {
    CHANGE_LOADING: 'CHANGE_LOADING',
    UPDATE_DATA: 'UPDATE_DATA',
    CHANGE_PAGE: 'CHANGE_PAGE',
    CHANGE_SEARCH: 'CHANGE_SEARCH'
}

const SEARCH_TYPES = {
    ALL: 'all',
    NAME_ID: 'name/id',
    TYPE: 'type'
}

export const PokemonContext = createContext(initialState);

const PokemonReducer = (state, action) => {
    const { type, payload } = action;

    if(type === TYPES.CHANGE_LOADING) {
        return {
            ...state,
            isLoading: payload.isLoading
        }
    }

    if(type === TYPES.UPDATE_DATA) {
        const totalPages = Math.round(payload.totalResults / state.limit);

        return {
            ...state,
            isLoading: false,
            pokemons: payload.data,
            totalResults: payload.totalResults,
            totalPages
        }
    }

    if(type === TYPES.CHANGE_PAGE) {
        const offset = payload.page * state.limit

        return {
            ...state,
            isLoading: false,
            currentPage: payload.page,
            offset
        }
    }

    if(type === TYPES.CHANGE_SEARCH) {
        return {
            ...state,
            searchType: payload?.type || SEARCH_TYPES.ALL,
            searchInput: payload?.input || '',
        }
    }

    return state;
}

export const PokemonProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PokemonReducer, initialState);

    const fetchAllPokemons = async (offset, limit) => {
        const data = await getAllPokemons({ offset, limit });

        dispatch({ type: TYPES.CHANGE_SEARCH, payload: { type: SEARCH_TYPES.ALL, input: '' }});
        
        if(data?.error) {
            console.error(data.error)
            return dispatch({ type: TYPES.UPDATE_DATA, payload: { data: [], totalResults: 0 }});
        }

        dispatch({ type: TYPES.UPDATE_DATA, payload: { data: data.results, totalResults: data.count }});
    }

    const fetchPokemonByNameOrId = async (input) => {
        const data = await getPokemonByNameOrId({ input });

        dispatch({ type: TYPES.CHANGE_SEARCH, payload: { type: SEARCH_TYPES.NAME_ID, input }});
        
        if(data?.error) {
            console.error(data.error)
            return dispatch({ type: TYPES.UPDATE_DATA, payload: { data: [], totalResults: 0 }});
        }

        dispatch({ type: TYPES.UPDATE_DATA, payload: { data: [data], totalResults: 1 }});
    }

    const fetchPokemonByType = async (input) => {
        const data = await getPokemonByType({ input });

        dispatch({ type: TYPES.CHANGE_SEARCH, payload: { type: SEARCH_TYPES.TYPE, input }});

        if(data?.error) {
            console.error(data.error)
            return dispatch({ type: TYPES.UPDATE_DATA, payload: { data: [] }});
        }

        const parsedData = data.pokemon.map(mon => mon.pokemon);

        dispatch({ type: TYPES.UPDATE_DATA, payload: { data: parsedData, totalResults: data.count }});
    }

    const paginate = async (paginationType) => {
        let newPage = state.currentPage; 

        if(paginationType === 'previous' && state.currentPage > 0) {
            newPage -= 1;
        } else if(paginationType === 'next' && state.currentPage < state.totalResults) {
            newPage += 1;
        }
        
        dispatch({ type: TYPES.CHANGE_PAGE, payload: { page: newPage }})

        if(state.searchType === SEARCH_TYPES.ALL) return await fetchAllPokemons()
        if(state.searchType === SEARCH_TYPES.NAME_ID) return await fetchPokemonByNameOrId(state.searchInput)
        if(state.searchType === SEARCH_TYPES.TYPE) return await fetchPokemonByType(state.searchInput)
    }

    const value = {
        ...state,
        fetchAllPokemons,
        fetchPokemonByNameOrId,
        fetchPokemonByType,
        paginate
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
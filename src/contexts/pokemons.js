import { createContext, useContext, useReducer } from "react";
import { getAllPokemons, getPokemonByNameOrId, getPokemonByType } from "../api/poke-api";
import { pokeApiBaseURL } from "../api/api-clients";

const initialState = {
    isLoading: true,
    pokemons: [],
    allPokemons: [],
    currentPage: 1,
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

const PokemonContext = createContext(initialState);

const PokemonReducer = (state, action) => {
    const { type, payload } = action;

    if(type === TYPES.CHANGE_LOADING) {
        return {
            ...state,
            isLoading: payload
        }
    }

    if(type === TYPES.UPDATE_DATA) {
        const totalPages = Math.round(payload.totalResults / state.limit);

        return {
            ...state,
            isLoading: false,
            pokemons: payload.data,
            allPokemons: payload?.fullData || [],
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

    const setSearchData = (searchType, searchInput) => {
        dispatch({ type: TYPES.CHANGE_SEARCH, payload: { type: searchType, input: searchInput }});
    }

    const clearPagination = () => {
        dispatch({ type: TYPES.CHANGE_PAGE, payload: { page: 1 }})
    }

    const fetchAllPokemons = async (offset) => {
        dispatch({ type: TYPES.CHANGE_LOADING, payload: true })
        console.log('ta chamando o fetch all')
        const data = await getAllPokemons({ offset, limit: state.limit });

        if(data?.error) {
            console.error(data.error)
            return dispatch({ type: TYPES.UPDATE_DATA, payload: { data: [], totalResults: 0 }});
        }

        dispatch({ type: TYPES.UPDATE_DATA, payload: { data: data.results, totalResults: data.count }});
    }

    const fetchPokemonByNameOrId = async (input) => {
        dispatch({ type: TYPES.CHANGE_LOADING, payload: true })

        const data = await getPokemonByNameOrId({ input });

        if(data?.error) {
            console.error(data.error)
            return dispatch({ type: TYPES.UPDATE_DATA, payload: { data: [], totalResults: 0 }});
        }

        dispatch({ 
            type: TYPES.UPDATE_DATA, 
            payload: { 
                data: [{
                    name: data.name,
                    url: `${pokeApiBaseURL}/pokemon/${data.id}`
                }], 
                totalResults: 1 
            }});
    }

    const fetchPokemonByType = async (input) => {
        console.log('entrou no fech by type')
        dispatch({ type: TYPES.CHANGE_LOADING, payload: true })

        const data = await getPokemonByType({ input });

        if(data?.error) {
            console.log('deu erro?')
            console.error(data.error)
            return dispatch({ type: TYPES.UPDATE_DATA, payload: { data: [] }});
        }

        const parsedData = data.pokemon.map(mon => mon.pokemon);

        if(parsedData.length > state.limit) {
            console.log('entrou no parsedData')
            return dispatch({ 
                type: TYPES.UPDATE_DATA, 
                payload: { 
                    data: parsedData.slice(0, state.limit), 
                    fullData: parsedData,
                    totalResults: parsedData.length
                }
            });
        }

        console.log('passou de tudo no serach by type')

        dispatch({ type: TYPES.UPDATE_DATA, payload: { data: parsedData, totalResults: data.count }});
    }

    const paginate = async (paginationType) => {
        dispatch({ type: TYPES.CHANGE_LOADING, payload: true })
        console.log('entrou no paginate')
        let newPage = state.currentPage;

        if(paginationType === 'previous') {
            newPage -= 1;
        } else if(paginationType === 'next') {
            newPage += 1;
        }
        
        dispatch({ type: TYPES.CHANGE_PAGE, payload: { page: newPage }})

        if(state.allPokemons.length > state.limit) {
            const sliceStart = paginationType === 'previous' 
                ? state.offset - state.limit 
                : state.offset + state.limit;

            const sliceEnd = paginationType === 'previous' 
                ? state.offset 
                : state.offset + (state.limit * 2);

            return dispatch({ 
                type: TYPES.UPDATE_DATA, 
                payload: {
                data: state.allPokemons.slice(sliceStart, sliceEnd),
                fullData: state.allPokemons,
                totalResults: state.allPokemons.length
            }})
        }

        if(state.searchType === SEARCH_TYPES.ALL) return await fetchAllPokemons(state.offset + state.limit)
        if(state.searchType === SEARCH_TYPES.NAME_ID) return await fetchPokemonByNameOrId(state.searchInput)
        if(state.searchType === SEARCH_TYPES.TYPE) return await fetchPokemonByType(state.searchInput)
    }

    const value = {
        ...state,
        fetchAllPokemons,
        fetchPokemonByNameOrId,
        fetchPokemonByType,
        setSearchData,
        clearPagination,
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
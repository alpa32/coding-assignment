import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

describe('MovieSlice test', () => {

    it('should set loading true while action is pending', () => {
        const action = { type: fetchMovies.pending.type };
        const initialState = moviesSlice.reducer(
            {
                movies: [], fetchStatus: '', error: 'some error',
                currentPage: 1,
                totalPages: 1,
            }, action);
        const newState = moviesSlice.reducer(initialState, action);

        expect(newState.fetchStatus).toBe('loading');
        expect(newState.error).toBeNull();
    })

    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled.type,
            payload: {results : moviesMock}
        };
        const initialState = {
            movies: [],
            fetchStatus: '',
            error: null,
            currentPage: 1,
            totalPages: 1,
        };

        const newState = moviesSlice.reducer(initialState, action);
        
        expect(newState.movies).toEqual(moviesMock);
        expect(newState.fetchStatus).toBe('success');
        expect(newState.error).toBeNull();
    })

    it('should set error when action is rejected', () => {
        const action = { type: fetchMovies.rejected.type, payload: { error: 'Network Error' } };
        const initialState = moviesSlice.reducer(
            {
                movies: [], fetchStatus: '', error: null,
                currentPage: 1,
                totalPages: 1,
            }, action);
        const newState = moviesSlice.reducer(initialState, action);

        expect(newState.fetchStatus).toBe('error');
        expect(newState.error).not.toBeNull();
    })

})
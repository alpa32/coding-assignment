import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies',   async (apiUrl, { rejectWithValue }) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        return rejectWithValue(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  })

export const fetchMoreMovies = createAsyncThunk("fetch-more-movies", async (url) => {
    const response = await fetch(url);
    return response.json();
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
        error: null,
        currentPage: 1,
        totalPages: 1,
    },
    reducers: {
        resetMovies: (state) => {
            state.movies = [];
            state.currentPage = 1;
            state.totalPages = 1;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload.results;
                state.currentPage = action.payload.page;
                state.totalPages = action.payload.total_pages;
                state.fetchStatus = "success";
                state.error = null;
            })
            .addCase(fetchMoreMovies.fulfilled, (state, action) => {
                state.movies = [...state.movies, ...action.payload.results];
                state.currentPage = action.payload.page;
                state.fetchStatus = "success";
                state.error = null;
            })
            .addMatcher(
                (action) => action.type.startsWith("fetch-") && action.type.endsWith("/pending"),
                (state) => {
                    state.fetchStatus = "loading";
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith("fetch-") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.fetchStatus = "error";
                    state.error = action.payload.error || 'Unknown error';
                }
            );
    },
})

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice;
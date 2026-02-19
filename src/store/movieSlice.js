import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../utils/localstorage";

const savedWatchlist = getWatchlist().map(m => m.id);

const initialState = {
    movies: [],
    searchText: "",
    watchlist: savedWatchlist,
    loading: false,
    error: null,
    filters: {
        genre: "all",
        rating: "all",
        sort: "all"
    }
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async () => {
    const response = await fetch('/movies.json');
    const movies = await response.json();
    return movies;
  }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers:{
        setSearchText(state, action){
            state.searchText = action.payload;
        },
        setGenreFilter(state, action){
            state.filters.genre = action.payload;
        },
        setRatingFilter(state, action){
            state.filters.rating = action.payload;
        },
        setSortFilter(state, action){
            state.filters.sort = action.payload;
        },
        toggleWatchlist(state, action){
            const movie = action.payload;
            const movieId = movie.id;
            
            if(state.watchlist.includes(movieId)){
                state.watchlist = state.watchlist.filter(id => id !== movieId);
                removeFromWatchlist(movieId);
            } else {
                state.watchlist.push(movieId);
                addToWatchlist(movie);
            }
        },

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
          })
          .addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
    },
})

export const { setSearchText, setGenreFilter, setRatingFilter, setSortFilter, toggleWatchlist } = moviesSlice.actions;
export default moviesSlice.reducer;
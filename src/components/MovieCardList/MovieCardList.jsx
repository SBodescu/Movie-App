import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import "./MovieCardList.css";
import MovieCard from '../MovieCard/MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import FilterButtons from '../FilterButtons/FilterButtons';
import filterAndSortMovies from '../../utils/filters';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../../utils/localstorage';

export default function MovieCardList({ data, view }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [watchlist, setWatchlist] = useState(getWatchlist());
  const navigate = useNavigate();

  const filters = {
    searchText: searchParams.get("search") || "",
    genre: searchParams.get("genre") || "all",
    rating: searchParams.get("rating") || "all",
    sort: searchParams.get("order") || "all"
  };

  const watchIds = view === 'watchlist' ? watchlist.map(m => m.id) : null;
  const filteredMovies = filterAndSortMovies(data, { ...filters, view, watchIds });

  const updateFilter = useCallback((key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all" || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const handleToggleWatchlist = useCallback((movie) => {
    const isInList = watchlist.some(m => m.id === movie.id);
    if (isInList) {
      removeFromWatchlist(movie.id);
      setWatchlist(prev => prev.filter(m => m.id !== movie.id));
    } else {
      addToWatchlist(movie);
      setWatchlist(prev => [...prev, movie]);
    }
  }, [watchlist]);

    if (!data || data.length === 0) {
        return <div className="card-list-container">Loading movies...</div>;
    }
    if (filteredMovies.length === 0) {
      return errorHandler(filteredMovies, view, filters.searchText, filters.genre, filters.rating, navigate);
    }

  return (
    <>
      <div className="search-filters-container">
        <SearchBar 
          searchText={filters.searchText} 
          onSearchTextChange={(val) => updateFilter('search', val)} 
        />
        <FilterButtons
          filterSort={filters.sort}
          onFilterSort={(val) => updateFilter('order', val)}
          filterGenre={filters.genre}
          onFilterGenre={(val) => updateFilter('genre', val)}
          filterRating={filters.rating}
          onFilterRating={(val) => updateFilter('rating', val)}
        />
      </div>

      <div className="card-list-container">
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.id}
            {...movie}
            image={new URL(`../../assets/images/${movie.image}`, import.meta.url).href}
            isInWatchlist={watchlist.some(m => m.id === movie.id)}
            onToggleWatchlist={() => handleToggleWatchlist(movie)}
          />
        ))}
      </div>
    </>
  );
}

function errorHandler(filteredMovies, view, searchText, genre, rating, navigate) {
    let errorMessage = "No movies found";
    if (filteredMovies.length === 0) {
        if (view === 'watchlist') {
            errorMessage = "Your watchlist is empty. Add some movies to get started!";
        } else if (searchText.trim() !== "") {
            errorMessage = `No movies found matching "${searchText}"`;
        } else if (genre !== "all" || rating !== "all") {
            errorMessage = "No movies match your filters. Try adjusting your search criteria.";
        }
    }

    return (
        <div className="card-list-error-container">
            <button className="back-btn" onClick={() => navigate('/movies')}>← Back</button>
            <div className="no-results-message">{errorMessage}</div>
        </div>
    );
    
}
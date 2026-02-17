import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./MovieCardList.css";
import MovieCard from '../MovieCard/MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import FilterButtons from '../FilterButtons/FilterButtons';
import filterAndSortMovies from '../../utils/filters';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../../utils/localstorage';

export default function MovieCardList({ data, view }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [watchlist, setWatchlist] = useState(getWatchlist());

  const filters = {
    searchText: searchParams.get("search") || "",
    genre: searchParams.get("genre") || "all",
    rating: searchParams.get("rating") || "all",
    sort: searchParams.get("order") || "all"
  };

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all" || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleToggleWatchlist = (movie) => {
    const isInList = watchlist.some(m => m.id === movie.id);
    if (isInList) {
      removeFromWatchlist(movie.id);
      setWatchlist(prev => prev.filter(m => m.id !== movie.id));
    } else {
      addToWatchlist(movie);
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const watchIds = view === 'watchlist' ? watchlist.map(m => m.id) : null;
  const filteredMovies = filterAndSortMovies(data, { ...filters, view, watchIds });

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
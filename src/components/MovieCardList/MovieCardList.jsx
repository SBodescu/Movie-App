import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./MovieCardList.css";
import MovieCard from '../MovieCard/MovieCard';
import SearchBar from '../SearchBar/SearchBar';
import FilterButtons from '../FilterButtons/FilterButtons';
import filterAndSortMovies from '../../utils/filters';

export default function MovieCardList() {
  const navigate = useNavigate();
  const location = useLocation();
  const movies = useSelector((state) => state.movies.movies);
  const { searchText, filters, watchlist } = useSelector((state) => state.movies);
  
  const currentView = location.pathname === '/watchlist' ? 'watchlist' : 'all';
  
  const filters_obj = {
    searchText: searchText,
    genre: filters.genre,
    rating: filters.rating,
    sort: filters.sort
  };

  const watchIds = currentView === 'watchlist' ? watchlist : null;
  const filteredMovies = filterAndSortMovies(movies, { ...filters_obj, view: currentView, watchIds });

    if (!movies || movies.length === 0) {
        return <div className="card-list-container">Loading movies...</div>;
    }
    if (filteredMovies.length === 0) {
      return errorHandler(filteredMovies, currentView, filters_obj.searchText, filters_obj.genre, filters_obj.rating, navigate);
    }

  return (
    <>
      <div className="search-filters-container">
        <SearchBar />
        <FilterButtons />
      </div>

      <div className="card-list-container">
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.id}
            {...movie}
            image={new URL(`../../assets/images/${movie.image}`, import.meta.url).href}
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
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
            <div className="no-results-message">{errorMessage}</div>
        </div>
    );
    
}
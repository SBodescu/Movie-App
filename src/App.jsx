import MovieCard from "./components/MovieCard/MovieCard";
import MovieCardList from "./components/MovieCardList/MovieCardList";
import SearchBar from "./components/SearchBar/SearchBar";
import PageButtons from "./components/PageButtons/PageButtons";
import { useState, useEffect } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";


function App() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    searchText: '',
    genre: 'all',
    rating: 'all',
    sort: 'all'
  });
  const [view, setView] = useState('all');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoaded(false);
        const response = await fetch('/movies.json');
        const movies = await response.json();
        setData(movies);
        setLoaded(true);
      } catch (err) {
        console.error('Error loading movies:', err);
        setLoaded(true); 
      }
    };

    fetchMovies();
  }, []);


  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="app-container">
      {!loaded ? (
        <div className="loading-container">Loading movies...</div>
      ) : (
        <>
          <div className="nav-container">
            <PageButtons onChangeView={setView} view={view} />
          </div>
          <div className="search-filters-container">
            <SearchBar
              searchText={filters.searchText}
              onSearchTextChange={(value) => updateFilter('searchText', value)}
            />
            <FilterButtons
              filterSort={filters.sort}
              onFilterSort={(value) => updateFilter('sort', value)}
              filterGenre={filters.genre}
              onFilterGenre={(value) => updateFilter('genre', value)}
              filterRating={filters.rating}
              onFilterRating={(value) => updateFilter('rating', value)}
            />
          </div>
          <MovieCardList
            data={data}
            filters={filters}
            view={view}
          />
        </>
      )}
    </div>
  );
}

export default App;
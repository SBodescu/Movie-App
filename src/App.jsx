import MovieCard from "./components/MovieCard/MovieCard";
import MovieCardList from "./components/MovieCardList/MovieCardList";
import SearchBar from "./components/SearchBar/SearchBar";
import PageButtons from "./components/PageButtons/PageButtons";
import { useState } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";


function App() {
  const [searchText, setSearchText] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  return (
    <div className="app-container">
      <PageButtons/>
      <SearchBar
        searchText = {searchText}
        onSearchTextChange = {setSearchText}
      />
      <FilterButtons
        filterGenre = {filterGenre}
        onFilterGenre = {setFilterGenre}
        filterRating = {filterGenre}
        onFilterRating = {setFilterRating}
      />
      <MovieCardList
        searchText = {searchText}
        filterGenre = {filterGenre}
        filterRating = {filterRating}
      />
    </div>
  );
}

export default App;

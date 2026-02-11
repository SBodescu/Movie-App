import MovieCard from "./components/MovieCard/MovieCard";
import MovieCardList from "./components/MovieCardList/MovieCardList";
import SearchBar from "./components/SearchBar/SearchBar";
import PageButtons from "./components/PageButtons/PageButtons";
import { useState } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";


function App() {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="app-container">
      <PageButtons/>
      <SearchBar
        searchText = {searchText}
        onSearchTextChange = {setSearchText}
      />
      <FilterButtons/>
      <MovieCardList
        searchText = {searchText}
      />
    </div>
  );
}

export default App;

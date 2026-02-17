import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import MovieCardList from "./components/MovieCardList/MovieCardList";
import SearchBar from "./components/SearchBar/SearchBar";
import PageButtons from "./components/PageButtons/PageButtons";
import { useState, useEffect, useCallback } from "react";
import Layout from "./components/Layout/Layout";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import FilterButtons from "./components/FilterButtons/FilterButtons";


function App() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);

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
  
  if (!loaded) return <div className="loading">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/movies" replace />} />
          
          <Route path="movies" element={<MovieCardList data={data} view="all" />} />
          
          <Route path="watchlist" element={<MovieCardList data={data} view="watchlist" />} />
          
          <Route path="movies/:id" element={<MovieDetails data={data} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
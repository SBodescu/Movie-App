import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MovieCardList from "./components/MovieCardList/MovieCardList";
import SearchBar from "./components/SearchBar/SearchBar";
import PageButtons from "./components/PageButtons/PageButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./store/movieSlice";
import Layout from "./components/Layout/Layout";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch])
  
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/movies" replace />} />
          
          <Route path="movies" element={<MovieCardList />} />
          
          <Route path="watchlist" element={<MovieCardList />} />
          
          <Route path="movies/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
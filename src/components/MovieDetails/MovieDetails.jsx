import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getRatingClass} from '../MovieCard/MovieCard';
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.movies);

  const movie = movies.find(m => m.id === parseInt(id));
  const ratingClass = getRatingClass(movie.rating);

  
  if (!movie) return <div className="error">Movie not found!</div>;
  
  return (
    <div className="movie-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="details-frame">
        <div className="details-content">
          <img className="details-img" src={new URL(`../../assets/images/${movie.image}`, import.meta.url).href} alt={movie.title} />

          <div className="details-body">
            <h1 className="details-title">{movie.title}</h1>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <div className='rating-details'>
                <p><strong>Rating:</strong></p>
                <p className={`rating ${ratingClass}`}> {movie.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
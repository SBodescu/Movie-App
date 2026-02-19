import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWatchlist } from '../../store/movieSlice';
import "./MovieCard.css";

export default function MovieCard({ id, title, image, genre, rating, ...rest }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.movies.watchlist);
  const isInWatchlist = watchlist.includes(id);
  const btnClass = isInWatchlist ? 'card-btn in-watchlist' : 'card-btn';
  const addedMessage = 'Added to watchlist';
  const notAddedMessage = 'Add to watchlist';
  const ratingClassName = getRatingClass(rating);
  const movie = { id, title, image, genre, rating, ...rest };
  
  return (
    <div className="card">
      <Link to={`/movies/${id}`}>
        <img src={image} alt={title} className="card-img" />
      </Link>
      <div className="card-body">
        <Link to={`/movies/${id}`}>
          <h2>{title}</h2>
        </Link>
        <div className="genre-rating">
          <span className="genre">{genre}</span>
          <span className={`rating ${ratingClassName}`}>{rating}</span>
        </div>
        <button 
          className={btnClass}
          onClick={() => dispatch(toggleWatchlist(movie))}
        >
          {isInWatchlist ? addedMessage : notAddedMessage}
        </button>
      </div>
    </div>
  );
}

export function getRatingClass(rating) {
  const numRating = parseFloat(rating);
  if (numRating >= 8) return 'rating-high';
  if (numRating >= 5) return 'rating-medium';
  return 'rating-low';
}
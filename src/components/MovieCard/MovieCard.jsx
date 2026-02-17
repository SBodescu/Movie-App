import { Link } from 'react-router-dom';
import "./MovieCard.css";

export default function MovieCard({ id, title, image, genre, rating, isInWatchlist, onToggleWatchlist }) {
  const btnClass = isInWatchlist ? 'card-btn in-watchlist' : 'card-btn';
  const ratingClassName = getRatingClass(rating);
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
          onClick={onToggleWatchlist}
        >
          {isInWatchlist ? 'Added to watchlist' : 'Add to watchlist'}
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
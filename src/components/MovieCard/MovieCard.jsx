import "./MovieCard.css";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "../../utils/localstorage";
import { useState, useEffect } from "react";

export default function MovieCard(props){
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        setIsAdded(isInWatchlist(props.id));
    }, [props.id]);

    const handleWatchlistClick = () => {
        const movieData = {
            id: props.id,
            title: props.title,
            genre: props.genre,
            rating: props.rating,
            image: props.image
        };
        
        if (isAdded) {
            removeFromWatchlist(props.id);
            setIsAdded(false);
        } else {
            addToWatchlist(movieData);
            setIsAdded(true);
        }
    };

    const ratingColor = parseFloat(props.rating) >= 8 ? '#2ecc71' : '#f6d621';
    return(
        <div className="card">
            <img src={props.image} alt={props.title} className="card-img" />
            <div className="card-body">
                <h2>{props.title}</h2>
                <div className="genre-rating">
                    <span className="genre">{props.genre}</span>
                    <span className="rating" style = {{color:ratingColor}}>{props.rating}</span>
                </div>
                <button 
                    className="card-btn" 
                    onClick={handleWatchlistClick}
                    style={{
                        backgroundColor: isAdded ? '#f6d621' : '#393939'
                    }}
                >
                    {isAdded ? 'Added to watchlist' : 'Add to watchlist'}
                </button>
            </div>
        </div>
    );
}
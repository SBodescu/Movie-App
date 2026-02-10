import "./MovieCard.css";

export default function MovieCard(props){
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
                
                <button className="card-btn">Add to watchlist</button>
            </div>
        </div>
    );
}
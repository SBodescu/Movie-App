import "./FilterButtons.css"

export default function FilterButtons({filterGenre, onFilterGenre, filterRating, onFilterRating}){
    return(
        <div className="filters-container">
            <div className="pill-button">
                <h3>Genre</h3>
                <select id="genre" value={filterGenre} onChange={(e)=>onFilterGenre(e.target.value)}>
                    <option value="all">All Genres</option>
                    <option value="action">Action</option>
                    <option value="drama">Drama</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="horror">Horror</option>
                </select>
            </div>
            <div className="pill-button">
                <h3>Rating</h3>
                <select id="rating" value={filterRating} onChange={(e)=>onFilterRating(e.target.value)}>
                    <option value="all">All</option>
                    <option value="lt5">less than 5</option>
                    <option value="b5a8">5-8</option>
                    <option value="gt8">greater than 8</option>
                </select>
            </div>
        </div>
    );
}
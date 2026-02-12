import "./MovieCardList.css";
//import dataFile from "../../movies.json";
import MovieCard from "../MovieCard/MovieCard";
import { getWatchlist } from '../../utils/localstorage';
import filterAndSortMovies from '../../utils/filters';

export default function MovieCardList({data =[], filters = {}, view = 'all' }){
    const { searchText = '', genre = 'all', rating = 'all', sort = 'all' } = filters;
    const getImageUrl = (name) => {
        return new URL(`../../assets/images/${name}`, import.meta.url).href;
    }

    if (!data || data.length === 0) {
        return <div className="card-list-container">Loading movies...</div>;
    }

    const watchIds = view === 'watchlist' ? getWatchlist().map(m => m.id) : null;
    const filteredMovies = filterAndSortMovies(data, {
        searchText,
        genre,
        rating,
        sort,
        view,
        watchIds
    });

    if (filteredMovies.length === 0) {
        let errorMessage = "No movies found";
        
        if (view === 'watchlist') {
            errorMessage = "Your watchlist is empty. Add some movies to get started!";
        } else if (searchText.trim() !== "") {
            errorMessage = `No movies found matching "${searchText}"`;
        } else if (genre !== "all" || rating !== "all") {
            errorMessage = "No movies match your filters. Try adjusting your search criteria.";
        }

        return (
            <div className="card-list-container">
                <div className="no-results-message">{errorMessage}</div>
            </div>
        );
    }
    return(
        <div className="card-list-container">
            {filteredMovies.map((item)=>
                <MovieCard
                    key = {item.id}
                    id = {item.id}
                    image = {getImageUrl(item.image)}
                    title = {item.title}
                    genre = {item.genre}
                    rating = {item.rating}
                />
            )}
        </div>
    );
}
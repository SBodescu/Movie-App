import "./MovieCardList.css";
import dataFile from "../../movies.json";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieCardList({searchText=" ", filterGenre, filterRating }){
    const getImageUrl = (name) => {
        return new URL(`../../assets/images/${name}`, import.meta.url).href;
    }
    const filteredMovies = dataFile.filter((item) => {
                    if (!item.title) return false; 
                    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
                    const matchesGenre = filterGenre === "all" || item.genre.toLowerCase() === filterGenre.toLowerCase();
                    let matchesRating = true;
                    if (filterRating === "lt5") {matchesRating = item.rating < 5; console.log(matchesRating);}
                    else if (filterRating === "b5a8") matchesRating = item.rating >= 5 && item.rating <= 8;
                    else if (filterRating === "gt8") matchesRating = item.rating >8;
                    return matchesSearch && matchesGenre && matchesRating;
    })
    return(
        <div className="card-list-container">
            {filteredMovies.map((item)=>
                <MovieCard
                    key = {item.id}
                    image = {getImageUrl(item.image)}
                    title = {item.title}
                    genre = {item.genre}
                    rating = {item.rating}
                />
            )}
        </div>
    );
}
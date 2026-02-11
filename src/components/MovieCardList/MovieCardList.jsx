import "./MovieCardList.css";
import dataFile from "../../movies.json";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieCardList({searchText=" "}){
    const getImageUrl = (name) => {
        return new URL(`../../assets/images/${name}`, import.meta.url).href;
    }
    return(
        <div className="card-list-container">
            {dataFile.filter((item) => {
                    if (!item.title) return false; 
                    return item.title.toLowerCase().includes(searchText.toLowerCase());
                }).map((item)=>
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
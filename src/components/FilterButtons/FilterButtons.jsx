import { useDispatch, useSelector } from 'react-redux';
import { setGenreFilter, setRatingFilter, setSortFilter } from '../../store/movieSlice';
import "./FilterButtons.css"

export default function FilterButtons(){
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.movies.filters);
    
    return(
        <div className="filters-container">
            <div className="pill-button">
                <h3>Sort</h3>
                <select id="sorting" value={filters.sort} onChange={(e)=>dispatch(setSortFilter(e.target.value))}>
                    <option value="all">All</option>
                    <option value="ascending">A-Z</option>
                    <option value="descending">Z-A</option>
                </select>
            </div>
            <div className="pill-button">
                <h3>Genre</h3>
                <select id="genre" value={filters.genre} onChange={(e)=>dispatch(setGenreFilter(e.target.value))}>
                    <option value="all">All Genres</option>
                    <option value="action">Action</option>
                    <option value="drama">Drama</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="horror">Horror</option>
                </select>
            </div>
            <div className="pill-button">
                <h3>Rating</h3>
                <select id="rating" value={filters.rating} onChange={(e)=>dispatch(setRatingFilter(e.target.value))}>
                    <option value="all">All</option>
                    <option value="lt5">less than 5</option>
                    <option value="b5a8">5-8</option>
                    <option value="gt8">greater than 8</option>
                </select>
            </div>
            
        </div>
    );
}
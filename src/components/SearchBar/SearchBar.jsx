import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../store/movieSlice';
import "./SearchBar.css"

export default function SearchBar(){
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.movies.searchText);
    
    return (
        <div className="search-container">
            <input className="search-input" 
            type="text" 
            value={searchText} 
            onChange={(e)=>dispatch(setSearchText(e.target.value))}
            placeholder="Search movies.."></input>
        </div>
    );
}
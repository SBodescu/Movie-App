import "./SearchBar.css"

export default function SearchBar({searchText, onSearchTextChange}){
    return (
        <div className="search-container">
            <input className="search-input" 
            type="text" 
            value={searchText} 
            onChange={(e)=>onSearchTextChange(e.target.value)}
            placeholder="Search movies.."></input>
        </div>
    );
}
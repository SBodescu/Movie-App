export default function filterAndSortMovies(movies, { searchText, genre, rating, sort, view, watchIds }) {
    return movies
        .filter((item) => {
            if (view === 'watchlist' && (!watchIds || !watchIds.includes(item.id))) return false;
            if (!item.title) return false;
            
            const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
            const matchesGenre = genre === "all" || item.genre.toLowerCase() === genre.toLowerCase();
            
            let matchesRating = true;
            switch (rating) {
                case "lt5":
                    matchesRating = item.rating < 5;
                    break;
                case "b5a8":
                    matchesRating = item.rating >= 5 && item.rating <= 8;
                    break;
                case "gt8":
                    matchesRating = item.rating > 8;
                    break;
                case "all":
                default:
                    matchesRating = true;
                    break;
            }
            
            return matchesSearch && matchesGenre && matchesRating;
        })
        .sort((a, b) => {
            switch (sort) {
                case "ascending":
                    return a.title.localeCompare(b.title);
                case "descending":
                    return b.title.localeCompare(a.title);
                case "all":
                default:
                    return 0;
            }
        });
}
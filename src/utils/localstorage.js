function getWatchlist() {
    const data = localStorage.getItem('watchlist');
    return data ? JSON.parse(data) : [];
}

function addToWatchlist(movie) {
    const watchlist = getWatchlist();
    if (!watchlist.find(item => item.id === movie.id)) {
        watchlist.push(movie);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
    return watchlist;
}

function removeFromWatchlist(movieId) {
    const watchlist = getWatchlist();
    const filtered = watchlist.filter(item => item.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(filtered));
    return filtered;
}

function isInWatchlist(movieId) {
    const watchlist = getWatchlist();
    return watchlist.some(item => item.id === movieId);
}

export { getWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
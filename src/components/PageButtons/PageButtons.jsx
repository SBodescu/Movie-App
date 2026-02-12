import "./PageButtons.css"

export default function PageButtons({ onChangeView, view = 'all' }){
    return(
        <div className="nav-container">
            <div>
                <h1>SomeFlix</h1>
            </div>
            <div className="page-buttons-container">
                <button
                    className={`nav-btn ${view === 'all' ? 'active' : ''}`}
                    onClick={() => onChangeView && onChangeView('all')}
                >
                    Home
                </button>
                <button
                    className={`nav-btn ${view === 'watchlist' ? 'active' : ''}`}
                    onClick={() => onChangeView && onChangeView('watchlist')}
                >
                    Watchlist
                </button>
            </div>
        </div>
        
    );
}
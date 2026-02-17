import { NavLink } from "react-router-dom";
import "./PageButtons.css";

export default function PageButtons() {
    return (
        <div className="nav-container">
            <h1>SomeFlix</h1>
            <div className="page-buttons-container">
                <NavLink to="/movies" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                    Home
                </NavLink>
                <NavLink to="/watchlist" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                    Watchlist
                </NavLink>
            </div>
        </div>
    );
}
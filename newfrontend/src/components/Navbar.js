import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import the Navbar styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">EverGreen</Link>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/map">Map</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import MapPage from './components/MapPage';
import FAQPage from './components/FAQPage';
import MissionPage from './components/MissionPage';
import './App.css';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="logo">EVERGREEN</h1>
        <ul className="nav-links">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/map" className="nav-link">Map</NavLink></li>
          <li><NavLink to="/mission" className="nav-link">Mission</NavLink></li>
          <li><NavLink to="/faq" className="nav-link">FAQ</NavLink></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

/* Footer Component */
const Footer = () => (
  <footer className="footer">
    <p>© 2025 EverGreen. All rights reserved.</p>
  </footer>
);

export default App;
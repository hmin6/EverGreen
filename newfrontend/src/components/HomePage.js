import { Link } from 'react-router-dom';
import '../styles/PageContainer.css';

const HomePage = () => {
  return (
    <div className="page-container">
      <h1 style={{ color: '#1B5E20' }}>Welcome to EverGreen!</h1>
      <p>Explore the environmental health of different areas with real-time data visualization.</p>
      <Link to="/map">
        <button className="button">Explore Now</button>
      </Link>
    </div>
  );
};

export default HomePage;

import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-row">
          <div className="header-left">
            <Link to="/" className="header-logo-link">
              <img src="/assets/images/logo.png" alt="ShikshaSetu Logo" className="header-logo" style={{ marginRight: '0.5rem' }} />
              <span className="header-title">ShikshaSetu</span>
            </Link>
          </div>
          <div className="header-actions">
            <nav className="header-nav">
              <Link to="/" className="header-link">Home</Link>
              <Link to="/about" className="header-link">About</Link>
              <Link to="/courses" className="header-link">Courses</Link>
              <Link to="/contact" className="header-link">Contact</Link>
            </nav>
            <Link to="/login" className="header-btn">Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
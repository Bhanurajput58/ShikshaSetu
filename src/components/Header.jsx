import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-row">
          <div className="header-left">
            <Link to="/" className="header-logo-link">
              <img src="/assets/images/logo.png" alt="ShikshaSetu Logo" className="header-logo"/>
              <span className="header-title">ShikshaSetu</span>
            </Link>
            <nav className="header-nav">
              <Link to="/" className="header-link">Home</Link>
              <Link to="/about" className="header-link">About</Link>
              <Link to="/courses" className="header-link">Courses</Link>
              <Link to="/course-library" className="header-link">Course Library</Link>
              <Link to="/dashboard" className="header-link">Dashboard</Link>
              <Link to="/contact" className="header-link">Contact</Link>
            </nav>
          </div>
          <div className="header-actions">
            <button 
              className="header-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>
            <Link to="/login" className="header-btn">Login</Link>
            <Link to="/register" className="header-btn header-btn-primary">Register</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
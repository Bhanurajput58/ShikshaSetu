import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem, Avatar, Typography, Box } from '@mui/material';
import { AccountCircle, Logout, Dashboard } from '@mui/icons-material';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(() => {
      handleMenuClose();
      navigate('/');
    });
  };

  const handleDashboardClick = () => {
    if (hasRole('student')) {
      navigate('/student-dashboard');
    } else if (hasRole('educator')) {
      navigate('/educator-dashboard');
    }
    handleMenuClose();
  };

  const getPublicNavLinks = () => (
    <>
      <Link to="/courses" className="header-link">Courses</Link>
      <Link to="/contact" className="header-link">Contact</Link>
    </>
  );

  const getAuthenticatedNavLinks = () => (
    <>
      <Link to="/courses" className="header-link">Courses</Link>
      <Link to="/contact" className="header-link">Contact</Link>
    </>
  );

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
              {isAuthenticated() ? getAuthenticatedNavLinks() : getPublicNavLinks()}
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
            
            {isAuthenticated() ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={handleMenuClick}
                  startIcon={<AccountCircle />}
                  sx={{ 
                    color: 'white', 
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    {user?.name}
                  </Typography>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                    }
                  }}
                >
                  <MenuItem onClick={handleDashboardClick}>
                    <Dashboard sx={{ mr: 1 }} />
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Link to="/login" className="header-btn">Login</Link>
                <Link to="/register" className="header-btn header-btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
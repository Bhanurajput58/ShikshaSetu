import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './StudentNav.css';

const StudentNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef();

  const navItems = [
    { path: '/student-dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/course-library', label: 'Course Library', icon: '📚' },
    { path: '/my-courses', label: 'My Courses', icon: '📖' },
    { path: '/mentorship', label: 'Mentorship', icon: '🤝' },
    { path: '/community-forum', label: 'Community Forum', icon: '💬' }
  ];

  const handleLogout = () => {
    logout(() => {
      navigate('/');
    });
  };

  const handleAvatarMouseEnter = (event) => {
    clearTimeout(closeTimer.current);
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    clearTimeout(closeTimer.current);
  };

  const handleMenuMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  };

  const handleProfile = () => {
    navigate('/profile');
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <div className="mobile-drawer-content">
      <div className="mobile-drawer-header">
        <div className="mobile-drawer-user-info">
          <Avatar
            src={user?.profilePicture || "https://ui-avatars.com/api/?name=Profile&background=667eea&color=fff"}
            alt="Profile"
            className="mobile-drawer-avatar"
          />
          <div className="mobile-drawer-user-details">
            <Typography variant="h6" className="mobile-drawer-user-name">
              {user?.name || 'User'}
            </Typography>
            <Typography variant="body2" className="mobile-drawer-user-role">
              Student
            </Typography>
          </div>
        </div>
        <IconButton onClick={handleDrawerToggle} className="mobile-drawer-close">
          <CloseIcon />
        </IconButton>
      </div>
      <List className="mobile-drawer-nav">
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            button
            onClick={() => handleMobileNavClick(item.path)}
            className={`mobile-drawer-item ${
              location.pathname === item.path ? 'mobile-drawer-item-active' : ''
            }`}
          >
            <ListItemIcon className="mobile-drawer-item-icon">
              <span className="mobile-nav-icon">{item.icon}</span>
            </ListItemIcon>
            <ListItemText primary={item.label} className="mobile-drawer-item-text" />
          </ListItem>
        ))}
      </List>
      <div className="mobile-drawer-footer">
        <ListItem button onClick={handleProfile} className="mobile-drawer-footer-item">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button onClick={handleLogout} className="mobile-drawer-footer-item logout">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <IconButton
              onClick={handleDrawerToggle}
              className="mobile-menu-button"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </div>
          
          {/* Desktop User Section */}
          <div
            className="hidden md:flex items-center"
            onMouseEnter={handleAvatarMouseEnter}
            onMouseLeave={handleAvatarMouseLeave}
          >
            {user?.name && (
              <span style={{ marginRight: '12px', fontWeight: 500, fontSize: '1rem', color: '#444' }}>
                Hi, {user.name}
              </span>
            )}
            <Avatar
              src={user?.profilePicture || "https://ui-avatars.com/api/?name=Profile&background=667eea&color=fff"}
              alt="Profile"
              className="cursor-pointer"
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleAvatarMouseLeave}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              MenuListProps={{
                onMouseEnter: handleMenuMouseEnter,
                onMouseLeave: handleMenuMouseLeave,
              }}
              disableScrollLock={true}
              PaperProps={{
                style: {
                  minWidth: 200,
                  borderRadius: 12,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  padding: 0
                }
              }}
            >
              <MenuItem onClick={handleProfile} style={{ fontSize: '1rem', padding: '12px 20px' }}>
                <PersonIcon style={{ marginRight: 12, color: '#555' }} /> My Profile
              </MenuItem>
              <div style={{ borderTop: '1px solid #eee', margin: '4px 0' }} />
              <MenuItem onClick={handleLogout} style={{ fontSize: '1rem', padding: '12px 20px', color: '#d32f2f' }}>
                <LogoutIcon style={{ marginRight: 12, color: '#d32f2f' }} /> Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="mobile-drawer"
        PaperProps={{
          className: 'mobile-drawer-paper'
        }}
      >
        {drawerContent}
      </Drawer>
    </nav>
  );
};

export default StudentNav; 
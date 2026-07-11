import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';

const DashboardNav = ({ navItems, profilePath }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimer = useRef();

  const handleLogout = () => {
    logout(() => navigate('/'));
    setDrawerOpen(false);
  };

  const handleProfile = () => {
    navigate(profilePath);
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleAvatarMouseEnter = (event) => {
    clearTimeout(closeTimer.current);
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMouseLeave = () => {
    closeTimer.current = setTimeout(() => setAnchorEl(null), 150);
  };

  const handleMenuMouseEnter = () => clearTimeout(closeTimer.current);
  const handleMenuMouseLeave = () => {
    closeTimer.current = setTimeout(() => setAnchorEl(null), 150);
  };

  const navLinkClass = (path) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
      location.pathname === path
        ? 'border-green-500 text-green-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;

  const drawer = (
    <Box sx={{ width: 280, pt: 1 }} role="presentation">
      <Typography variant="subtitle1" sx={{ px: 2, py: 1.5, fontWeight: 600, color: '#1e3a8a' }}>
        ShikshaSetu
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary={`${item.icon} ${item.label}`} />
          </ListItemButton>
        ))}
        <ListItemButton onClick={handleProfile}>
          <ListItemText primary="👤 My Profile" />
        </ListItemButton>
        <ListItemButton onClick={handleLogout} sx={{ color: '#d32f2f' }}>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-16 py-2 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {isMobile && (
              <IconButton
                edge="start"
                aria-label="Open navigation menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: '#374151' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {!isMobile && (
              <div className="flex items-center gap-6 overflow-x-auto">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            {isMobile && (
              <Typography variant="body2" noWrap sx={{ fontWeight: 600, color: '#374151', maxWidth: 140 }}>
                {navItems.find((item) => item.path === location.pathname)?.label || 'Menu'}
              </Typography>
            )}
          </div>

          <div
            className="flex items-center shrink-0"
            onMouseEnter={user ? handleAvatarMouseEnter : undefined}
            onMouseLeave={user ? handleAvatarMouseLeave : undefined}
          >
            {user?.name && !isMobile && (
              <span className="mr-3 font-medium text-gray-700 text-sm hidden sm:inline">
                Hi, {user.name}
              </span>
            )}
            <Avatar
              src={
                user?.profilePicture?.startsWith('data')
                  ? user.profilePicture
                  : user?.profilePicture || undefined
              }
              alt={user?.name || 'Profile'}
              className="cursor-pointer"
              sx={{ width: 36, height: 36 }}
            >
              {!user?.profilePicture && user?.name ? user.name.charAt(0).toUpperCase() : null}
            </Avatar>
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
              disableScrollLock
              PaperProps={{
                sx: { minWidth: 200, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
              }}
            >
              <MenuItem onClick={handleProfile} sx={{ fontSize: '1rem', py: 1.5 }}>
                <PersonIcon sx={{ mr: 1.5, color: '#555' }} /> My Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ fontSize: '1rem', py: 1.5, color: '#d32f2f' }}>
                <LogoutIcon sx={{ mr: 1.5, color: '#d32f2f' }} /> Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawer}
      </Drawer>
    </nav>
  );
};

export default DashboardNav;

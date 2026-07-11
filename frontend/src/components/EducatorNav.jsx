import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const EducatorNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const closeTimer = useRef();

  const navItems = [
    { path: '/educator-dashboard', label: 'Home', icon: '🏠' },
    { path: '/educator-dashboard/upload', label: 'Upload Resource', icon: '📤' },
    { path: '/educator-dashboard/manage', label: 'Manage Courses', icon: '📚' },
    { path: '/educator-dashboard/mentorship-requests', label: 'Mentorship Requests', icon: '🤝' },
    { path: '/educator-dashboard/forum', label: 'Forum Participation', icon: '💬' },
    { path: '/educator-dashboard/profile', label: 'Profile', icon: '👤' }
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
    navigate('/educator-dashboard/profile');
    setAnchorEl(null);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navItems.slice(0, -1).map((item) => (
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
          <div
            className="flex items-center"
            onMouseEnter={user ? handleAvatarMouseEnter : undefined}
            onMouseLeave={user ? handleAvatarMouseLeave : undefined}
          >
            {user?.name && (
              <span style={{ marginRight: '12px', fontWeight: 500, fontSize: '1rem', color: '#444' }}>
                Hi, {user.name}
              </span>
            )}
            <Avatar
              src={
                user?.profilePicture && user.profilePicture.startsWith('data')
                  ? user.profilePicture
                  : (user?.profilePicture
                      ? `${user.profilePicture}`
                      : undefined)
              }
              alt={user?.name || "Profile"}
              className="cursor-pointer"
            >
              {!user?.profilePicture && user?.name
                ? user.name.charAt(0).toUpperCase()
                : null}
            </Avatar>
            {user ? (
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
            ) : (
              <button
                onClick={() => navigate('/login')}
                style={{ marginLeft: 12, padding: '6px 18px', borderRadius: 6, border: 'none', background: '#667eea', color: '#fff', fontWeight: 500, cursor: 'pointer' }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EducatorNav; 
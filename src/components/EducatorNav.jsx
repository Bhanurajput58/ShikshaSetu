import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const EducatorNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
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
            onMouseEnter={handleAvatarMouseEnter}
            onMouseLeave={handleAvatarMouseLeave}
          >
            <Avatar
              src="https://ui-avatars.com/api/?name=Educator&background=667eea&color=fff"
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
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EducatorNav; 
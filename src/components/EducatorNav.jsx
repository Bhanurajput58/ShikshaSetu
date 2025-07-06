import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const EducatorNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <span className="mr-2">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EducatorNav; 
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/images/avatar.jpg',
    notificationCount: 3
  };

  const getPageTitle = () => {
    const pathTitles = {
      '/dashboard-home': 'Dashboard',
      '/mock-interview-scheduler': 'Mock Interviews',
      '/progress-analytics': 'Progress Analytics',
      '/user-profile-management': 'Profile Settings'
    };
    return pathTitles[location.pathname] || 'EduPrep Platform';
  };

  const handleLogout = () => {
    navigate('/user-login');
  };

  const handleProfileClick = () => {
    navigate('/user-profile-management');
    setIsProfileOpen(false);
  };

  return (
    <header className="nav-header fixed top-0 left-0 right-0 z-110 bg-surface border-b border-border safe-top">
      <div className="flex items-center justify-between w-full">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-150"
            aria-label="Toggle menu">

            <Icon name="Menu" size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">Edu</h1>
              <p className="text-xs text-text-secondary hidden md:block">{getPageTitle()}</p>
            </div>
          </div>
        </div>

        {/* Right Section - Notifications and Profile */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors duration-150 focus-ring">
            <Icon name="Bell" size={20} />
            {user.notificationCount > 0 &&
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {user.notificationCount}
              </span>
            }
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors duration-150 focus-ring">

              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="#2563EB" />
              </div>
              <span className="hidden md:block text-sm font-medium text-text-primary">
                {user.name}
              </span>
              <Icon name="ChevronDown" size={16} className="hidden md:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen &&
            <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg shadow-lg border border-border z-120 animate-scale-in">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">{user.name}</p>
                  <p className="text-xs text-text-secondary">{user.email}</p>
                </div>
                <div className="py-2">
                  <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors duration-150">

                    <Icon name="Settings" size={16} className="mr-3" />
                    Profile Settings
                  </button>
                  <button
                  onClick={() => navigate('/progress-analytics')}
                  className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors duration-150">

                    <Icon name="BarChart3" size={16} className="mr-3" />
                    View Progress
                  </button>
                  <button className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors duration-150">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm text-accent hover:bg-accent-50 transition-colors duration-150">

                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen &&
      <div className="lg:hidden fixed inset-0 top-16 bg-black bg-opacity-50 z-100" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-surface w-64 h-full shadow-xl animate-slide-up">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-text-primary">Navigation</h2>
            </div>
            <nav className="p-4 space-y-2">
              <button
              onClick={() => {
                navigate('/dashboard-home');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150">

                <Icon name="Home" size={16} className="mr-3" />
                Dashboard
              </button>
              <button
              onClick={() => {
                navigate('/mock-interview-scheduler');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150">

                <Icon name="Calendar" size={16} className="mr-3" />
                Mock Interviews
              </button>
              <button
              onClick={() => {
                navigate('/progress-analytics');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150">

                <Icon name="TrendingUp" size={16} className="mr-3" />
                Progress
              </button>
              <button
              onClick={() => {
                navigate('/user-profile-management');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150">

                <Icon name="User" size={16} className="mr-3" />
                Profile
              </button>
            </nav>
          </div>
        </div>
      }
    </header>);

};

export default AuthenticationHeader;
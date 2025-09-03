import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      badge: null,
      tooltip: 'Dashboard overview and quick actions'
    },
    {
      label: 'Practice',
      path: '/mock-interview-scheduler',
      icon: 'Calendar',
      badge: 2,
      tooltip: 'Schedule and manage mock interviews'
    },
    {
      label: 'Progress',
      path: '/progress-analytics',
      icon: 'TrendingUp',
      badge: null,
      tooltip: 'View your learning analytics and achievements'
    },
    {
      label: 'Profile',
      path: '/user-profile-management',
      icon: 'User',
      badge: null,
      tooltip: 'Manage your account and preferences'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100 safe-bottom">
        <div className="flex items-center justify-around px-2 py-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleTabClick(item.path)}
              className={`nav-tab relative ${isActive(item.path) ? 'active' : ''}`}
              title={item.tooltip}
              aria-label={item.label}
            >
              <div className="nav-tab-icon relative">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActive(item.path) ? '#2563EB' : '#6B7280'}
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive(item.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-surface border-r border-border z-100 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
            Navigation
          </h2>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleTabClick(item.path)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-smooth group ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                }`}
                title={item.tooltip}
              >
                <div className="relative mr-3">
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    color={isActive(item.path) ? '#2563EB' : 'currentColor'}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="flex-1 text-left">{item.label}</span>
                {isActive(item.path) && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Progress Section */}
          <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Weekly Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Interviews Completed</span>
                <span>3/5</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
            </div>
            <button
              onClick={() => handleTabClick('/progress-analytics')}
              className="mt-3 text-xs text-primary hover:text-primary-700 font-medium transition-colors duration-150"
            >
              View detailed analytics →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleTabClick('/mock-interview-scheduler')}
                className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150"
              >
                <Icon name="Plus" size={16} className="mr-3 text-secondary" />
                Schedule Interview
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150">
                <Icon name="BookOpen" size={16} className="mr-3 text-primary" />
                Start Practice Test
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BottomTabNavigation;
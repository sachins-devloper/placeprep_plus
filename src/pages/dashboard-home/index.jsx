import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationHeader from 'components/ui/AuthenticationHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import Icon from 'components/AppIcon';

import WelcomeBanner from './components/WelcomeBanner';
import ProgressOverview from './components/ProgressOverview';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import PerformanceMetrics from './components/PerformanceMetrics';
import RecommendedActions from './components/RecommendedActions';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    currentStreak: 7,
    totalPoints: 2450,
    level: "Intermediate",
    nextLevelPoints: 500,
    joinDate: "2024-01-15"
  };

  // Mock dashboard data
  const dashboardData = {
    completedCourses: 12,
    totalCourses: 25,
    averageTestScore: 85,
    totalTestsTaken: 34,
    upcomingInterviews: 2,
    certificatesEarned: 3,
    studyHoursThisWeek: 18,
    weeklyGoal: 20
  };

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'interview',
      title: 'Mock Interview Reminder',
      message: 'Technical interview scheduled for tomorrow at 2:00 PM',
      timestamp: '2 hours ago',
      read: false,
      icon: 'Calendar'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'Completed 7-day study streak',
      timestamp: '1 day ago',
      read: false,
      icon: 'Award'
    },
    {
      id: 3,
      type: 'course',
      title: 'New Course Available',
      message: 'Advanced Data Structures course is now live',
      timestamp: '2 days ago',
      read: true,
      icon: 'BookOpen'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality
    console.log('Searching for:', query);
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'interview') {
      navigate('/mock-interview-scheduler');
    } else if (notification.type === 'course') {
      // Navigate to courses page when available
      console.log('Navigate to courses');
    }
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationHeader />
      
      {/* Main Content */}
      <main className="content-with-nav content-with-header px-4 py-6">
        {/* Search Bar - Mobile */}
        <div className="lg:hidden mb-6">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <input
              type="text"
              placeholder="Search courses, tests, resources..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 text-primary">
              <div className="animate-spin">
                <Icon name="RefreshCw" size={20} />
              </div>
              <span className="text-sm font-medium">Refreshing...</span>
            </div>
          </div>
        )}

        {/* Welcome Banner */}
        <WelcomeBanner userData={userData} onRefresh={handleRefresh} />

        {/* Progress Overview Cards */}
        <ProgressOverview dashboardData={dashboardData} />

        {/* Quick Actions */}
        <QuickActions navigate={navigate} />

        {/* Recommended Actions */}
        <RecommendedActions navigate={navigate} />

        {/* Performance Metrics */}
        <PerformanceMetrics dashboardData={dashboardData} userData={userData} />

        {/* Recent Activity Feed */}
        <RecentActivity />

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-120 lg:hidden" onClick={() => setShowNotifications(false)}>
            <div className="absolute right-0 top-16 bottom-0 w-80 bg-surface shadow-xl animate-slide-up">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-150"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto h-full pb-20">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                      !notification.read ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'interview' ? 'bg-primary-100' :
                        notification.type === 'achievement'? 'bg-success-100' : 'bg-secondary-100'
                      }`}>
                        <Icon 
                          name={notification.icon} 
                          size={16} 
                          color={
                            notification.type === 'interview' ? '#2563EB' :
                            notification.type === 'achievement'? '#10B981' : '#059669'
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-text-primary">{notification.title}</h4>
                        <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                        <span className="text-xs text-text-secondary mt-2 block">{notification.timestamp}</span>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default DashboardHome;
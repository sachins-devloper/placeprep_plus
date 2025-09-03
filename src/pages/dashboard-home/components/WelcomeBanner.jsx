import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WelcomeBanner = ({ userData, onRefresh }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Keep up the great work! You're on fire! 🔥",
      "Every step forward is progress. Stay focused! 💪",
      "Your dedication is paying off. Keep going! ⭐",
      "Success is built one day at a time. You've got this! 🚀"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="card mb-6 bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={userData.avatar}
              alt={userData.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <Icon name="Zap" size={12} color="white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              {getGreeting()}, {userData.name.split(' ')[0]}!
            </h1>
            <p className="text-text-secondary text-sm">
              {userData.level} • Level {Math.floor(userData.totalPoints / 500) + 1}
            </p>
          </div>
        </div>
        
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-all duration-150"
          aria-label="Refresh dashboard"
        >
          <Icon name="RefreshCw" size={20} color="#2563EB" />
        </button>
      </div>

      {/* Streak Counter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="Flame" size={20} color="#F59E0B" />
            <span className="text-lg font-bold text-warning">{userData.currentStreak}</span>
            <span className="text-sm text-text-secondary">day streak</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-text-secondary">Total Points</div>
          <div className="text-lg font-bold text-primary">{userData.totalPoints.toLocaleString()}</div>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Progress to next level</span>
          <span>{userData.nextLevelPoints} points to go</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((userData.totalPoints % 500) / 500) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-white bg-opacity-60 rounded-lg p-3">
        <p className="text-sm text-text-primary font-medium text-center">
          {getMotivationalMessage()}
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
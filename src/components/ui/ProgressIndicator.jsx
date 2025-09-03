import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  type = 'circular', 
  progress = 0, 
  size = 'md', 
  showLabel = true, 
  label = '', 
  color = 'primary',
  animated = true,
  achievements = [],
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning'
  };

  const progressPercentage = Math.min(Math.max(progress, 0), 100);
  const circumference = 2 * Math.PI * 16; // radius of 16
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  if (type === 'circular') {
    return (
      <div className={`progress-ring ${className}`}>
        <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
          <svg
            className={`transform -rotate-90 ${sizeClasses[size]} ${animated ? 'transition-all duration-500 ease-smooth' : ''}`}
            viewBox="0 0 36 36"
          >
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${colorClasses[color]} ${animated ? 'transition-all duration-500 ease-smooth' : ''}`}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {achievements.length > 0 ? (
              <Icon name="Award" size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} className={colorClasses[color]} />
            ) : (
              <span className={`text-xs font-semibold ${colorClasses[color]}`}>
                {Math.round(progressPercentage)}%
              </span>
            )}
          </div>
        </div>
        
        {showLabel && label && (
          <div className="mt-2 text-center">
            <p className="text-sm font-medium text-text-primary">{label}</p>
            {achievements.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mt-1">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700"
                  >
                    <Icon name="Star" size={10} className="mr-1" />
                    {achievement}
                  </span>
                ))}
                {achievements.length > 3 && (
                  <span className="text-xs text-text-secondary">
                    +{achievements.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (type === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        {showLabel && label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">{label}</span>
            <span className="text-sm text-text-secondary">{Math.round(progressPercentage)}%</span>
          </div>
        )}
        
        <div className="progress-bar">
          <div
            className={`progress-fill ${animated ? 'transition-all duration-500 ease-smooth' : ''}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {achievements.map((achievement, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700"
              >
                <Icon name="Award" size={10} className="mr-1" />
                {achievement}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (type === 'steps') {
    const totalSteps = 5;
    const completedSteps = Math.floor((progressPercentage / 100) * totalSteps);
    
    return (
      <div className={`w-full ${className}`}>
        {showLabel && label && (
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-text-primary">{label}</span>
            <span className="text-sm text-text-secondary">
              {completedSteps}/{totalSteps} completed
            </span>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  index < completedSteps
                    ? `bg-${color} text-white`
                    : index === completedSteps
                    ? `bg-${color}-100 text-${color} border-2 border-${color}`
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < completedSteps ? (
                  <Icon name="Check" size={12} />
                ) : (
                  index + 1
                )}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    index < completedSteps ? `bg-${color}` : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {achievements.map((achievement, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700"
              >
                <Icon name="Trophy" size={10} className="mr-1" />
                {achievement}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ProgressIndicator;
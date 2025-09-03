import React from 'react';
import Icon from 'components/AppIcon';

const ProgressOverview = ({ dashboardData }) => {
  const progressCards = [
    {
      title: 'Courses Progress',
      value: dashboardData.completedCourses,
      total: dashboardData.totalCourses,
      percentage: Math.round((dashboardData.completedCourses / dashboardData.totalCourses) * 100),
      icon: 'BookOpen',
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconColor: '#2563EB'
    },
    {
      title: 'Test Average',
      value: dashboardData.averageTestScore,
      total: 100,
      percentage: dashboardData.averageTestScore,
      icon: 'Target',
      color: 'secondary',
      bgColor: 'bg-secondary-50',
      iconColor: '#059669',
      suffix: '%'
    },
    {
      title: 'Tests Taken',
      value: dashboardData.totalTestsTaken,
      total: null,
      percentage: null,
      icon: 'FileText',
      color: 'warning',
      bgColor: 'bg-warning-50',
      iconColor: '#F59E0B'
    },
    {
      title: 'Study Hours',
      value: dashboardData.studyHoursThisWeek,
      total: dashboardData.weeklyGoal,
      percentage: Math.round((dashboardData.studyHoursThisWeek / dashboardData.weeklyGoal) * 100),
      icon: 'Clock',
      color: 'success',
      bgColor: 'bg-success-50',
      iconColor: '#10B981',
      suffix: 'hrs'
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Progress Overview</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {progressCards.map((card, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon name={card.icon} size={20} color={card.iconColor} />
              </div>
              {card.percentage && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${card.color}-100 text-${card.color}-700`}>
                  {card.percentage}%
                </span>
              )}
            </div>
            
            <div className="mb-2">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-text-primary">
                  {card.value}
                </span>
                {card.suffix && (
                  <span className="text-sm text-text-secondary">{card.suffix}</span>
                )}
                {card.total && (
                  <span className="text-sm text-text-secondary">/{card.total}</span>
                )}
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-text-secondary">{card.title}</h3>
            
            {card.percentage && (
              <div className="mt-3">
                <div className="progress-bar h-1">
                  <div 
                    className={`h-full bg-${card.color} rounded-full transition-all duration-500 ease-smooth`}
                    style={{ width: `${card.percentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview;
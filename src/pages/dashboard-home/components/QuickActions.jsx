import React from 'react';
import Icon from 'components/AppIcon';

const QuickActions = ({ navigate }) => {
  const quickActions = [
    {
      title: 'Start Practice Test',
      description: 'Take a quick assessment',
      icon: 'Play',
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconColor: '#2563EB',
      action: () => navigate('/mock-interview-scheduler')
    },
    {
      title: 'Continue Course',
      description: 'Resume your learning',
      icon: 'BookOpen',
      color: 'secondary',
      bgColor: 'bg-secondary-50',
      iconColor: '#059669',
      action: () => console.log('Continue course')
    },
    {
      title: 'Schedule Interview',
      description: 'Book mock interview',
      icon: 'Calendar',
      color: 'warning',
      bgColor: 'bg-warning-50',
      iconColor: '#F59E0B',
      action: () => navigate('/mock-interview-scheduler')
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="card p-4 text-left hover:shadow-md transition-all duration-150 active:scale-[1.02] focus-ring"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${action.bgColor}`}>
                <Icon name={action.icon} size={24} color={action.iconColor} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-text-primary mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {action.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-text-secondary" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
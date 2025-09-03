import React from 'react';
import Icon from 'components/AppIcon';

const RecommendedActions = ({ navigate }) => {
  const recommendations = [
    {
      id: 1,
      type: 'course',
      title: 'Complete Data Structures Module',
      description: 'You\'re 80% through this course. Finish strong!',
      priority: 'high',
      estimatedTime: '2 hours',
      icon: 'BookOpen',
      action: () => console.log('Continue course'),
      progress: 80
    },
    {
      id: 2,
      type: 'test',
      title: 'Take System Design Practice Test',
      description: 'Based on your learning path, this test will help identify gaps.',
      priority: 'medium',
      estimatedTime: '45 minutes',
      icon: 'FileText',
      action: () => navigate('/mock-interview-scheduler'),
      progress: null
    },
    {
      id: 3,
      type: 'interview',
      title: 'Schedule Technical Interview',
      description: 'You haven\'t practiced interviews this week. Book one now!',
      priority: 'high',
      estimatedTime: '1 hour',
      icon: 'Video',
      action: () => navigate('/mock-interview-scheduler'),
      progress: null
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-accent-50',
          text: 'text-accent-700',
          border: 'border-accent-200'
        };
      case 'medium':
        return {
          bg: 'bg-warning-50',
          text: 'text-warning-700',
          border: 'border-warning-200'
        };
      default:
        return {
          bg: 'bg-primary-50',
          text: 'text-primary-700',
          border: 'border-primary-200'
        };
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Recommended for You</h2>
        <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((item) => {
          const priorityColors = getPriorityColor(item.priority);
          
          return (
            <div
              key={item.id}
              className={`card p-4 border-l-4 ${priorityColors.border} hover:shadow-md transition-all duration-150`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${priorityColors.bg}`}>
                  <Icon name={item.icon} size={20} color={priorityColors.text.replace('text-', '#')} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-2">
                        {item.description}
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors.bg} ${priorityColors.text} capitalize`}>
                      {item.priority}
                    </span>
                  </div>
                  
                  {item.progress && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-text-secondary mb-1">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="progress-bar h-1">
                        <div 
                          className="progress-fill h-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{item.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={item.action}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      {item.type === 'course' ? 'Continue' : 
                       item.type === 'test' ? 'Start Test' : 'Schedule'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedActions;
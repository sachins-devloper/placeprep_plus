import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'course_completion',
      title: 'Completed "Advanced JavaScript Concepts"',
      description: 'Finished all 12 modules with 95% score',
      timestamp: '2 hours ago',
      icon: 'CheckCircle',
      color: 'success',
      bgColor: 'bg-success-50',
      iconColor: '#10B981'
    },
    {
      id: 2,
      type: 'test_taken',
      title: 'Scored 88% on Data Structures Test',
      description: 'Improved by 12% from last attempt',
      timestamp: '5 hours ago',
      icon: 'Target',
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconColor: '#2563EB'
    },
    {
      id: 3,
      type: 'interview_scheduled',
      title: 'Mock Interview Scheduled',
      description: 'Technical interview with Sarah Johnson tomorrow at 2:00 PM',
      timestamp: '1 day ago',
      icon: 'Calendar',
      color: 'warning',
      bgColor: 'bg-warning-50',
      iconColor: '#F59E0B'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement Unlocked: Week Warrior',
      description: 'Maintained 7-day study streak',
      timestamp: '2 days ago',
      icon: 'Award',
      color: 'secondary',
      bgColor: 'bg-secondary-50',
      iconColor: '#059669'
    },
    {
      id: 5,
      type: 'course_started',
      title: 'Started "System Design Fundamentals"',
      description: 'Enrolled in advanced course track',
      timestamp: '3 days ago',
      icon: 'BookOpen',
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconColor: '#2563EB'
    },
    {
      id: 6,
      type: 'test_taken',
      title: 'Completed Algorithms Practice Test',
      description: 'Scored 76% - Room for improvement in dynamic programming',
      timestamp: '4 days ago',
      icon: 'FileText',
      color: 'warning',
      bgColor: 'bg-warning-50',
      iconColor: '#F59E0B'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'System Design Course',
      description: 'Module 3 assignment due',
      dueDate: 'Tomorrow',
      priority: 'high',
      type: 'assignment'
    },
    {
      id: 2,
      title: 'Mock Interview',
      description: 'Technical interview with mentor',
      dueDate: 'Jan 30, 2:00 PM',
      priority: 'medium',
      type: 'interview'
    },
    {
      id: 3,
      title: 'Weekly Quiz',
      description: 'Data Structures weekly assessment',
      dueDate: 'Feb 2',
      priority: 'low',
      type: 'quiz'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-accent-700 bg-accent-50';
      case 'medium':
        return 'text-warning-700 bg-warning-50';
      default:
        return 'text-primary-700 bg-primary-50';
    }
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
            <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150">
              View All
            </button>
          </div>
          
          <div className="card p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${activity.bgColor} flex-shrink-0`}>
                    <Icon name={activity.icon} size={16} color={activity.iconColor} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-text-primary mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-text-secondary mb-2">
                      {activity.description}
                    </p>
                    <span className="text-xs text-text-secondary">
                      {activity.timestamp}
                    </span>
                  </div>
                  
                  {index < activities.length - 1 && (
                    <div className="absolute left-6 mt-12 w-px h-4 bg-border"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Upcoming</h2>
            <button className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150">
              View Calendar
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="card p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-text-primary">
                    {deadline.title}
                  </h4>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-3">
                  {deadline.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Clock" size={12} />
                    <span>{deadline.dueDate}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={
                        deadline.type === 'assignment' ? 'FileText' :
                        deadline.type === 'interview' ? 'Video' : 'HelpCircle'
                      } 
                      size={12} 
                      className="text-text-secondary"
                    />
                    <span className="text-xs text-text-secondary capitalize">
                      {deadline.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
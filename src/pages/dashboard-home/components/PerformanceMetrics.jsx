import React from 'react';
import Icon from 'components/AppIcon';

const PerformanceMetrics = ({ dashboardData, userData }) => {
  const achievements = [
    {
      id: 1,
      title: 'First Course',
      description: 'Completed your first course',
      icon: 'Award',
      earned: true,
      date: '2024-01-20'
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: '7-day study streak',
      icon: 'Flame',
      earned: true,
      date: '2024-01-25'
    },
    {
      id: 3,
      title: 'Test Master',
      description: 'Scored 90+ on 5 tests',
      icon: 'Target',
      earned: false,
      progress: 3,
      total: 5
    },
    {
      id: 4,
      title: 'Interview Pro',
      description: 'Complete 10 mock interviews',
      icon: 'Video',
      earned: false,
      progress: 6,
      total: 10
    }
  ];

  const weeklyStats = [
    { day: 'Mon', hours: 3, tests: 2 },
    { day: 'Tue', hours: 2, tests: 1 },
    { day: 'Wed', hours: 4, tests: 3 },
    { day: 'Thu', hours: 2, tests: 1 },
    { day: 'Fri', hours: 3, tests: 2 },
    { day: 'Sat', hours: 2, tests: 1 },
    { day: 'Sun', hours: 2, tests: 0 }
  ];

  const maxHours = Math.max(...weeklyStats.map(stat => stat.hours));

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Performance Metrics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary">Weekly Activity</h3>
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Study Hours</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span>Tests</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-end justify-between space-x-2 h-32 mb-4">
            {weeklyStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="flex flex-col items-center space-y-1 w-full">
                  {/* Study Hours Bar */}
                  <div className="w-full bg-gray-200 rounded-sm overflow-hidden" style={{ height: '60px' }}>
                    <div 
                      className="bg-primary rounded-sm transition-all duration-500 ease-smooth"
                      style={{ 
                        height: `${(stat.hours / maxHours) * 100}%`,
                        marginTop: `${100 - (stat.hours / maxHours) * 100}%`
                      }}
                    ></div>
                  </div>
                  {/* Tests Indicator */}
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.max(stat.tests, 1) }, (_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-1 rounded-full ${stat.tests > i ? 'bg-secondary' : 'bg-gray-200'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-text-secondary font-medium">{stat.day}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-text-secondary">This week: </span>
              <span className="font-semibold text-text-primary">{dashboardData.studyHoursThisWeek}h</span>
            </div>
            <div>
              <span className="text-text-secondary">Goal: </span>
              <span className="font-semibold text-text-primary">{dashboardData.weeklyGoal}h</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-text-primary">Achievements</h3>
            <span className="text-sm text-text-secondary">
              {achievements.filter(a => a.earned).length}/{achievements.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-150 ${
                  achievement.earned 
                    ? 'bg-success-50 border border-success-200' :'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  achievement.earned ? 'bg-success text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  <Icon 
                    name={achievement.icon} 
                    size={16} 
                    color={achievement.earned ? 'white' : '#6B7280'}
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${
                    achievement.earned ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {achievement.description}
                  </p>
                  
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-text-secondary mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="progress-bar h-1">
                        <div 
                          className="progress-fill h-full"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {achievement.earned && (
                  <div className="text-xs text-success-700 font-medium">
                    Earned
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
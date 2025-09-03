import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationHeader from 'components/ui/AuthenticationHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import { NavigationStateManager } from 'components/ui/NavigationStateManager';
import ProgressIndicator from 'components/ui/ProgressIndicator';
import Icon from 'components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ProgressAnalytics = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for analytics
  const overallStats = {
    totalProgress: 78,
    coursesCompleted: 12,
    totalCourses: 18,
    averageScore: 85,
    timeSpent: 142,
    streak: 15,
    rank: 23,
    totalUsers: 1250
  };

  const performanceData = [
    { month: 'Jan', score: 65, tests: 8, hours: 25 },
    { month: 'Feb', score: 72, tests: 12, hours: 32 },
    { month: 'Mar', score: 78, tests: 15, hours: 38 },
    { month: 'Apr', score: 85, tests: 18, hours: 45 },
    { month: 'May', score: 82, tests: 20, hours: 52 },
    { month: 'Jun', score: 88, tests: 22, hours: 58 }
  ];

  const subjectProgress = [
    { subject: 'Technical Skills', progress: 92, score: 88, color: '#2563EB', improvement: '+12%' },
    { subject: 'Aptitude', progress: 85, score: 82, color: '#059669', improvement: '+8%' },
    { subject: 'Communication', progress: 78, score: 75, color: '#DC2626', improvement: '+15%' },
    { subject: 'HR Questions', progress: 70, score: 68, color: '#F59E0B', improvement: '+5%' },
    { subject: 'Group Discussion', progress: 65, score: 62, color: '#7C3AED', improvement: '+18%' }
  ];

  const achievements = [
    { id: 1, title: 'First Week Complete', description: 'Completed your first week of preparation', icon: 'Award', earned: true, date: '2024-01-15' },
    { id: 2, title: 'Perfect Score', description: 'Scored 100% in Technical Assessment', icon: 'Star', earned: true, date: '2024-02-20' },
    { id: 3, title: 'Consistency Champion', description: '15-day learning streak', icon: 'Flame', earned: true, date: '2024-03-10' },
    { id: 4, title: 'Top Performer', description: 'Ranked in top 5% this month', icon: 'Trophy', earned: false, progress: 85 },
    { id: 5, title: 'Course Master', description: 'Complete 20 courses', icon: 'BookOpen', earned: false, progress: 60 }
  ];

  const weeklyGoals = [
    { goal: 'Complete 3 Mock Tests', current: 2, target: 3, progress: 67 },
    { goal: 'Study 10 Hours', current: 7.5, target: 10, progress: 75 },
    { goal: 'Improve Aptitude Score', current: 82, target: 85, progress: 96 },
    { goal: 'Practice Communication', current: 4, target: 5, progress: 80 }
  ];

  const peerComparison = [
    { category: 'Technical', you: 88, peers: 75, industry: 82 },
    { category: 'Aptitude', you: 82, peers: 78, industry: 80 },
    { category: 'Communication', you: 75, peers: 80, industry: 85 },
    { category: 'HR', you: 68, peers: 72, industry: 75 },
    { category: 'GD', you: 62, peers: 65, industry: 70 }
  ];

  const recentActivity = [
    { id: 1, type: 'test', title: 'Technical Assessment - Java', score: 92, date: '2024-06-15', duration: '45 min' },
    { id: 2, type: 'course', title: 'Data Structures & Algorithms', progress: 100, date: '2024-06-14', duration: '2.5 hrs' },
    { id: 3, type: 'interview', title: 'Mock Interview - Software Engineer', score: 85, date: '2024-06-13', duration: '30 min' },
    { id: 4, type: 'test', title: 'Aptitude Test - Quantitative', score: 78, date: '2024-06-12', duration: '60 min' }
  ];

  const timeRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'technical', label: 'Technical Skills' },
    { value: 'aptitude', label: 'Aptitude' },
    { value: 'communication', label: 'Communication' },
    { value: 'hr', label: 'HR Questions' },
    { value: 'gd', label: 'Group Discussion' }
  ];

  const handleExportReport = () => {
    setShowExportModal(true);
  };

  const generatePDFReport = () => {
    // Mock PDF generation
    alert('PDF report generated successfully! Check your downloads folder.');
    setShowExportModal(false);
  };

  const COLORS = ['#2563EB', '#059669', '#DC2626', '#F59E0B', '#7C3AED'];

  return (
    <NavigationStateManager>
      <div className="min-h-screen bg-background">
        <AuthenticationHeader />
        
        <main className="content-with-nav content-with-header px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Progress Analytics</h1>
                  <p className="text-text-secondary">Track your placement preparation journey and performance insights</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="form-input text-sm"
                  >
                    {timeRangeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={handleExportReport}
                    className="btn-primary flex items-center justify-center"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: 'BarChart3' },
                  { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
                  { id: 'subjects', label: 'Subjects', icon: 'BookOpen' },
                  { id: 'achievements', label: 'Achievements', icon: 'Award' },
                  { id: 'goals', label: 'Goals', icon: 'Target' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
                      </div>
                      <span className="text-xs text-success font-medium">+12%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">{overallStats.totalProgress}%</h3>
                    <p className="text-sm text-text-secondary">Overall Progress</p>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <Icon name="BookOpen" size={20} color="var(--color-secondary)" />
                      </div>
                      <span className="text-xs text-success font-medium">+3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">{overallStats.coursesCompleted}/{overallStats.totalCourses}</h3>
                    <p className="text-sm text-text-secondary">Courses Completed</p>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                        <Icon name="Star" size={20} color="var(--color-warning)" />
                      </div>
                      <span className="text-xs text-success font-medium">+5</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">{overallStats.averageScore}%</h3>
                    <p className="text-sm text-text-secondary">Average Score</p>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                        <Icon name="Clock" size={20} color="var(--color-accent)" />
                      </div>
                      <span className="text-xs text-success font-medium">+8h</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">{overallStats.timeSpent}h</h3>
                    <p className="text-sm text-text-secondary">Time Spent</p>
                  </div>
                </div>

                {/* Progress Overview Chart */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-text-primary">Performance Trend</h3>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="form-input text-sm w-auto"
                    >
                      {subjectOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#2563EB" 
                          strokeWidth={3}
                          dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
                    <button
                      onClick={() => navigate('/dashboard-home')}
                      className="text-primary hover:text-primary-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            activity.type === 'test' ? 'bg-primary-100' :
                            activity.type === 'course' ? 'bg-secondary-100' :
                            activity.type === 'interview' ? 'bg-warning-100' : 'bg-gray-100'
                          }`}>
                            <Icon 
                              name={
                                activity.type === 'test' ? 'FileText' :
                                activity.type === 'course' ? 'BookOpen' :
                                activity.type === 'interview' ? 'Video' : 'Activity'
                              } 
                              size={20} 
                              color={
                                activity.type === 'test' ? 'var(--color-primary)' :
                                activity.type === 'course' ? 'var(--color-secondary)' :
                                activity.type === 'interview' ? 'var(--color-warning)' : '#6B7280'
                              }
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary">{activity.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-text-secondary">
                              <span>{activity.date}</span>
                              <span>•</span>
                              <span>{activity.duration}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {activity.score && (
                            <div className="text-lg font-semibold text-text-primary">{activity.score}%</div>
                          )}
                          {activity.progress && (
                            <div className="text-lg font-semibold text-text-primary">{activity.progress}%</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                {/* Performance Charts */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="card">
                    <h3 className="text-lg font-semibold text-text-primary mb-6">Monthly Test Scores</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip />
                          <Bar dataKey="score" fill="#2563EB" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-lg font-semibold text-text-primary mb-6">Study Hours vs Performance</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="month" stroke="#6B7280" />
                          <YAxis stroke="#6B7280" />
                          <Tooltip />
                          <Line type="monotone" dataKey="hours" stroke="#059669" strokeWidth={2} />
                          <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Peer Comparison */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text-primary mb-6">Performance Comparison</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={peerComparison}>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <Radar name="You" dataKey="you" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} strokeWidth={2} />
                        <Radar name="Peers" dataKey="peers" stroke="#059669" fill="#059669" fillOpacity={0.2} strokeWidth={2} />
                        <Radar name="Industry" dataKey="industry" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} strokeWidth={2} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                      <span className="text-sm text-text-secondary">You</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                      <span className="text-sm text-text-secondary">Peers Average</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
                      <span className="text-sm text-text-secondary">Industry Standard</span>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="card text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Trophy" size={24} color="var(--color-primary)" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">#{overallStats.rank}</h3>
                    <p className="text-text-secondary">Current Rank</p>
                    <p className="text-xs text-text-secondary mt-1">out of {overallStats.totalUsers} users</p>
                  </div>

                  <div className="card text-center">
                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Flame" size={24} color="var(--color-secondary)" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{overallStats.streak}</h3>
                    <p className="text-text-secondary">Day Streak</p>
                    <p className="text-xs text-text-secondary mt-1">Keep it up!</p>
                  </div>

                  <div className="card text-center">
                    <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Target" size={24} color="var(--color-warning)" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">85%</h3>
                    <p className="text-text-secondary">Target Score</p>
                    <p className="text-xs text-text-secondary mt-1">3% to go</p>
                  </div>
                </div>
              </div>
            )}

            {/* Subjects Tab */}
            {activeTab === 'subjects' && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {subjectProgress.map((subject, index) => (
                    <div key={index} className="card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: subject.color }}
                          ></div>
                          <h3 className="font-semibold text-text-primary">{subject.subject}</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-success font-medium">{subject.improvement}</span>
                          <span className="text-lg font-bold text-text-primary">{subject.score}%</span>
                        </div>
                      </div>
                      
                      <ProgressIndicator
                        type="linear"
                        progress={subject.progress}
                        color="primary"
                        showLabel={false}
                        className="mb-3"
                      />
                      
                      <div className="flex justify-between text-sm text-text-secondary">
                        <span>Progress: {subject.progress}%</span>
                        <span>Last Score: {subject.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subject Distribution Chart */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text-primary mb-6">Subject Performance Distribution</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectProgress}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="score"
                          label={({ subject, score }) => `${subject}: ${score}%`}
                        >
                          {subjectProgress.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`card transition-all duration-200 ${
                        achievement.earned 
                          ? 'border-success bg-success-50' :'border-gray-200 opacity-75'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          achievement.earned 
                            ? 'bg-success text-white' :'bg-gray-200 text-gray-500'
                        }`}>
                          <Icon name={achievement.icon} size={20} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-text-primary">{achievement.title}</h3>
                            {achievement.earned && (
                              <Icon name="Check" size={16} className="text-success" />
                            )}
                          </div>
                          
                          <p className="text-sm text-text-secondary mb-3">{achievement.description}</p>
                          
                          {achievement.earned ? (
                            <div className="flex items-center text-xs text-success">
                              <Icon name="Calendar" size={12} className="mr-1" />
                              Earned on {achievement.date}
                            </div>
                          ) : (
                            <div>
                              <div className="flex justify-between text-xs text-text-secondary mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <ProgressIndicator
                                type="linear"
                                progress={achievement.progress}
                                color="primary"
                                showLabel={false}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievement Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="card text-center">
                    <h3 className="text-3xl font-bold text-primary mb-2">3</h3>
                    <p className="text-text-secondary">Achievements Earned</p>
                  </div>
                  <div className="card text-center">
                    <h3 className="text-3xl font-bold text-warning mb-2">2</h3>
                    <p className="text-text-secondary">In Progress</p>
                  </div>
                  <div className="card text-center">
                    <h3 className="text-3xl font-bold text-text-primary mb-2">5</h3>
                    <p className="text-text-secondary">Total Available</p>
                  </div>
                </div>
              </div>
            )}

            {/* Goals Tab */}
            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-text-primary">Weekly Goals</h3>
                    <button className="btn-primary">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add Goal
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {weeklyGoals.map((goal, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-text-primary">{goal.goal}</h4>
                          <span className="text-sm text-text-secondary">
                            {goal.current} / {goal.target}
                          </span>
                        </div>
                        
                        <ProgressIndicator
                          type="linear"
                          progress={goal.progress}
                          color="primary"
                          showLabel={false}
                          className="mb-2"
                        />
                        
                        <div className="flex justify-between text-xs text-text-secondary">
                          <span>{goal.progress}% Complete</span>
                          <span>
                            {goal.target - goal.current > 0 
                              ? `${goal.target - goal.current} remaining`
                              : 'Goal achieved!'
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goal Setting */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-text-primary mb-6">Set New Goal</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Goal Type</label>
                      <select className="form-input">
                        <option>Select goal type</option>
                        <option>Complete Tests</option>
                        <option>Study Hours</option>
                        <option>Score Target</option>
                        <option>Course Completion</option>
                      </select>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Target Value</label>
                        <input type="number" className="form-input" placeholder="Enter target" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Time Frame</label>
                        <select className="form-input">
                          <option>Weekly</option>
                          <option>Monthly</option>
                          <option>Quarterly</option>
                        </select>
                      </div>
                    </div>
                    
                    <button type="submit" className="btn-primary">
                      Create Goal
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-150 p-4">
            <div className="bg-surface rounded-lg max-w-md w-full p-6 animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Export Progress Report</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Report Type</label>
                  <select className="form-input">
                    <option>Comprehensive Report</option>
                    <option>Performance Summary</option>
                    <option>Subject Analysis</option>
                    <option>Achievement Report</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
                  <select className="form-input">
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                    <option>Last 6 Months</option>
                    <option>All Time</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-md text-text-primary hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={generatePDFReport}
                  className="flex-1 btn-primary"
                >
                  Generate PDF
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomTabNavigation />
      </div>
    </NavigationStateManager>
  );
};

export default ProgressAnalytics;
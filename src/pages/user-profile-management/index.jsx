import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import AuthenticationHeader from 'components/ui/AuthenticationHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import PersonalInformationSection from './components/PersonalInformationSection';
import AcademicDetailsSection from './components/AcademicDetailsSection';
import CareerPreferencesSection from './components/CareerPreferencesSection';
import PrivacySettingsSection from './components/PrivacySettingsSection';
import AccountSecuritySection from './components/AccountSecuritySection';

const UserProfileManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(78);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      completion: 85
    },
    {
      id: 'academic',
      label: 'Academic Details',
      icon: 'GraduationCap',
      completion: 90
    },
    {
      id: 'career',
      label: 'Career Preferences',
      icon: 'Briefcase',
      completion: 60
    },
    {
      id: 'privacy',
      label: 'Privacy Settings',
      icon: 'Shield',
      completion: 100
    },
    {
      id: 'security',
      label: 'Account Security',
      icon: 'Lock',
      completion: 75
    }
  ];

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this section?');
      if (!confirmLeave) return;
    }
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setHasUnsavedChanges(false);
  };

  const handleAutoSave = () => {
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const renderActiveSection = () => {
    const commonProps = {
      onDataChange: () => setHasUnsavedChanges(true),
      onAutoSave: handleAutoSave
    };

    switch (activeTab) {
      case 'personal':
        return <PersonalInformationSection {...commonProps} />;
      case 'academic':
        return <AcademicDetailsSection {...commonProps} />;
      case 'career':
        return <CareerPreferencesSection {...commonProps} />;
      case 'privacy':
        return <PrivacySettingsSection {...commonProps} />;
      case 'security':
        return <AccountSecuritySection {...commonProps} />;
      default:
        return <PersonalInformationSection {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationHeader />
      
      <div className="content-with-nav content-with-header">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="relative">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Icon name="User" size={32} color="white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">Profile Management</h1>
                  <p className="text-white text-opacity-90 text-sm lg:text-base">
                    Manage your account and preferences
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col lg:items-end space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} color="white" />
                  <span className="text-sm text-white text-opacity-90">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                </div>
                {hasUnsavedChanges && (
                  <div className="flex items-center space-x-2 text-warning-100">
                    <Icon name="AlertCircle" size={16} />
                    <span className="text-sm">Unsaved changes</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Completion */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white text-opacity-90">
                  Profile Completion
                </span>
                <span className="text-sm font-bold text-white">
                  {profileCompletion}%
                </span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500 ease-smooth"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="lg:flex lg:space-x-8">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
              <div className="bg-surface rounded-lg border border-border p-4 sticky top-24">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                  Profile Sections
                </h3>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-all duration-150 ease-smooth ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={tab.icon} 
                          size={18} 
                          color={activeTab === tab.id ? '#2563EB' : 'currentColor'}
                        />
                        <span>{tab.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              tab.completion === 100 ? 'bg-success' : 'bg-primary'
                            }`}
                            style={{ width: `${tab.completion}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-secondary">
                          {tab.completion}%
                        </span>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-text-secondary mb-3">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate('/dashboard-home')}
                      className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150"
                    >
                      <Icon name="Home" size={16} className="mr-3 text-primary" />
                      Back to Dashboard
                    </button>
                    <button
                      onClick={() => navigate('/progress-analytics')}
                      className="w-full flex items-center px-3 py-2 text-sm text-text-primary hover:bg-gray-50 rounded-md transition-colors duration-150"
                    >
                      <Icon name="BarChart3" size={16} className="mr-3 text-secondary" />
                      View Progress
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={tabs.find(tab => tab.id === activeTab)?.icon} size={20} />
                  <span className="font-medium">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </span>
                </div>
                <Icon name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} size={20} />
              </button>

              {isMobileMenuOpen && (
                <div className="mt-2 bg-surface border border-border rounded-lg overflow-hidden animate-slide-up">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm border-b border-border last:border-b-0 transition-colors duration-150 ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary' :'text-text-primary hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={tab.icon} 
                          size={18} 
                          color={activeTab === tab.id ? '#2563EB' : 'currentColor'}
                        />
                        <span className="font-medium">{tab.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-text-secondary">
                          {tab.completion}%
                        </span>
                        {tab.completion === 100 && (
                          <Icon name="CheckCircle" size={16} color="#10B981" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-surface rounded-lg border border-border">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default UserProfileManagement;
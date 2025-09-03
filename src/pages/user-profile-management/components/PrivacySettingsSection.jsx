import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PrivacySettingsSection = ({ onDataChange, onAutoSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [privacyData, setPrivacyData] = useState({
    profileVisibility: {
      public: true,
      searchable: true,
      showInDirectory: false,
      allowMessaging: true,
      showOnlineStatus: false
    },
    dataSharing: {
      shareWithRecruiters: true,
      shareWithEducationalInstitutions: false,
      shareForResearch: false,
      shareAnalytics: true,
      allowThirdPartyIntegrations: true
    },
    communication: {
      emailNotifications: {
        jobAlerts: true,
        courseUpdates: true,
        systemUpdates: true,
        marketingEmails: false,
        weeklyDigest: true,
        achievementNotifications: true
      },
      pushNotifications: {
        interviewReminders: true,
        messageNotifications: true,
        courseDeadlines: true,
        systemAlerts: true,
        socialUpdates: false
      },
      smsNotifications: {
        enabled: false,
        interviewReminders: false,
        urgentAlerts: false
      }
    },
    dataRetention: {
      keepAccountActive: true,
      autoDeleteInactiveData: false,
      dataRetentionPeriod: "2years", // 1year, 2years, 5years, indefinite
      downloadDataRequested: false,
      deleteAccountRequested: false
    },
    privacy: {
      hideFromSearchEngines: false,
      anonymizeInReports: true,
      limitDataCollection: false,
      optOutOfAnalytics: false,
      requireExplicitConsent: true
    },
    blockedUsers: [],
    reportedContent: []
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const keys = field.split('.');
      setPrivacyData(prev => {
        const updated = { ...prev };
        let current = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return updated;
      });
    } else {
      setPrivacyData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    onDataChange();
    
    setTimeout(() => {
      onAutoSave();
    }, 2000);
  };

  const handleDataDownload = () => {
    // Mock data download functionality
    const confirmDownload = window.confirm('This will prepare your data for download. You will receive an email when it\'s ready. Continue?');
    if (confirmDownload) {
      handleInputChange('dataRetention.downloadDataRequested', true);
      // In a real app, this would trigger a backend process
      alert('Data download request submitted. You will receive an email within 24 hours with download instructions.');
    }
  };

  const handleAccountDeletion = () => {
    const confirmDelete = window.confirm('Are you sure you want to request account deletion? This action cannot be undone and all your data will be permanently removed.');
    if (confirmDelete) {
      const finalConfirm = window.confirm('This is your final confirmation. Your account and all associated data will be permanently deleted. Type "DELETE" to confirm.');
      if (finalConfirm) {
        handleInputChange('dataRetention.deleteAccountRequested', true);
        alert('Account deletion request submitted. You will receive a confirmation email with further instructions.');
      }
    }
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false, label, description }) => (
    <div className="flex items-start justify-between py-3">
      <div className="flex-1 mr-4">
        <h4 className="text-sm font-medium text-text-primary">{label}</h4>
        {description && (
          <p className="text-xs text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled || !isEditing}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          checked ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Privacy Settings</h2>
          <p className="text-text-secondary mt-1">
            Control your privacy and data sharing preferences
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
            isEditing
              ? 'bg-success text-white hover:bg-success-700' :'bg-primary text-white hover:bg-primary-700'
          }`}
        >
          <Icon name={isEditing ? "Save" : "Edit"} size={16} className="mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Settings'}
        </button>
      </div>

      {/* Profile Visibility */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Eye" size={20} className="mr-2 text-primary" />
          Profile Visibility
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <ToggleSwitch
            checked={privacyData.profileVisibility.public}
            onChange={(value) => handleInputChange('profileVisibility.public', value)}
            label="Public Profile"
            description="Allow others to view your profile information"
          />
          <ToggleSwitch
            checked={privacyData.profileVisibility.searchable}
            onChange={(value) => handleInputChange('profileVisibility.searchable', value)}
            label="Searchable Profile"
            description="Allow your profile to appear in search results"
          />
          <ToggleSwitch
            checked={privacyData.profileVisibility.showInDirectory}
            onChange={(value) => handleInputChange('profileVisibility.showInDirectory', value)}
            label="Show in Directory"
            description="Include your profile in the public member directory"
          />
          <ToggleSwitch
            checked={privacyData.profileVisibility.allowMessaging}
            onChange={(value) => handleInputChange('profileVisibility.allowMessaging', value)}
            label="Allow Direct Messages"
            description="Let other users send you direct messages"
          />
          <ToggleSwitch
            checked={privacyData.profileVisibility.showOnlineStatus}
            onChange={(value) => handleInputChange('profileVisibility.showOnlineStatus', value)}
            label="Show Online Status"
            description="Display when you're online to other users"
          />
        </div>
      </div>

      {/* Data Sharing */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Share2" size={20} className="mr-2 text-secondary" />
          Data Sharing
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <ToggleSwitch
            checked={privacyData.dataSharing.shareWithRecruiters}
            onChange={(value) => handleInputChange('dataSharing.shareWithRecruiters', value)}
            label="Share with Recruiters"
            description="Allow verified recruiters to view your profile and contact you"
          />
          <ToggleSwitch
            checked={privacyData.dataSharing.shareWithEducationalInstitutions}
            onChange={(value) => handleInputChange('dataSharing.shareWithEducationalInstitutions', value)}
            label="Share with Educational Institutions"
            description="Allow your alma mater and other institutions to access your progress"
          />
          <ToggleSwitch
            checked={privacyData.dataSharing.shareForResearch}
            onChange={(value) => handleInputChange('dataSharing.shareForResearch', value)}
            label="Share for Research"
            description="Allow anonymized data to be used for educational research"
          />
          <ToggleSwitch
            checked={privacyData.dataSharing.shareAnalytics}
            onChange={(value) => handleInputChange('dataSharing.shareAnalytics', value)}
            label="Share Analytics Data"
            description="Help improve the platform by sharing usage analytics"
          />
          <ToggleSwitch
            checked={privacyData.dataSharing.allowThirdPartyIntegrations}
            onChange={(value) => handleInputChange('dataSharing.allowThirdPartyIntegrations', value)}
            label="Third-party Integrations"
            description="Allow integration with external services like LinkedIn, GitHub"
          />
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-warning" />
          Communication Preferences
        </h3>
        
        {/* Email Notifications */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-text-primary mb-3">Email Notifications</h4>
          <div className="bg-gray-50 rounded-lg p-6">
            <ToggleSwitch
              checked={privacyData.communication.emailNotifications.jobAlerts}
              onChange={(value) => handleInputChange('communication.emailNotifications.jobAlerts', value)}
              label="Job Alerts"
              description="Receive emails about new job opportunities matching your preferences"
            />
            <ToggleSwitch
              checked={privacyData.communication.emailNotifications.courseUpdates}
              onChange={(value) => handleInputChange('communication.emailNotifications.courseUpdates', value)}
              label="Course Updates"
              description="Get notified about new courses and content updates"
            />
            <ToggleSwitch
              checked={privacyData.communication.emailNotifications.systemUpdates}
              onChange={(value) => handleInputChange('communication.emailNotifications.systemUpdates', value)}
              label="System Updates"
              description="Important platform updates and maintenance notifications"
            />
            <ToggleSwitch
              checked={privacyData.communication.emailNotifications.marketingEmails}
              onChange={(value) => handleInputChange('communication.emailNotifications.marketingEmails', value)}
              label="Marketing Emails"
              description="Promotional content and special offers"
            />
            <ToggleSwitch
              checked={privacyData.communication.emailNotifications.weeklyDigest}
              onChange={(value) => handleInputChange('communication.emailNotifications.weeklyDigest', value)}
              label="Weekly Digest"
              description="Summary of your weekly activity and progress"
            />
            <ToggleSwitch
              checked={privacyData.communication.emailNotifications.achievementNotifications}
              onChange={(value) => handleInputChange('communication.emailNotifications.achievementNotifications', value)}
              label="Achievement Notifications"
              description="Celebrate your milestones and achievements"
            />
          </div>
        </div>

        {/* Push Notifications */}
        <div className="mb-6">
          <h4 className="text-md font-medium text-text-primary mb-3">Push Notifications</h4>
          <div className="bg-gray-50 rounded-lg p-6">
            <ToggleSwitch
              checked={privacyData.communication.pushNotifications.interviewReminders}
              onChange={(value) => handleInputChange('communication.pushNotifications.interviewReminders', value)}
              label="Interview Reminders"
              description="Get reminded about upcoming mock interviews"
            />
            <ToggleSwitch
              checked={privacyData.communication.pushNotifications.messageNotifications}
              onChange={(value) => handleInputChange('communication.pushNotifications.messageNotifications', value)}
              label="Message Notifications"
              description="New direct messages and forum replies"
            />
            <ToggleSwitch
              checked={privacyData.communication.pushNotifications.courseDeadlines}
              onChange={(value) => handleInputChange('communication.pushNotifications.courseDeadlines', value)}
              label="Course Deadlines"
              description="Reminders about assignment and course deadlines"
            />
            <ToggleSwitch
              checked={privacyData.communication.pushNotifications.systemAlerts}
              onChange={(value) => handleInputChange('communication.pushNotifications.systemAlerts', value)}
              label="System Alerts"
              description="Critical system notifications and security alerts"
            />
            <ToggleSwitch
              checked={privacyData.communication.pushNotifications.socialUpdates}
              onChange={(value) => handleInputChange('communication.pushNotifications.socialUpdates', value)}
              label="Social Updates"
              description="Activity from people you follow and community updates"
            />
          </div>
        </div>

        {/* SMS Notifications */}
        <div>
          <h4 className="text-md font-medium text-text-primary mb-3">SMS Notifications</h4>
          <div className="bg-gray-50 rounded-lg p-6">
            <ToggleSwitch
              checked={privacyData.communication.smsNotifications.enabled}
              onChange={(value) => handleInputChange('communication.smsNotifications.enabled', value)}
              label="Enable SMS Notifications"
              description="Allow SMS notifications to your registered phone number"
            />
            {privacyData.communication.smsNotifications.enabled && (
              <>
                <ToggleSwitch
                  checked={privacyData.communication.smsNotifications.interviewReminders}
                  onChange={(value) => handleInputChange('communication.smsNotifications.interviewReminders', value)}
                  label="Interview Reminders"
                  description="SMS reminders for upcoming interviews"
                />
                <ToggleSwitch
                  checked={privacyData.communication.smsNotifications.urgentAlerts}
                  onChange={(value) => handleInputChange('communication.smsNotifications.urgentAlerts', value)}
                  label="Urgent Alerts"
                  description="Critical security and account alerts via SMS"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-accent" />
          Privacy Controls
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <ToggleSwitch
            checked={privacyData.privacy.hideFromSearchEngines}
            onChange={(value) => handleInputChange('privacy.hideFromSearchEngines', value)}
            label="Hide from Search Engines"
            description="Prevent your profile from appearing in Google and other search engines"
          />
          <ToggleSwitch
            checked={privacyData.privacy.anonymizeInReports}
            onChange={(value) => handleInputChange('privacy.anonymizeInReports', value)}
            label="Anonymize in Reports"
            description="Remove personal identifiers from analytics and reports"
          />
          <ToggleSwitch
            checked={privacyData.privacy.limitDataCollection}
            onChange={(value) => handleInputChange('privacy.limitDataCollection', value)}
            label="Limit Data Collection"
            description="Minimize the amount of data collected about your activity"
          />
          <ToggleSwitch
            checked={privacyData.privacy.optOutOfAnalytics}
            onChange={(value) => handleInputChange('privacy.optOutOfAnalytics', value)}
            label="Opt Out of Analytics"
            description="Exclude your data from platform analytics and insights"
          />
          <ToggleSwitch
            checked={privacyData.privacy.requireExplicitConsent}
            onChange={(value) => handleInputChange('privacy.requireExplicitConsent', value)}
            label="Require Explicit Consent"
            description="Ask for permission before any new data collection or sharing"
          />
        </div>
      </div>

      {/* Data Management */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Database" size={20} className="mr-2 text-success" />
          Data Management
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="mb-6">
            <h4 className="text-md font-medium text-text-primary mb-3">Data Retention</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Data Retention Period
                </label>
                <select
                  value={privacyData.dataRetention.dataRetentionPeriod}
                  onChange={(e) => handleInputChange('dataRetention.dataRetentionPeriod', e.target.value)}
                  disabled={!isEditing}
                  className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                  <option value="5years">5 Years</option>
                  <option value="indefinite">Indefinite</option>
                </select>
                <p className="text-xs text-text-secondary mt-1">
                  How long to keep your data after account inactivity
                </p>
              </div>

              <ToggleSwitch
                checked={privacyData.dataRetention.autoDeleteInactiveData}
                onChange={(value) => handleInputChange('dataRetention.autoDeleteInactiveData', value)}
                label="Auto-delete Inactive Data"
                description="Automatically remove old data based on retention period"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-md font-medium text-text-primary mb-4">Data Actions</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h5 className="text-sm font-medium text-text-primary">Download Your Data</h5>
                  <p className="text-xs text-text-secondary mt-1">
                    Get a copy of all your personal data in a portable format
                  </p>
                </div>
                <button
                  onClick={handleDataDownload}
                  disabled={privacyData.dataRetention.downloadDataRequested}
                  className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  {privacyData.dataRetention.downloadDataRequested ? 'Requested' : 'Download'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-accent-200 bg-accent-50 rounded-lg">
                <div>
                  <h5 className="text-sm font-medium text-accent-700">Delete Your Account</h5>
                  <p className="text-xs text-accent-600 mt-1">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button
                  onClick={handleAccountDeletion}
                  disabled={privacyData.dataRetention.deleteAccountRequested}
                  className="px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  {privacyData.dataRetention.deleteAccountRequested ? 'Requested' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <Icon name="Info" size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-2">Privacy Notice</h4>
            <p className="text-sm text-blue-700 mb-3">
              We are committed to protecting your privacy and giving you control over your personal data. 
              These settings help you customize how your information is used and shared.
            </p>
            <div className="flex space-x-4 text-sm">
              <button className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </button>
              <button className="text-blue-600 hover:text-blue-800 underline">
                Terms of Service
              </button>
              <button className="text-blue-600 hover:text-blue-800 underline">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsSection;
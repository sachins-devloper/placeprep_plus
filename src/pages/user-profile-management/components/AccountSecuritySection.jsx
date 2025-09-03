import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AccountSecuritySection = ({ onDataChange, onAutoSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: {
      enabled: false,
      method: "app", // app, sms, email
      backupCodes: [],
      lastUsed: null
    },
    loginSecurity: {
      requireStrongPassword: true,
      sessionTimeout: 30, // minutes
      allowMultipleSessions: true,
      logoutAllDevices: false
    },
    activeSessions: [
      {
        id: 1,
        device: "MacBook Pro",
        browser: "Chrome 120.0",
        location: "San Francisco, CA",
        ipAddress: "192.168.1.100",
        lastActive: "2024-01-15T10:30:00Z",
        current: true
      },
      {
        id: 2,
        device: "iPhone 15",
        browser: "Safari Mobile",
        location: "San Francisco, CA",
        ipAddress: "192.168.1.101",
        lastActive: "2024-01-15T09:15:00Z",
        current: false
      },
      {
        id: 3,
        device: "Windows PC",
        browser: "Edge 120.0",
        location: "New York, NY",
        ipAddress: "203.0.113.45",
        lastActive: "2024-01-14T16:45:00Z",
        current: false
      }
    ],
    securityLog: [
      {
        id: 1,
        action: "Password Changed",
        timestamp: "2024-01-10T14:30:00Z",
        ipAddress: "192.168.1.100",
        location: "San Francisco, CA",
        status: "success"
      },
      {
        id: 2,
        action: "Login Attempt",
        timestamp: "2024-01-09T09:15:00Z",
        ipAddress: "203.0.113.45",
        location: "New York, NY",
        status: "success"
      },
      {
        id: 3,
        action: "Failed Login",
        timestamp: "2024-01-08T22:30:00Z",
        ipAddress: "198.51.100.10",
        location: "Unknown",
        status: "failed"
      },
      {
        id: 4,
        action: "2FA Enabled",
        timestamp: "2024-01-05T11:20:00Z",
        ipAddress: "192.168.1.100",
        location: "San Francisco, CA",
        status: "success"
      }
    ],
    accountRecovery: {
      recoveryEmail: "john.doe.recovery@example.com",
      recoveryPhone: "+1 (555) 987-6543",
      securityQuestions: [
        {
          question: "What was the name of your first pet?",
          answer: "encrypted_answer_1"
        },
        {
          question: "In what city were you born?",
          answer: "encrypted_answer_2"
        }
      ]
    }
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const keys = field.split('.');
      setSecurityData(prev => {
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
      setSecurityData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    onDataChange();
  };

  const handlePasswordChange = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (securityData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    // Mock password change
    alert('Password changed successfully!');
    setSecurityData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
    setShowPasswordForm(false);
    onAutoSave();
  };

  const handleEnable2FA = () => {
    setSecurityData(prev => ({
      ...prev,
      twoFactorAuth: {
        ...prev.twoFactorAuth,
        enabled: true,
        backupCodes: [
          "ABC123DEF", "GHI456JKL", "MNO789PQR", "STU012VWX", "YZA345BCD",
          "EFG678HIJ", "KLM901NOP", "QRS234TUV", "WXY567ZAB", "CDE890FGH"
        ]
      }
    }));
    setShow2FASetup(false);
    onDataChange();
    alert('Two-factor authentication has been enabled successfully!');
  };

  const handleDisable2FA = () => {
    const confirm = window.confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.');
    if (confirm) {
      setSecurityData(prev => ({
        ...prev,
        twoFactorAuth: {
          ...prev.twoFactorAuth,
          enabled: false,
          backupCodes: []
        }
      }));
      onDataChange();
    }
  };

  const handleLogoutSession = (sessionId) => {
    setSecurityData(prev => ({
      ...prev,
      activeSessions: prev.activeSessions.filter(session => session.id !== sessionId)
    }));
    onDataChange();
    alert('Session logged out successfully!');
  };

  const handleLogoutAllSessions = () => {
    const confirm = window.confirm('This will log you out of all devices except the current one. Continue?');
    if (confirm) {
      setSecurityData(prev => ({
        ...prev,
        activeSessions: prev.activeSessions.filter(session => session.current)
      }));
      onDataChange();
      alert('All other sessions have been logged out!');
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[strength] || 'Very Weak';
  };

  const getPasswordStrengthColor = (strength) => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[strength] || 'bg-red-500';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Account Security</h2>
          <p className="text-text-secondary mt-1">
            Manage your account security settings and monitor activity
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
          {isEditing ? 'Save Changes' : 'Edit Security'}
        </button>
      </div>

      {/* Password Management */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Lock" size={20} className="mr-2 text-primary" />
          Password Management
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Password</h4>
              <p className="text-xs text-text-secondary">Last changed 5 days ago</p>
            </div>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-150"
            >
              Change Password
            </button>
          </div>

          {showPasswordForm && (
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Current Password *
                </label>
                <input
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className="form-input"
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="form-input"
                  placeholder="Enter your new password"
                />
                {securityData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(getPasswordStrength(securityData.newPassword))}`}
                          style={{ width: `${(getPasswordStrength(securityData.newPassword) / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary">
                        {getPasswordStrengthLabel(getPasswordStrength(securityData.newPassword))}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="form-input"
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-150"
                >
                  Update Password
                </button>
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 border border-border text-text-primary rounded-md hover:bg-gray-50 transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-secondary" />
          Two-Factor Authentication
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary">2FA Status</h4>
              <p className="text-xs text-text-secondary">
                {securityData.twoFactorAuth.enabled 
                  ? 'Two-factor authentication is enabled' :'Two-factor authentication is disabled'
                }
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                securityData.twoFactorAuth.enabled 
                  ? 'bg-success-100 text-success-700' :'bg-warning-100 text-warning-700'
              }`}>
                <Icon 
                  name={securityData.twoFactorAuth.enabled ? "CheckCircle" : "AlertCircle"} 
                  size={12} 
                  className="mr-1" 
                />
                {securityData.twoFactorAuth.enabled ? 'Enabled' : 'Disabled'}
              </span>
              {securityData.twoFactorAuth.enabled ? (
                <button
                  onClick={handleDisable2FA}
                  className="px-3 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent-700 transition-colors duration-150"
                >
                  Disable
                </button>
              ) : (
                <button
                  onClick={() => setShow2FASetup(true)}
                  className="px-3 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary-700 transition-colors duration-150"
                >
                  Enable 2FA
                </button>
              )}
            </div>
          </div>

          {securityData.twoFactorAuth.enabled && (
            <div className="border-t border-gray-200 pt-4">
              <h5 className="text-sm font-medium text-text-primary mb-3">Backup Codes</h5>
              <p className="text-xs text-text-secondary mb-3">
                Save these backup codes in a secure location. You can use them to access your account if you lose your 2FA device.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {securityData.twoFactorAuth.backupCodes.map((code, index) => (
                  <div key={index} className="bg-white p-2 rounded border text-center font-mono text-sm">
                    {code}
                  </div>
                ))}
              </div>
              <button className="text-sm text-primary hover:text-primary-700 underline">
                Generate New Backup Codes
              </button>
            </div>
          )}
        </div>

        {/* 2FA Setup Modal */}
        {show2FASetup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Enable Two-Factor Authentication</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Choose 2FA Method
                  </label>
                  <select
                    value={securityData.twoFactorAuth.method}
                    onChange={(e) => handleInputChange('twoFactorAuth.method', e.target.value)}
                    className="form-input"
                  >
                    <option value="app">Authenticator App (Recommended)</option>
                    <option value="sms">SMS Text Message</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Icon name="Info" size={16} className="text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        {securityData.twoFactorAuth.method === 'app' && 'Download an authenticator app like Google Authenticator or Authy, then scan the QR code that will be displayed.'
                        }
                        {securityData.twoFactorAuth.method === 'sms' && 'You will receive a verification code via SMS to your registered phone number.'
                        }
                        {securityData.twoFactorAuth.method === 'email' && 'You will receive a verification code via email to your registered email address.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleEnable2FA}
                    className="flex-1 bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-700 transition-colors duration-150"
                  >
                    Enable 2FA
                  </button>
                  <button
                    onClick={() => setShow2FASetup(false)}
                    className="flex-1 border border-border text-text-primary px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-150"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Security */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-warning" />
          Login Security
        </h3>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Require Strong Password</h4>
              <p className="text-xs text-text-secondary">Enforce strong password requirements</p>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('loginSecurity.requireStrongPassword', !securityData.loginSecurity.requireStrongPassword)}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 ${
                securityData.loginSecurity.requireStrongPassword ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  securityData.loginSecurity.requireStrongPassword ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Session Timeout (minutes)
            </label>
            <select
              value={securityData.loginSecurity.sessionTimeout}
              onChange={(e) => handleInputChange('loginSecurity.sessionTimeout', parseInt(e.target.value))}
              disabled={!isEditing}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={480}>8 hours</option>
              <option value={0}>Never</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Allow Multiple Sessions</h4>
              <p className="text-xs text-text-secondary">Allow login from multiple devices simultaneously</p>
            </div>
            <button
              type="button"
              onClick={() => handleInputChange('loginSecurity.allowMultipleSessions', !securityData.loginSecurity.allowMultipleSessions)}
              disabled={!isEditing}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 ${
                securityData.loginSecurity.allowMultipleSessions ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  securityData.loginSecurity.allowMultipleSessions ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center">
            <Icon name="Monitor" size={20} className="mr-2 text-accent" />
            Active Sessions
          </h3>
          <button
            onClick={handleLogoutAllSessions}
            className="px-3 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent-700 transition-colors duration-150"
          >
            Logout All Other Sessions
          </button>
        </div>
        <div className="space-y-4">
          {securityData.activeSessions.map((session) => (
            <div key={session.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon 
                      name={session.device.includes('iPhone') ? "Smartphone" : session.device.includes('Mac') ? "Monitor" : "Laptop"} 
                      size={20} 
                      color="#2563EB" 
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary flex items-center">
                      {session.device} - {session.browser}
                      {session.current && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                          Current
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {session.location} • {session.ipAddress} • Last active: {formatDate(session.lastActive)}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button
                    onClick={() => handleLogoutSession(session.id)}
                    className="px-3 py-1 text-xs text-accent hover:text-accent-700 border border-accent rounded-md hover:bg-accent-50 transition-colors duration-150"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Log */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2 text-success" />
          Security Activity Log
        </h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-4">
            {securityData.securityLog.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    log.status === 'success' ? 'bg-success-100' : 'bg-accent-100'
                  }`}>
                    <Icon 
                      name={log.status === 'success' ? "CheckCircle" : "AlertCircle"} 
                      size={16} 
                      color={log.status === 'success' ? '#10B981' : '#DC2626'}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{log.action}</h4>
                    <p className="text-xs text-text-secondary">
                      {formatDate(log.timestamp)} • {log.location} • {log.ipAddress}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  log.status === 'success' ?'bg-success-100 text-success-700' :'bg-accent-100 text-accent-700'
                }`}>
                  {log.status === 'success' ? 'Success' : 'Failed'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-primary hover:text-primary-700 underline">
              View Full Security Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecuritySection;
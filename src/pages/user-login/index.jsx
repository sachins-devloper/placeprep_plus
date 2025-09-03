import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'PlacePrep123!'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        navigate('/dashboard-home');
      } else {
        setErrors({
          general: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      navigate('/dashboard-home');
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border px-4 py-4 safe-top">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/user-registration" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">PlacePrep Plus</h1>
              <p className="text-xs text-text-secondary hidden sm:block">Career Success Platform</p>
            </div>
          </Link>

          {/* New User Link */}
          <Link
            to="/user-registration"
            className="flex items-center space-x-2 text-primary hover:text-primary-700 font-medium transition-colors duration-150"
          >
            <Icon name="UserPlus" size={18} />
            <span className="hidden sm:inline">New user?</span>
            <span className="sm:hidden">Sign Up</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 lg:py-12">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Welcome Back
            </h2>
            <p className="text-text-secondary">
              Sign in to continue your placement preparation journey
            </p>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-surface hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-5 h-5 mr-3">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span className="font-medium text-text-primary">Continue with Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('linkedin')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-surface hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-5 h-5 mr-3 bg-blue-600 rounded flex items-center justify-center">
                <Icon name="Linkedin" size={14} color="white" />
              </div>
              <span className="font-medium text-text-primary">Continue with LinkedIn</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-secondary">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="p-4 bg-error-50 border border-error-100 rounded-lg">
                  <div className="flex items-start">
                    <Icon name="AlertCircle" size={20} className="text-error mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-error font-medium">{errors.general}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input pl-10 ${errors.email ? 'border-error focus:ring-error' : ''}`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Mail" size={18} className="text-text-secondary" />
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input pl-10 pr-10 ${errors.password ? 'border-error focus:ring-error' : ''}`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Lock" size={18} className="text-text-secondary" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    <Icon 
                      name={showPassword ? 'EyeOff' : 'Eye'} 
                      size={18} 
                      className="text-text-secondary hover:text-text-primary transition-colors duration-150" 
                    />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-text-secondary">Remember me</span>
                </label>
                
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150"
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={18} className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/user-registration"
                className="text-primary hover:text-primary-700 font-medium transition-colors duration-150"
              >
                Create one now
              </Link>
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
            <div className="flex items-start">
              <Icon name="Info" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-primary mb-1">Demo Credentials</h4>
                <p className="text-xs text-primary-700">
                  Email: {mockCredentials.email}<br />
                  Password: {mockCredentials.password}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-text-primary font-medium">Authenticating...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
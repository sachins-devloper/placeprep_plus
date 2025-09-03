import React from 'react';
import Icon from 'components/AppIcon';

const PersonalDetailsStep = ({ 
  formData, 
  errors, 
  updateFormData, 
  showPassword, 
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword 
}) => {
  return (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className={`form-input ${errors.firstName ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your first name"
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className={`form-input ${errors.lastName ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your last name"
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`form-input pl-10 ${errors.email ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your email address"
            autoComplete="email"
          />
          <Icon name="Mail" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className={`form-input pl-10 ${errors.phone ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your phone number"
            autoComplete="tel"
          />
          <Icon name="Phone" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className={`form-input pr-10 ${errors.password ? 'border-error focus:ring-error' : ''}`}
              placeholder="Create a password"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.password}
            </p>
          )}
          <p className="mt-1 text-xs text-text-secondary">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              className={`form-input pr-10 ${errors.confirmPassword ? 'border-error focus:ring-error' : ''}`}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
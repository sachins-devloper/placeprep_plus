import React from 'react';
import Icon from 'components/AppIcon';

const CareerPreferencesStep = ({ formData, errors, updateFormData }) => {
  const targetRoles = [
    { id: 'software-engineer', label: 'Software Engineer', icon: 'Code' },
    { id: 'data-scientist', label: 'Data Scientist', icon: 'BarChart3' },
    { id: 'product-manager', label: 'Product Manager', icon: 'Users' },
    { id: 'business-analyst', label: 'Business Analyst', icon: 'TrendingUp' },
    { id: 'ui-ux-designer', label: 'UI/UX Designer', icon: 'Palette' },
    { id: 'marketing-specialist', label: 'Marketing Specialist', icon: 'Megaphone' },
    { id: 'financial-analyst', label: 'Financial Analyst', icon: 'DollarSign' },
    { id: 'hr-specialist', label: 'HR Specialist', icon: 'UserCheck' },
    { id: 'consultant', label: 'Consultant', icon: 'Briefcase' },
    { id: 'other', label: 'Other', icon: 'MoreHorizontal' }
  ];

  const industries = [
    { id: 'technology', label: 'Technology', icon: 'Laptop' },
    { id: 'finance', label: 'Finance & Banking', icon: 'Building' },
    { id: 'healthcare', label: 'Healthcare', icon: 'Heart' },
    { id: 'consulting', label: 'Consulting', icon: 'Users' },
    { id: 'ecommerce', label: 'E-commerce', icon: 'ShoppingCart' },
    { id: 'manufacturing', label: 'Manufacturing', icon: 'Factory' },
    { id: 'education', label: 'Education', icon: 'BookOpen' },
    { id: 'media', label: 'Media & Entertainment', icon: 'Film' },
    { id: 'automotive', label: 'Automotive', icon: 'Car' },
    { id: 'other', label: 'Other', icon: 'MoreHorizontal' }
  ];

  const locations = [
    { id: 'bangalore', label: 'Bangalore' },
    { id: 'mumbai', label: 'Mumbai' },
    { id: 'delhi', label: 'Delhi NCR' },
    { id: 'hyderabad', label: 'Hyderabad' },
    { id: 'pune', label: 'Pune' },
    { id: 'chennai', label: 'Chennai' },
    { id: 'kolkata', label: 'Kolkata' },
    { id: 'ahmedabad', label: 'Ahmedabad' },
    { id: 'remote', label: 'Remote Work' },
    { id: 'flexible', label: 'Flexible/Any Location' }
  ];

  const experienceLevels = [
    { value: 'fresher', label: 'Fresher (0 years)', description: 'Just starting my career' },
    { value: 'entry', label: 'Entry Level (0-2 years)', description: 'Some internship or project experience' },
    { value: 'mid', label: 'Mid Level (2-5 years)', description: 'Professional work experience' },
    { value: 'senior', label: 'Senior Level (5+ years)', description: 'Extensive professional experience' }
  ];

  const handleMultiSelect = (field, value) => {
    const currentValues = formData[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    updateFormData(field, updatedValues);
  };

  return (
    <div className="space-y-8">
      {/* Target Roles */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Target Roles * <span className="text-text-secondary font-normal">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {targetRoles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => handleMultiSelect('targetRoles', role.id)}
              className={`flex items-center p-3 border rounded-lg text-left transition-all duration-150 ${
                formData.targetRoles?.includes(role.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <Icon name={role.icon} size={18} className="mr-3 flex-shrink-0" />
              <span className="text-sm font-medium">{role.label}</span>
              {formData.targetRoles?.includes(role.id) && (
                <Icon name="Check" size={16} className="ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
        {errors.targetRoles && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.targetRoles}
          </p>
        )}
      </div>

      {/* Industries */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Preferred Industries * <span className="text-text-secondary font-normal">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {industries.map((industry) => (
            <button
              key={industry.id}
              type="button"
              onClick={() => handleMultiSelect('industries', industry.id)}
              className={`flex items-center p-3 border rounded-lg text-left transition-all duration-150 ${
                formData.industries?.includes(industry.id)
                  ? 'border-secondary bg-secondary-50 text-secondary-700' :'border-border hover:border-secondary-300 hover:bg-gray-50'
              }`}
            >
              <Icon name={industry.icon} size={18} className="mr-3 flex-shrink-0" />
              <span className="text-sm font-medium">{industry.label}</span>
              {formData.industries?.includes(industry.id) && (
                <Icon name="Check" size={16} className="ml-auto text-secondary-700" />
              )}
            </button>
          ))}
        </div>
        {errors.industries && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.industries}
          </p>
        )}
      </div>

      {/* Preferred Locations */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Preferred Locations * <span className="text-text-secondary font-normal">(Select all that apply)</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {locations.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => handleMultiSelect('preferredLocations', location.id)}
              className={`flex items-center justify-center p-3 border rounded-lg text-center transition-all duration-150 ${
                formData.preferredLocations?.includes(location.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium">{location.label}</span>
              {formData.preferredLocations?.includes(location.id) && (
                <Icon name="Check" size={14} className="ml-2" />
              )}
            </button>
          ))}
        </div>
        {errors.preferredLocations && (
          <p className="mt-2 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.preferredLocations}
          </p>
        )}
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Experience Level *
        </label>
        <div className="space-y-3">
          {experienceLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => updateFormData('experienceLevel', level.value)}
              className={`w-full flex items-start p-4 border rounded-lg text-left transition-all duration-150 ${
                formData.experienceLevel === level.value
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center ${
                formData.experienceLevel === level.value
                  ? 'border-primary bg-primary' :'border-gray-300'
              }`}>
                {formData.experienceLevel === level.value && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{level.label}</p>
                <p className="text-xs text-text-secondary mt-1">{level.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Career Goals */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Target" size={24} className="text-primary mt-1 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Your Career Journey Starts Here!</h4>
            <p className="text-text-secondary mb-4">
              Based on your preferences, we'll create a personalized learning path with relevant courses, practice tests, and mock interviews to help you achieve your career goals.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                <Icon name="BookOpen" size={12} className="mr-1" />
                Personalized Courses
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-white">
                <Icon name="Users" size={12} className="mr-1" />
                Mock Interviews
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success text-white">
                <Icon name="TrendingUp" size={12} className="mr-1" />
                Progress Tracking
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPreferencesStep;
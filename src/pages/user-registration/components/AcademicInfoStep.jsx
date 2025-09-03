import React from 'react';
import Icon from 'components/AppIcon';

const AcademicInfoStep = ({ formData, errors, updateFormData }) => {
  const degreeOptions = [
    { value: '', label: 'Select your degree' },
    { value: 'btech', label: 'B.Tech / B.E.' },
    { value: 'bca', label: 'BCA' },
    { value: 'bsc', label: 'B.Sc' },
    { value: 'bcom', label: 'B.Com' },
    { value: 'ba', label: 'B.A.' },
    { value: 'mtech', label: 'M.Tech / M.E.' },
    { value: 'mca', label: 'MCA' },
    { value: 'msc', label: 'M.Sc' },
    { value: 'mba', label: 'MBA' },
    { value: 'other', label: 'Other' }
  ];

  const branchOptions = [
    { value: '', label: 'Select your branch/specialization' },
    { value: 'cse', label: 'Computer Science Engineering' },
    { value: 'it', label: 'Information Technology' },
    { value: 'ece', label: 'Electronics & Communication' },
    { value: 'eee', label: 'Electrical & Electronics' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'chemical', label: 'Chemical Engineering' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'other', label: 'Other' }
  ];

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + i - 5);

  return (
    <div className="space-y-6">
      {/* College Name */}
      <div>
        <label htmlFor="college" className="block text-sm font-medium text-text-primary mb-2">
          College/University Name *
        </label>
        <div className="relative">
          <input
            type="text"
            id="college"
            value={formData.college}
            onChange={(e) => updateFormData('college', e.target.value)}
            className={`form-input pl-10 ${errors.college ? 'border-error focus:ring-error' : ''}`}
            placeholder="Enter your college or university name"
          />
          <Icon name="School" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
        </div>
        {errors.college && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.college}
          </p>
        )}
      </div>

      {/* Degree and Branch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="degree" className="block text-sm font-medium text-text-primary mb-2">
            Degree *
          </label>
          <select
            id="degree"
            value={formData.degree}
            onChange={(e) => updateFormData('degree', e.target.value)}
            className={`form-input ${errors.degree ? 'border-error focus:ring-error' : ''}`}
          >
            {degreeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.degree && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.degree}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-text-primary mb-2">
            Branch/Specialization *
          </label>
          <select
            id="branch"
            value={formData.branch}
            onChange={(e) => updateFormData('branch', e.target.value)}
            className={`form-input ${errors.branch ? 'border-error focus:ring-error' : ''}`}
          >
            {branchOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.branch}
            </p>
          )}
        </div>
      </div>

      {/* Graduation Year and CGPA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-text-primary mb-2">
            Graduation Year *
          </label>
          <select
            id="graduationYear"
            value={formData.graduationYear}
            onChange={(e) => updateFormData('graduationYear', e.target.value)}
            className={`form-input ${errors.graduationYear ? 'border-error focus:ring-error' : ''}`}
          >
            <option value="">Select graduation year</option>
            {graduationYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.graduationYear && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.graduationYear}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cgpa" className="block text-sm font-medium text-text-primary mb-2">
            CGPA/Percentage *
          </label>
          <div className="relative">
            <input
              type="number"
              id="cgpa"
              value={formData.cgpa}
              onChange={(e) => updateFormData('cgpa', e.target.value)}
              className={`form-input pl-10 ${errors.cgpa ? 'border-error focus:ring-error' : ''}`}
              placeholder="Enter CGPA (0-10)"
              min="0"
              max="10"
              step="0.01"
            />
            <Icon name="Award" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          </div>
          {errors.cgpa && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.cgpa}
            </p>
          )}
          <p className="mt-1 text-xs text-text-secondary">
            Enter CGPA on a scale of 10 or percentage
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-primary-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Why do we need this information?</h4>
            <p className="text-sm text-text-secondary">
              Your academic details help us personalize your learning experience and match you with relevant job opportunities and practice materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicInfoStep;
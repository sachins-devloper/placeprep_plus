import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CareerPreferencesSection = ({ onDataChange, onAutoSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [careerData, setCareerData] = useState({
    targetRoles: [
      "Frontend Developer",
      "Full Stack Developer",
      "Software Engineer",
      "React Developer"
    ],
    preferredIndustries: [
      "Technology",
      "E-commerce",
      "FinTech",
      "Healthcare Technology"
    ],
    preferredLocations: [
      {
        city: "San Francisco",
        state: "CA",
        country: "USA",
        remote: false
      },
      {
        city: "New York",
        state: "NY", 
        country: "USA",
        remote: false
      },
      {
        city: "Remote",
        state: "",
        country: "",
        remote: true
      }
    ],
    salaryExpectations: {
      currency: "USD",
      minSalary: 80000,
      maxSalary: 120000,
      negotiable: true,
      includesBenefits: true
    },
    workPreferences: {
      workType: "hybrid", // remote, onsite, hybrid
      availabilityDate: "2024-03-01",
      noticePeriod: "2 weeks",
      willingToRelocate: true,
      travelWillingness: "occasionally", // never, occasionally, frequently
      workSchedule: "flexible" // standard, flexible, night-shift
    },
    careerGoals: {
      shortTerm: `In the next 1-2 years, I aim to strengthen my expertise in modern web technologies, particularly React and Node.js, while gaining experience in cloud platforms like AWS. I want to contribute to meaningful projects that have real user impact and work with a collaborative team that values innovation and continuous learning.

I'm particularly interested in roles that offer mentorship opportunities and exposure to system design and architecture decisions.`,
      longTerm: `My long-term career vision is to become a technical leader who can bridge the gap between business requirements and technical solutions. I aspire to lead development teams, architect scalable systems, and contribute to product strategy decisions.

Within 5-7 years, I see myself in a senior engineering or technical management role, where I can mentor junior developers, drive technical innovation, and help shape the engineering culture of the organization.`,
      interests: [
        "Machine Learning Integration",
        "Cloud Architecture",
        "Mobile Development",
        "DevOps and CI/CD",
        "Open Source Contribution",
        "Technical Leadership"
      ]
    },
    jobAlerts: {
      enabled: true,
      frequency: "daily", // daily, weekly, monthly
      keywords: ["React", "JavaScript", "Frontend", "Full Stack"],
      excludeKeywords: ["PHP", "WordPress", "Junior"],
      salaryRange: true,
      locationBased: true
    }
  });

  const availableRoles = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "Software Engineer",
    "React Developer", "Node.js Developer", "Python Developer", "Java Developer",
    "DevOps Engineer", "Data Scientist", "Machine Learning Engineer", "Product Manager",
    "UI/UX Designer", "Mobile Developer", "Cloud Architect", "Technical Lead"
  ];

  const availableIndustries = [
    "Technology", "E-commerce", "FinTech", "Healthcare Technology", "Education Technology",
    "Gaming", "Media & Entertainment", "Automotive", "Real Estate", "Travel & Hospitality",
    "Retail", "Banking", "Insurance", "Consulting", "Government", "Non-Profit"
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const keys = field.split('.');
      setCareerData(prev => {
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
      setCareerData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    onDataChange();
    
    setTimeout(() => {
      onAutoSave();
    }, 2000);
  };

  const addItem = (field, item) => {
    setCareerData(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
    onDataChange();
  };

  const removeItem = (field, index) => {
    setCareerData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
    onDataChange();
  };

  const addLocation = () => {
    const newLocation = {
      city: "",
      state: "",
      country: "",
      remote: false
    };
    addItem('preferredLocations', newLocation);
  };

  const updateLocation = (index, field, value) => {
    setCareerData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.map((loc, i) =>
        i === index ? { ...loc, [field]: value } : loc
      )
    }));
    onDataChange();
  };

  const MultiSelectDropdown = ({ options, selected, onSelectionChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleOption = (option) => {
      if (selected.includes(option)) {
        onSelectionChange(selected.filter(item => item !== option));
      } else {
        onSelectionChange([...selected, option]);
      }
    };

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={!isEditing}
          className="form-input flex items-center justify-between disabled:bg-gray-50 disabled:text-gray-500"
        >
          <span className="truncate">
            {selected.length > 0 ? `${selected.length} selected` : placeholder}
          </span>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </button>

        {isOpen && isEditing && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption(option)}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  selected.includes(option) ? 'bg-primary-50 text-primary' : 'text-text-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selected.includes(option) && (
                    <Icon name="Check" size={16} color="#2563EB" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Career Preferences</h2>
          <p className="text-text-secondary mt-1">
            Define your career goals and job preferences
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
          {isEditing ? 'Save Changes' : 'Edit Preferences'}
        </button>
      </div>

      {/* Target Roles */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Target Roles</h3>
        <div className="space-y-4">
          <MultiSelectDropdown
            options={availableRoles}
            selected={careerData.targetRoles}
            onSelectionChange={(roles) => handleInputChange('targetRoles', roles)}
            placeholder="Select target roles"
          />
          
          {careerData.targetRoles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {careerData.targetRoles.map((role, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700"
                >
                  {role}
                  {isEditing && (
                    <button
                      onClick={() => removeItem('targetRoles', index)}
                      className="ml-2 text-primary-500 hover:text-primary-700"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preferred Industries */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Preferred Industries</h3>
        <div className="space-y-4">
          <MultiSelectDropdown
            options={availableIndustries}
            selected={careerData.preferredIndustries}
            onSelectionChange={(industries) => handleInputChange('preferredIndustries', industries)}
            placeholder="Select preferred industries"
          />
          
          {careerData.preferredIndustries.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {careerData.preferredIndustries.map((industry, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-700"
                >
                  {industry}
                  {isEditing && (
                    <button
                      onClick={() => removeItem('preferredIndustries', index)}
                      className="ml-2 text-secondary-500 hover:text-secondary-700"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preferred Locations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Preferred Locations</h3>
          {isEditing && (
            <button
              onClick={addLocation}
              className="flex items-center px-3 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary-700 transition-colors duration-150"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Location
            </button>
          )}
        </div>

        <div className="space-y-4">
          {careerData.preferredLocations.map((location, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
              {isEditing && (
                <button
                  onClick={() => removeItem('preferredLocations', index)}
                  className="absolute top-4 right-4 text-accent hover:text-accent-700 transition-colors duration-150"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) => updateLocation(index, 'city', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., San Francisco"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    State/Province
                  </label>
                  <input
                    type="text"
                    value={location.state}
                    onChange={(e) => updateLocation(index, 'state', e.target.value)}
                    disabled={!isEditing || location.remote}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={location.country}
                    onChange={(e) => updateLocation(index, 'country', e.target.value)}
                    disabled={!isEditing || location.remote}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., USA"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={location.remote}
                    onChange={(e) => updateLocation(index, 'remote', e.target.checked)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                  />
                  <span className="ml-2 text-sm text-text-primary">Remote position</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Expectations */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Salary Expectations</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Currency
              </label>
              <select
                value={careerData.salaryExpectations.currency}
                onChange={(e) => handleInputChange('salaryExpectations.currency', e.target.value)}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Minimum Salary
              </label>
              <input
                type="number"
                value={careerData.salaryExpectations.minSalary}
                onChange={(e) => handleInputChange('salaryExpectations.minSalary', parseInt(e.target.value))}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="80000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Maximum Salary
              </label>
              <input
                type="number"
                value={careerData.salaryExpectations.maxSalary}
                onChange={(e) => handleInputChange('salaryExpectations.maxSalary', parseInt(e.target.value))}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="120000"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={careerData.salaryExpectations.negotiable}
                onChange={(e) => handleInputChange('salaryExpectations.negotiable', e.target.checked)}
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
              <span className="ml-2 text-sm text-text-primary">Salary is negotiable</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={careerData.salaryExpectations.includesBenefits}
                onChange={(e) => handleInputChange('salaryExpectations.includesBenefits', e.target.checked)}
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
              <span className="ml-2 text-sm text-text-primary">Includes benefits and bonuses</span>
            </label>
          </div>
        </div>
      </div>

      {/* Work Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Work Preferences</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Work Type
              </label>
              <select
                value={careerData.workPreferences.workType}
                onChange={(e) => handleInputChange('workPreferences.workType', e.target.value)}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Availability Date
              </label>
              <input
                type="date"
                value={careerData.workPreferences.availabilityDate}
                onChange={(e) => handleInputChange('workPreferences.availabilityDate', e.target.value)}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Notice Period
              </label>
              <select
                value={careerData.workPreferences.noticePeriod}
                onChange={(e) => handleInputChange('workPreferences.noticePeriod', e.target.value)}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="immediate">Immediate</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Travel Willingness
              </label>
              <select
                value={careerData.workPreferences.travelWillingness}
                onChange={(e) => handleInputChange('workPreferences.travelWillingness', e.target.value)}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="never">Never</option>
                <option value="occasionally">Occasionally (1-2 times/year)</option>
                <option value="frequently">Frequently (Monthly)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Work Schedule
              </label>
              <select
                value={careerData.workPreferences.workSchedule}
                onChange={(e) => handleInputChange('workPreferences.workSchedule', e.target.value)}
                disabled={!isEditing}
                className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="standard">Standard (9 AM - 5 PM)</option>
                <option value="flexible">Flexible hours</option>
                <option value="night-shift">Night shift</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={careerData.workPreferences.willingToRelocate}
                onChange={(e) => handleInputChange('workPreferences.willingToRelocate', e.target.checked)}
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
              <span className="ml-2 text-sm text-text-primary">Willing to relocate for the right opportunity</span>
            </label>
          </div>
        </div>
      </div>

      {/* Career Goals */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Career Goals</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Short-term Goals (1-2 years)
            </label>
            <textarea
              value={careerData.careerGoals.shortTerm}
              onChange={(e) => handleInputChange('careerGoals.shortTerm', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500 resize-none"
              placeholder="Describe your short-term career objectives..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Long-term Goals (5-7 years)
            </label>
            <textarea
              value={careerData.careerGoals.longTerm}
              onChange={(e) => handleInputChange('careerGoals.longTerm', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500 resize-none"
              placeholder="Describe your long-term career vision..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Areas of Interest
            </label>
            {careerData.careerGoals.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {careerData.careerGoals.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-700"
                  >
                    {interest}
                    {isEditing && (
                      <button
                        onClick={() => {
                          const updatedInterests = careerData.careerGoals.interests.filter((_, i) => i !== index);
                          handleInputChange('careerGoals.interests', updatedInterests);
                        }}
                        className="ml-2 text-success-500 hover:text-success-700"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Alerts */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Job Alert Preferences</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={careerData.jobAlerts.enabled}
                onChange={(e) => handleInputChange('jobAlerts.enabled', e.target.checked)}
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
              <span className="ml-2 text-sm font-medium text-text-primary">Enable job alerts</span>
            </label>
          </div>

          {careerData.jobAlerts.enabled && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Alert Frequency
                </label>
                <select
                  value={careerData.jobAlerts.frequency}
                  onChange={(e) => handleInputChange('jobAlerts.frequency', e.target.value)}
                  disabled={!isEditing}
                  className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Include Keywords
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {careerData.jobAlerts.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                      >
                        {keyword}
                        {isEditing && (
                          <button
                            onClick={() => {
                              const updatedKeywords = careerData.jobAlerts.keywords.filter((_, i) => i !== index);
                              handleInputChange('jobAlerts.keywords', updatedKeywords);
                            }}
                            className="ml-1 text-primary-500 hover:text-primary-700"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Exclude Keywords
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {careerData.jobAlerts.excludeKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700"
                      >
                        {keyword}
                        {isEditing && (
                          <button
                            onClick={() => {
                              const updatedKeywords = careerData.jobAlerts.excludeKeywords.filter((_, i) => i !== index);
                              handleInputChange('jobAlerts.excludeKeywords', updatedKeywords);
                            }}
                            className="ml-1 text-accent-500 hover:text-accent-700"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={careerData.jobAlerts.salaryRange}
                    onChange={(e) => handleInputChange('jobAlerts.salaryRange', e.target.checked)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                  />
                  <span className="ml-2 text-sm text-text-primary">Filter by salary range</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={careerData.jobAlerts.locationBased}
                    onChange={(e) => handleInputChange('jobAlerts.locationBased', e.target.checked)}
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                  />
                  <span className="ml-2 text-sm text-text-primary">Filter by preferred locations</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPreferencesSection;
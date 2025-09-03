import React from 'react';
import Icon from 'components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Personal', description: 'Basic information' },
    { number: 2, title: 'Academic', description: 'Education details' },
    { number: 3, title: 'Career', description: 'Preferences' }
  ];

  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="sm:hidden mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill transition-all duration-300 ease-smooth"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden sm:flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step.number < currentStep
                    ? 'bg-success text-white'
                    : step.number === currentStep
                    ? 'bg-primary text-white' :'bg-gray-200 text-gray-500'
                }`}
              >
                {step.number < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${
                  step.number <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-text-secondary">{step.description}</p>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                  step.number < currentStep ? 'bg-success' : 'bg-gray-200'
                }`}
                style={{ minWidth: '60px' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
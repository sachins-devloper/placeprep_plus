import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import AcademicInfoStep from './components/AcademicInfoStep';
import CareerPreferencesStep from './components/CareerPreferencesStep';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import ProgressIndicator from './components/ProgressIndicator';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Academic Information
    college: '',
    degree: '',
    branch: '',
    graduationYear: '',
    cgpa: '',
    
    // Career Preferences
    targetRoles: [],
    industries: [],
    preferredLocations: [],
    experienceLevel: 'fresher'
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const totalSteps = 3;

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2) {
      if (!formData.college.trim()) newErrors.college = 'College name is required';
      if (!formData.degree) newErrors.degree = 'Degree is required';
      if (!formData.branch) newErrors.branch = 'Branch/Specialization is required';
      if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
      if (!formData.cgpa) {
        newErrors.cgpa = 'CGPA is required';
      } else if (isNaN(formData.cgpa) || formData.cgpa < 0 || formData.cgpa > 10) {
        newErrors.cgpa = 'Please enter a valid CGPA (0-10)';
      }
    }
    
    if (step === 3) {
      if (formData.targetRoles.length === 0) newErrors.targetRoles = 'Please select at least one target role';
      if (formData.industries.length === 0) newErrors.industries = 'Please select at least one industry';
      if (formData.preferredLocations.length === 0) newErrors.preferredLocations = 'Please select at least one preferred location';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful registration
      navigate('/dashboard-home');
    }, 2000);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSocialRegistration = (provider) => {
    setIsLoading(true);
    // Simulate social registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard-home');
    }, 1500);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      case 2:
        return (
          <AcademicInfoStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <CareerPreferencesStep
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      
      <div className="flex-1 px-4 py-6 lg:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          
          {/* Social Registration - Only show on first step */}
          {currentStep === 1 && (
            <SocialRegistration 
              onSocialRegister={handleSocialRegistration}
              isLoading={isLoading}
            />
          )}
          
          {/* Registration Form */}
          <div className="card mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                {currentStep === 1 && 'Personal Details'}
                {currentStep === 2 && 'Academic Information'}
                {currentStep === 3 && 'Career Preferences'}
              </h2>
              <p className="text-text-secondary text-sm">
                {currentStep === 1 && 'Let\'s start with your basic information'}
                {currentStep === 2 && 'Tell us about your educational background'}
                {currentStep === 3 && 'What are your career goals?'}
              </p>
            </div>
            
            {renderCurrentStep()}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                disabled={isLoading}
                className="flex items-center justify-center px-6 py-3 border border-border rounded-md text-text-primary hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Previous
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="btn-primary flex items-center justify-center px-6 py-3 flex-1 sm:flex-none sm:min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  {currentStep === totalSteps ? 'Creating Account...' : 'Processing...'}
                </>
              ) : (
                <>
                  {currentStep === totalSteps ? 'Create Account' : 'Next'}
                  {currentStep < totalSteps && <Icon name="ArrowRight" size={20} className="ml-2" />}
                </>
              )}
            </button>
          </div>
          
          {/* Terms and Privacy */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-secondary">
              By creating an account, you agree to our{' '}
              <button className="text-primary hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
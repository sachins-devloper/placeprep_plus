import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-surface border-b border-border px-4 py-4 safe-top">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">PlacePrep Plus</h1>
            <p className="text-xs text-text-secondary hidden sm:block">Your Career Success Partner</p>
          </div>
        </div>

        {/* Login Link */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary hidden sm:inline">Already have an account?</span>
          <button
            onClick={() => navigate('/user-login')}
            className="flex items-center px-4 py-2 text-primary hover:bg-primary-50 rounded-md transition-colors duration-150 font-medium"
          >
            <Icon name="LogIn" size={18} className="mr-2" />
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;
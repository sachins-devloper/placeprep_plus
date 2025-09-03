import React from 'react';
import Icon from 'components/AppIcon';

const SocialRegistration = ({ onSocialRegister, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Quick Registration</h3>
        <p className="text-text-secondary text-sm">Sign up with your social account to get started instantly</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => onSocialRegister(provider.name.toLowerCase())}
            disabled={isLoading}
            className={`flex items-center justify-center px-4 py-3 border ${provider.borderColor} rounded-md ${provider.bgColor} transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Icon name={provider.icon} size={20} className={`mr-3 ${provider.color}`} />
            <span className="font-medium text-text-primary">Continue with {provider.name}</span>
          </button>
        ))}
      </div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-secondary">Or register with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;
import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PersonalInformationSection = ({ onDataChange, onAutoSave }) => {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [personalData, setPersonalData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-08-15",
    gender: "male",
    nationality: "American",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev"
    },
    biography: `I'm a passionate software engineer with over 3 years of experience specializing in frontend development. My journey in technology began with a fascination for building things that people interact with daily. This curiosity led me to pursue a degree in Computer Science and eventually specialize in creating intuitive, efficient, and beautiful web applications.

What drives me is the intersection of technology and human experience – finding ways to make complex systems feel simple and intuitive for users while maintaining technical excellence behind the scenes.`,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  });

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPersonalData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPersonalData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    onDataChange();
    
    // Auto-save after 2 seconds of inactivity
    setTimeout(() => {
      onAutoSave();
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageCrop = () => {
    setPersonalData(prev => ({
      ...prev,
      profileImage: selectedImage
    }));
    setShowCropModal(false);
    setSelectedImage(null);
    onDataChange();
  };

  const characterLimit = 500;
  const remainingChars = characterLimit - personalData.biography.length;

  return (
    <div className="p-6 lg:p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Personal Information</h2>
          <p className="text-text-secondary mt-1">
            Manage your personal details and contact information
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
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Photo Section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Profile Photo</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
          <div className="relative mb-4 sm:mb-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={personalData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-150"
              >
                <Icon name="Camera" size={16} />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-text-primary mb-2">
              {personalData.firstName} {personalData.lastName}
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Upload a professional photo to help others recognize you
            </p>
            {isEditing && (
              <div className="flex space-x-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-150"
                >
                  Upload New
                </button>
                <button className="px-3 py-1 text-sm border border-border text-text-secondary rounded-md hover:bg-gray-50 transition-colors duration-150">
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={personalData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            className="form-input disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={personalData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            className="form-input disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={personalData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditing}
            className="form-input disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={personalData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!isEditing}
            className="form-input disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={personalData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            disabled={!isEditing}
            className="form-input disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Gender
          </label>
          <select
            value={personalData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            disabled={!isEditing}
            className="form-input disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      {/* Address Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Address Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={personalData.address.street}
              onChange={(e) => handleInputChange('address.street', e.target.value)}
              disabled={!isEditing}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your street address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              City
            </label>
            <input
              type="text"
              value={personalData.address.city}
              onChange={(e) => handleInputChange('address.city', e.target.value)}
              disabled={!isEditing}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              State/Province
            </label>
            <input
              type="text"
              value={personalData.address.state}
              onChange={(e) => handleInputChange('address.state', e.target.value)}
              disabled={!isEditing}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your state/province"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ZIP/Postal Code
            </label>
            <input
              type="text"
              value={personalData.address.zipCode}
              onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
              disabled={!isEditing}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your ZIP/postal code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Country
            </label>
            <input
              type="text"
              value={personalData.address.country}
              onChange={(e) => handleInputChange('address.country', e.target.value)}
              disabled={!isEditing}
              className="form-input disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your country"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Social Links</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              LinkedIn Profile
            </label>
            <div className="relative">
              <Icon name="Linkedin" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={personalData.socialLinks.linkedin}
                onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                disabled={!isEditing}
                className="form-input pl-10 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              GitHub Profile
            </label>
            <div className="relative">
              <Icon name="Github" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={personalData.socialLinks.github}
                onChange={(e) => handleInputChange('socialLinks.github', e.target.value)}
                disabled={!isEditing}
                className="form-input pl-10 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="https://github.com/yourusername"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Portfolio Website
            </label>
            <div className="relative">
              <Icon name="Globe" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={personalData.socialLinks.portfolio}
                onChange={(e) => handleInputChange('socialLinks.portfolio', e.target.value)}
                disabled={!isEditing}
                className="form-input pl-10 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Biography</h3>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tell us about yourself
          </label>
          <textarea
            value={personalData.biography}
            onChange={(e) => handleInputChange('biography', e.target.value)}
            disabled={!isEditing}
            rows={6}
            maxLength={characterLimit}
            className="form-input disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            placeholder="Write a brief description about yourself, your interests, and your career goals..."
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-text-secondary">
              Share your story, interests, and career aspirations
            </p>
            <span className={`text-sm ${remainingChars < 50 ? 'text-warning' : 'text-text-secondary'}`}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>
      </div>

      {/* Image Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Crop Profile Photo</h3>
            <div className="mb-6">
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleImageCrop}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-150"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setSelectedImage(null);
                }}
                className="flex-1 border border-border text-text-primary px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformationSection;
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AcademicDetailsSection = ({ onDataChange, onAutoSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [academicData, setAcademicData] = useState({
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "Stanford University",
        location: "Stanford, CA",
        startDate: "2018-09",
        endDate: "2022-05",
        gpa: "3.8",
        maxGpa: "4.0",
        achievements: ["Dean's List", "Magna Cum Laude", "Computer Science Honor Society"],
        coursework: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems", "Machine Learning"]
      },
      {
        id: 2,
        degree: "High School Diploma",
        institution: "Lincoln High School",
        location: "San Francisco, CA",
        startDate: "2014-09",
        endDate: "2018-06",
        gpa: "3.9",
        maxGpa: "4.0",
        achievements: ["Valedictorian", "National Honor Society", "Science Fair Winner"],
        coursework: ["AP Computer Science", "AP Calculus", "AP Physics", "AP English Literature"]
      }
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: `Developed a full-stack e-commerce platform using React, Node.js, and MongoDB. The platform features user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Implemented responsive design and optimized for performance with lazy loading and caching strategies.

Key features include real-time inventory management, order tracking, and automated email notifications. The project demonstrates proficiency in modern web development technologies and best practices.`,
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API", "JWT"],
        startDate: "2022-01",
        endDate: "2022-04",
        githubUrl: "https://github.com/johndoe/ecommerce-platform",
        liveUrl: "https://ecommerce-demo.johndoe.dev",
        teamSize: 4,
        role: "Full-Stack Developer"
      },
      {
        id: 2,
        title: "Machine Learning Recommendation System",
        description: `Built a collaborative filtering recommendation system for movie recommendations using Python and scikit-learn. The system analyzes user behavior patterns and provides personalized movie suggestions with 85% accuracy rate.

Implemented both content-based and collaborative filtering approaches, with A/B testing to optimize recommendation quality. The project includes data preprocessing, model training, evaluation metrics, and a REST API for integration.`,
        technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "Flask", "PostgreSQL"],
        startDate: "2021-09",
        endDate: "2021-12",
        githubUrl: "https://github.com/johndoe/ml-recommendation",
        liveUrl: "",
        teamSize: 2,
        role: "ML Engineer"
      }
    ],
    skills: {
      technical: [
        { name: "JavaScript", level: 90, category: "Programming Languages" },
        { name: "Python", level: 85, category: "Programming Languages" },
        { name: "Java", level: 75, category: "Programming Languages" },
        { name: "React", level: 95, category: "Frontend Frameworks" },
        { name: "Node.js", level: 80, category: "Backend Technologies" },
        { name: "MongoDB", level: 70, category: "Databases" },
        { name: "PostgreSQL", level: 75, category: "Databases" },
        { name: "Git", level: 90, category: "Tools & Technologies" },
        { name: "Docker", level: 65, category: "Tools & Technologies" },
        { name: "AWS", level: 60, category: "Cloud Platforms" }
      ],
      soft: [
        { name: "Communication", level: 85 },
        { name: "Leadership", level: 80 },
        { name: "Problem Solving", level: 90 },
        { name: "Team Collaboration", level: 88 },
        { name: "Time Management", level: 82 },
        { name: "Adaptability", level: 87 }
      ]
    },
    certifications: [
      {
        id: 1,
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        issueDate: "2023-03",
        expiryDate: "2026-03",
        credentialId: "AWS-SAA-123456",
        verificationUrl: "https://aws.amazon.com/verification/123456"
      },
      {
        id: 2,
        name: "Google Cloud Professional Developer",
        issuer: "Google Cloud",
        issueDate: "2022-11",
        expiryDate: "2024-11",
        credentialId: "GCP-PD-789012",
        verificationUrl: "https://cloud.google.com/certification/verify/789012"
      }
    ]
  });

  const handleInputChange = (section, id, field, value) => {
    setAcademicData(prev => {
      if (section === 'skills') {
        return {
          ...prev,
          skills: {
            ...prev.skills,
            [id]: prev.skills[id].map(skill =>
              skill.name === field ? { ...skill, level: value } : skill
            )
          }
        };
      } else {
        return {
          ...prev,
          [section]: prev[section].map(item =>
            item.id === id ? { ...item, [field]: value } : item
          )
        };
      }
    });
    onDataChange();
    
    setTimeout(() => {
      onAutoSave();
    }, 2000);
  };

  const addNewItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...(section === 'education' && {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
        maxGpa: "4.0",
        achievements: [],
        coursework: []
      }),
      ...(section === 'projects' && {
        title: "",
        description: "",
        technologies: [],
        startDate: "",
        endDate: "",
        githubUrl: "",
        liveUrl: "",
        teamSize: 1,
        role: ""
      }),
      ...(section === 'certifications' && {
        name: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        verificationUrl: ""
      })
    };

    setAcademicData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
    onDataChange();
  };

  const removeItem = (section, id) => {
    setAcademicData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
    onDataChange();
  };

  const SkillBar = ({ skill, isEditing, onLevelChange }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-primary">{skill.name}</span>
        <span className="text-sm text-text-secondary">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      {isEditing && (
        <input
          type="range"
          min="0"
          max="100"
          value={skill.level}
          onChange={(e) => onLevelChange(parseInt(e.target.value))}
          className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      )}
    </div>
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Academic Details</h2>
          <p className="text-text-secondary mt-1">
            Manage your education, projects, and skills information
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
          {isEditing ? 'Save Changes' : 'Edit Details'}
        </button>
      </div>

      {/* Education Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Education</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('education')}
              className="flex items-center px-3 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary-700 transition-colors duration-150"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Education
            </button>
          )}
        </div>

        <div className="space-y-6">
          {academicData.education.map((edu) => (
            <div key={edu.id} className="bg-gray-50 rounded-lg p-6 relative">
              {isEditing && (
                <button
                  onClick={() => removeItem('education', edu.id)}
                  className="absolute top-4 right-4 text-accent hover:text-accent-700 transition-colors duration-150"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Degree/Program *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleInputChange('education', edu.id, 'degree', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., Bachelor of Science in Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleInputChange('education', edu.id, 'institution', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., Stanford University"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleInputChange('education', edu.id, 'location', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., Stanford, CA"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => handleInputChange('education', edu.id, 'startDate', e.target.value)}
                      disabled={!isEditing}
                      className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleInputChange('education', edu.id, 'endDate', e.target.value)}
                      disabled={!isEditing}
                      className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max={edu.maxGpa}
                      value={edu.gpa}
                      onChange={(e) => handleInputChange('education', edu.id, 'gpa', e.target.value)}
                      disabled={!isEditing}
                      className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="3.8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Max GPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={edu.maxGpa}
                      onChange={(e) => handleInputChange('education', edu.id, 'maxGpa', e.target.value)}
                      disabled={!isEditing}
                      className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="4.0"
                    />
                  </div>
                </div>
              </div>

              {edu.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700"
                      >
                        <Icon name="Award" size={12} className="mr-1" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {edu.coursework.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Relevant Coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Projects</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('projects')}
              className="flex items-center px-3 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary-700 transition-colors duration-150"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Project
            </button>
          )}
        </div>

        <div className="space-y-6">
          {academicData.projects.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg p-6 relative">
              {isEditing && (
                <button
                  onClick={() => removeItem('projects', project.id)}
                  className="absolute top-4 right-4 text-accent hover:text-accent-700 transition-colors duration-150"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleInputChange('projects', project.id, 'title', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., E-commerce Platform"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) => handleInputChange('projects', project.id, 'role', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., Full-Stack Developer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => handleInputChange('projects', project.id, 'startDate', e.target.value)}
                      disabled={!isEditing}
                      className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      End Date
                    </label>
                    <input
                      type="month"
                      value={project.endDate}
                      onChange={(e) => handleInputChange('projects', project.id, 'endDate', e.target.value)}
                      disabled={!isEditing}
                      className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Team Size
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={project.teamSize}
                    onChange={(e) => handleInputChange('projects', project.id, 'teamSize', parseInt(e.target.value))}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Project Description *
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => handleInputChange('projects', project.id, 'description', e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="form-input disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                  placeholder="Describe your project, its features, and your contributions..."
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={project.githubUrl}
                    onChange={(e) => handleInputChange('projects', project.id, 'githubUrl', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={project.liveUrl}
                    onChange={(e) => handleInputChange('projects', project.id, 'liveUrl', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              {project.technologies.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-700"
                      >
                        <Icon name="Code" size={12} className="mr-1" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Skills</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <div>
            <h4 className="text-lg font-medium text-text-primary mb-4">Technical Skills</h4>
            <div className="space-y-6">
              {Object.entries(
                academicData.skills.technical.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {})
              ).map(([category, skills]) => (
                <div key={category}>
                  <h5 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wide">
                    {category}
                  </h5>
                  {skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      isEditing={isEditing}
                      onLevelChange={(level) => handleInputChange('skills', 'technical', skill.name, level)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h4 className="text-lg font-medium text-text-primary mb-4">Soft Skills</h4>
            <div className="space-y-4">
              {academicData.skills.soft.map((skill) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  isEditing={isEditing}
                  onLevelChange={(level) => handleInputChange('skills', 'soft', skill.name, level)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Certifications</h3>
          {isEditing && (
            <button
              onClick={() => addNewItem('certifications')}
              className="flex items-center px-3 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary-700 transition-colors duration-150"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Add Certification
            </button>
          )}
        </div>

        <div className="space-y-6">
          {academicData.certifications.map((cert) => (
            <div key={cert.id} className="bg-gray-50 rounded-lg p-6 relative">
              {isEditing && (
                <button
                  onClick={() => removeItem('certifications', cert.id)}
                  className="absolute top-4 right-4 text-accent hover:text-accent-700 transition-colors duration-150"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleInputChange('certifications', cert.id, 'name', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., AWS Certified Solutions Architect"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleInputChange('certifications', cert.id, 'issuer', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Issue Date
                  </label>
                  <input
                    type="month"
                    value={cert.issueDate}
                    onChange={(e) => handleInputChange('certifications', cert.id, 'issueDate', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="month"
                    value={cert.expiryDate}
                    onChange={(e) => handleInputChange('certifications', cert.id, 'expiryDate', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => handleInputChange('certifications', cert.id, 'credentialId', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="e.g., AWS-SAA-123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Verification URL
                  </label>
                  <input
                    type="url"
                    value={cert.verificationUrl}
                    onChange={(e) => handleInputChange('certifications', cert.id, 'verificationUrl', e.target.value)}
                    disabled={!isEditing}
                    className="form-input disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="https://verify.certification.com/123456"
                  />
                </div>
              </div>

              {cert.verificationUrl && !isEditing && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary-700 transition-colors duration-150"
                  >
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Verify Certification
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicDetailsSection;
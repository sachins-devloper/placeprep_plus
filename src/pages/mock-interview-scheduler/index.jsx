import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationHeader from 'components/ui/AuthenticationHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const MockInterviewScheduler = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [interviewType, setInterviewType] = useState('');
  const [duration, setDuration] = useState(60);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data for instructors
  const instructors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      expertise: ["Technical Interviews", "System Design", "Data Structures"],
      rating: 4.9,
      totalReviews: 127,
      experience: "8+ years",
      rate: 50,
      availability: ["09:00", "10:30", "14:00", "15:30", "17:00"],
      bio: `Senior Software Engineer at Google with extensive experience in conducting technical interviews. Specializes in helping candidates master algorithmic thinking and system design concepts.`,
      languages: ["English", "Spanish"],
      responseTime: "Usually responds within 2 hours"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      expertise: ["HR Interviews", "Behavioral Questions", "Communication Skills"],
      rating: 4.8,
      totalReviews: 89,
      experience: "6+ years",
      rate: 40,
      availability: ["11:00", "13:00", "16:00", "18:30"],
      bio: `HR Director with a passion for helping candidates showcase their best selves. Expert in behavioral interview techniques and professional communication strategies.`,
      languages: ["English", "Mandarin"],
      responseTime: "Usually responds within 1 hour"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: ["Product Management", "Case Studies", "Strategic Thinking"],
      rating: 4.9,
      totalReviews: 156,
      experience: "10+ years",
      rate: 60,
      availability: ["10:00", "12:00", "15:00", "17:30"],
      bio: `Senior Product Manager at Microsoft with a track record of launching successful products. Helps candidates develop product sense and strategic thinking skills.`,
      languages: ["English", "French"],
      responseTime: "Usually responds within 3 hours"
    }
  ];

  // Mock data for upcoming interviews
  const upcomingInterviews = [
    {
      id: 1,
      instructor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      time: "14:00",
      type: "Technical Interview",
      duration: 60,
      status: "confirmed",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      preparationMaterials: ["System Design Basics", "Coding Interview Patterns"]
    },
    {
      id: 2,
      instructor: "Michael Chen",
      date: "2024-01-18",
      time: "16:00",
      type: "HR Interview",
      duration: 45,
      status: "pending",
      meetingLink: "https://zoom.us/j/123456789",
      preparationMaterials: ["Behavioral Questions Guide", "STAR Method Examples"]
    }
  ];

  // Mock data for past interviews
  const pastInterviews = [
    {
      id: 1,
      instructor: "Emily Rodriguez",
      date: "2024-01-10",
      time: "15:00",
      type: "Product Management",
      duration: 60,
      score: 85,
      feedback: `Great analytical thinking and problem-solving approach. Focus on improving communication clarity and providing more structured responses to case study questions.`,
      recordingAvailable: true,
      areas: {
        communication: 8,
        technical: 9,
        problemSolving: 8,
        confidence: 7
      }
    },
    {
      id: 2,
      instructor: "Dr. Sarah Johnson",
      date: "2024-01-08",
      time: "10:30",
      type: "Technical Interview",
      duration: 90,
      score: 78,
      feedback: `Solid understanding of data structures and algorithms. Work on optimizing solutions and explaining thought process more clearly during coding sessions.`,
      recordingAvailable: false,
      areas: {
        communication: 7,
        technical: 8,
        problemSolving: 8,
        confidence: 8
      }
    }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBookInterview = (instructor) => {
    setSelectedInstructor(instructor);
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    setBookingStep(2);
  };

  const handleInterviewTypeSelect = (type) => {
    setInterviewType(type);
    setBookingStep(3);
  };

  const handleConfirmBooking = () => {
    // Mock booking confirmation
    setShowBookingModal(false);
    setBookingStep(1);
    setSelectedInstructor(null);
    setSelectedTimeSlot(null);
    setInterviewType('');
    setDuration(60);
    setSpecialRequirements('');
    // Show success message (could be implemented with toast notification)
    alert('Interview booked successfully! You will receive a confirmation email shortly.');
  };

  const renderCalendarView = () => (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Available Time Slots</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-150"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          <span className="text-sm font-medium text-text-primary px-4">
            {formatDate(selectedDate)}
          </span>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-150"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-150">
            <div className="flex items-center space-x-3 mb-3">
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-text-primary">{instructor.name}</h3>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="#F59E0B" />
                  <span className="text-sm text-text-secondary">{instructor.rating} ({instructor.totalReviews})</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex flex-wrap gap-1 mb-2">
                {instructor.expertise.slice(0, 2).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-secondary">${instructor.rate}/hour • {instructor.experience}</p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-text-secondary mb-2">Available today:</p>
              <div className="flex flex-wrap gap-1">
                {instructor.availability.slice(0, 3).map((time, index) => (
                  <button
                    key={index}
                    className="px-2 py-1 text-xs border border-border rounded hover:bg-primary-50 hover:border-primary transition-colors duration-150"
                  >
                    {time}
                  </button>
                ))}
                {instructor.availability.length > 3 && (
                  <span className="text-xs text-text-secondary">+{instructor.availability.length - 3} more</span>
                )}
              </div>
            </div>

            <button
              onClick={() => handleBookInterview(instructor)}
              className="w-full btn-primary text-sm py-2"
            >
              Book Interview
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpcomingInterviews = () => (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Upcoming Interviews</h2>
        <span className="text-sm text-text-secondary">{upcomingInterviews.length} scheduled</span>
      </div>

      {upcomingInterviews.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} color="#6B7280" className="mx-auto mb-4" />
          <p className="text-text-secondary">No upcoming interviews scheduled</p>
          <button
            onClick={() => setCurrentView('calendar')}
            className="mt-4 btn-primary"
          >
            Schedule Your First Interview
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{interview.type}</h3>
                  <p className="text-sm text-text-secondary">with {interview.instructor}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  interview.status === 'confirmed' ?'bg-success-100 text-success-700' :'bg-warning-100 text-warning-700'
                }`}>
                  {interview.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} color="#6B7280" />
                  <span className="text-sm text-text-secondary">
                    {new Date(interview.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} color="#6B7280" />
                  <span className="text-sm text-text-secondary">
                    {interview.time} ({interview.duration} min)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <button className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary text-sm rounded-md hover:bg-primary-200 transition-colors duration-150">
                  <Icon name="Video" size={14} />
                  <span>Join Meeting</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 border border-border text-text-secondary text-sm rounded-md hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="FileText" size={14} />
                  <span>Preparation</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 border border-border text-text-secondary text-sm rounded-md hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="Edit" size={14} />
                  <span>Reschedule</span>
                </button>
              </div>

              {interview.preparationMaterials && (
                <div>
                  <p className="text-xs text-text-secondary mb-1">Preparation Materials:</p>
                  <div className="flex flex-wrap gap-1">
                    {interview.preparationMaterials.map((material, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderPastInterviews = () => (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Past Interviews</h2>
        <span className="text-sm text-text-secondary">{pastInterviews.length} completed</span>
      </div>

      {pastInterviews.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="History" size={48} color="#6B7280" className="mx-auto mb-4" />
          <p className="text-text-secondary">No past interviews yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pastInterviews.map((interview) => (
            <div key={interview.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{interview.type}</h3>
                  <p className="text-sm text-text-secondary">with {interview.instructor}</p>
                  <p className="text-xs text-text-secondary">
                    {new Date(interview.date).toLocaleDateString()} at {interview.time}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-lg font-bold text-text-primary">{interview.score}</span>
                    <span className="text-sm text-text-secondary">/100</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        color={i < Math.floor(interview.score / 20) ? "#F59E0B" : "#E5E7EB"}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {Object.entries(interview.areas).map(([area, score]) => (
                  <div key={area} className="text-center">
                    <div className="text-sm font-medium text-text-primary capitalize">{area}</div>
                    <div className="text-xs text-text-secondary">{score}/10</div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-text-primary mb-2">Feedback:</p>
                <p className="text-sm text-text-secondary">{interview.feedback}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {interview.recordingAvailable && (
                  <button className="flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary text-sm rounded-md hover:bg-primary-200 transition-colors duration-150">
                    <Icon name="Play" size={14} />
                    <span>Watch Recording</span>
                  </button>
                )}
                <button className="flex items-center space-x-1 px-3 py-1 border border-border text-text-secondary text-sm rounded-md hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="Download" size={14} />
                  <span>Download Report</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 border border-border text-text-secondary text-sm rounded-md hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="RefreshCw" size={14} />
                  <span>Book Again</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderBookingModal = () => {
    if (!showBookingModal || !selectedInstructor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-150 flex items-center justify-center p-4">
        <div className="bg-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-primary">Book Interview</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-150"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {bookingStep === 1 && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src={selectedInstructor.avatar}
                    alt={selectedInstructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary">{selectedInstructor.name}</h3>
                    <div className="flex items-center space-x-1 mb-1">
                      <Icon name="Star" size={14} color="#F59E0B" />
                      <span className="text-sm text-text-secondary">
                        {selectedInstructor.rating} ({selectedInstructor.totalReviews} reviews)
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">${selectedInstructor.rate}/hour</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-text-primary mb-2">Select Time Slot</p>
                  <p className="text-xs text-text-secondary mb-3">{formatDate(selectedDate)}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedInstructor.availability.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSlotSelect(time)}
                        className="p-3 border border-border rounded-md text-sm hover:bg-primary-50 hover:border-primary transition-colors duration-150"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 2 && (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-text-secondary">
                    {formatDate(selectedDate)} at {selectedTimeSlot}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-text-primary mb-3">Select Interview Type</p>
                  <div className="space-y-2">
                    {['Technical Interview', 'HR Interview', 'Behavioral Interview', 'System Design'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleInterviewTypeSelect(type)}
                        className="w-full p-3 border border-border rounded-md text-sm text-left hover:bg-primary-50 hover:border-primary transition-colors duration-150"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <div className="mb-4">
                  <p className="text-sm text-text-secondary">
                    {interviewType} • {formatDate(selectedDate)} at {selectedTimeSlot}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="form-input"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder="Any specific topics or areas you'd like to focus on..."
                    className="form-input h-20 resize-none"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-text-primary mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div className="flex justify-between">
                      <span>Instructor:</span>
                      <span>{selectedInstructor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span>{formatDate(selectedDate)} at {selectedTimeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{interviewType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{duration} minutes</span>
                    </div>
                    <div className="flex justify-between font-medium text-text-primary border-t pt-2 mt-2">
                      <span>Total Cost:</span>
                      <span>${(selectedInstructor.rate * duration / 60).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setBookingStep(2)}
                    className="flex-1 px-4 py-2 border border-border rounded-md text-text-primary hover:bg-gray-50 transition-colors duration-150"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 btn-primary"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationHeader />
      
      <main className="content-with-nav content-with-header px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Mock Interview Scheduler
            </h1>
            <p className="text-text-secondary">
              Book practice interviews with expert instructors to improve your skills
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setCurrentView('calendar')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                    currentView === 'calendar' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Schedule Interview
                </button>
                <button
                  onClick={() => setCurrentView('upcoming')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                    currentView === 'upcoming' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Clock" size={16} className="mr-2" />
                  Upcoming ({upcomingInterviews.length})
                </button>
                <button
                  onClick={() => setCurrentView('past')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-150 ${
                    currentView === 'past' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="History" size={16} className="mr-2" />
                  Past Interviews ({pastInterviews.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          {currentView === 'calendar' && renderCalendarView()}
          {currentView === 'upcoming' && renderUpcomingInterviews()}
          {currentView === 'past' && renderPastInterviews()}
        </div>
      </main>

      {/* Booking Modal */}
      {renderBookingModal()}

      <BottomTabNavigation />
    </div>
  );
};

export default MockInterviewScheduler;
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

const initialState = {
  activeTab: '/dashboard-home',
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/assets/images/avatar.jpg',
    isAuthenticated: true,
    progress: {
      completedInterviews: 3,
      totalInterviews: 5,
      weeklyGoal: 5,
      achievements: ['First Interview', 'Week Streak', 'Perfect Score']
    }
  },
  notifications: {
    count: 3,
    items: [
      {
        id: 1,
        type: 'interview',
        title: 'Interview Reminder',
        message: 'Mock interview scheduled for tomorrow at 2:00 PM',
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: 2,
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: 'You completed your first week of practice',
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: 3,
        type: 'system',
        title: 'Profile Update',
        message: 'Please update your profile information',
        timestamp: new Date().toISOString(),
        read: false
      }
    ]
  },
  navigationHistory: [],
  preferences: {
    theme: 'light',
    notifications: true,
    soundEnabled: true,
    language: 'en'
  },
  loading: false,
  error: null
};

const navigationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
        navigationHistory: [
          ...state.navigationHistory.slice(-9),
          {
            path: action.payload,
            timestamp: new Date().toISOString()
          }
        ]
      };

    case 'UPDATE_USER_PROGRESS':
      return {
        ...state,
        user: {
          ...state.user,
          progress: {
            ...state.user.progress,
            ...action.payload
          }
        }
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: {
          count: state.notifications.count + 1,
          items: [action.payload, ...state.notifications.items]
        }
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          count: Math.max(0, state.notifications.count - 1),
          items: state.notifications.items.map(item =>
            item.id === action.payload ? { ...item, read: true } : item
          )
        }
      };

    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: {
          count: 0,
          items: state.notifications.items.map(item => ({ ...item, read: true }))
        }
      };

    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'LOGOUT_USER':
      return {
        ...initialState,
        user: {
          ...initialState.user,
          isAuthenticated: false
        }
      };

    case 'LOGIN_USER':
      return {
        ...state,
        user: {
          ...action.payload,
          isAuthenticated: true
        }
      };

    default:
      return state;
  }
};

export const NavigationStateManager = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);
  const location = useLocation();

  // Update active tab based on current route
  useEffect(() => {
    if (location.pathname !== state.activeTab) {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: location.pathname });
    }
  }, [location.pathname, state.activeTab]);

  // Persist navigation state to sessionStorage
  useEffect(() => {
    const stateToStore = {
      activeTab: state.activeTab,
      navigationHistory: state.navigationHistory,
      preferences: state.preferences
    };
    sessionStorage.setItem('navigationState', JSON.stringify(stateToStore));
  }, [state.activeTab, state.navigationHistory, state.preferences]);

  // Restore navigation state from sessionStorage
  useEffect(() => {
    const storedState = sessionStorage.getItem('navigationState');
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        if (parsedState.preferences) {
          dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: parsedState.preferences });
        }
      } catch (error) {
        console.warn('Failed to restore navigation state:', error);
      }
    }
  }, []);

  const contextValue = {
    ...state,
    dispatch,
    actions: {
      setActiveTab: (tab) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }),
      updateUserProgress: (progress) => dispatch({ type: 'UPDATE_USER_PROGRESS', payload: progress }),
      addNotification: (notification) => dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
      markNotificationRead: (id) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
      clearAllNotifications: () => dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' }),
      updatePreferences: (preferences) => dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences }),
      setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
      setError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
      logout: () => dispatch({ type: 'LOGOUT_USER' }),
      login: (user) => dispatch({ type: 'LOGIN_USER', payload: user })
    }
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationStateManager');
  }
  return context;
};

export default NavigationStateManager;
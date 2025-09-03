import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import DashboardHome from "pages/dashboard-home";
import MockInterviewScheduler from "pages/mock-interview-scheduler";
import ProgressAnalytics from "pages/progress-analytics";
import UserProfileManagement from "pages/user-profile-management";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/mock-interview-scheduler" element={<MockInterviewScheduler />} />
          <Route path="/progress-analytics" element={<ProgressAnalytics />} />
          <Route path="/user-profile-management" element={<UserProfileManagement />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import EducatorLayout from './components/EducatorLayout';
import StudentNav from './components/StudentNav';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseLibrary from './pages/StudentDashboard/CourseLibrary';
import MyCourses from './pages/StudentDashboard/MyCourses';
import MentorshipProgram from './pages/StudentDashboard/MentorshipProgram';
import CommunityForum from './pages/StudentDashboard/CommunityForum';
import StudentProfile from './pages/StudentDashboard/StudentProfile';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import EducatorDashboard from './pages/Educator Dashboard/EducatorDashboard';
import UploadResource from './pages/Educator Dashboard/UploadResource';
import ManageCourses from './pages/Educator Dashboard/ManageCourses';
import MentorshipRequests from './pages/Educator Dashboard/MentorshipRequests';
import ForumParticipation from './pages/Educator Dashboard/ForumParticipation';
import EducatorProfile from './pages/Educator Dashboard/EducatorProfile';
import React from 'react';
import { useAuth } from './contexts/AuthContext';

// Component to redirect to appropriate dashboard based on user role
const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  
  if (user?.role === 'student') {
    return <Navigate to="/student-dashboard" replace />;
  } else if (user?.role === 'educator') {
    return <Navigate to="/educator-dashboard" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

// Student Layout Component
const StudentLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNav />
      <main className="py-8">
        {children}
      </main>
    </div>
  );
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Header */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
          </>
        } />
        <Route path="/about" element={
          <>
            <Header />
            <About />
          </>
        } />
        <Route path="/courses" element={
          <>
            <Header />
            <Courses />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Header />
            <Contact />
          </>
        } />
        <Route path="/login" element={
          <>
            <Header />
            <Login />
          </>
        } />
        <Route path="/register" element={
          <>
            <Header />
            <Register />
          </>
        } />
        
        {/* Legacy dashboard redirect */}
        <Route path="/dashboard" element={<DashboardRedirect />} />
        
        {/* Protected Student Routes with StudentNav (No Header) */}
        <Route path="/course-library" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <CourseLibrary />
            </StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/my-courses" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <MyCourses />
            </StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/mentorship" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <MentorshipProgram />
            </StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/community-forum" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <CommunityForum />
            </StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <StudentProfile />
            </StudentLayout>
          </ProtectedRoute>
        } />
        <Route path="/student-dashboard" element={
          <ProtectedRoute requiredRole="student">
            <StudentLayout>
              <StudentDashboard />
            </StudentLayout>
          </ProtectedRoute>
        } />
        
        {/* Protected Educator Routes with EducatorLayout (No Header) */}
        <Route path="/educator-dashboard" element={
          <ProtectedRoute requiredRole="educator">
            <EducatorLayout>
              <EducatorDashboard />
            </EducatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/educator-dashboard/upload" element={
          <ProtectedRoute requiredRole="educator">
            <EducatorLayout>
              <UploadResource />
            </EducatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/educator-dashboard/manage" element={
          <ProtectedRoute requiredRole="educator">
            <EducatorLayout>
              <ManageCourses />
            </EducatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/educator-dashboard/mentorship-requests" element={
          <ProtectedRoute requiredRole="educator">
            <EducatorLayout>
              <MentorshipRequests />
            </EducatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/educator-dashboard/forum" element={
          <ProtectedRoute requiredRole="educator">
            <EducatorLayout>
              <ForumParticipation />
            </EducatorLayout>
          </ProtectedRoute>
        } />
        <Route path="/educator-dashboard/profile" element={
          <ProtectedRoute requiredRole="educator">
            <EducatorLayout>
              <EducatorProfile />
            </EducatorLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

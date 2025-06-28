import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseLibrary from './pages/StudentDashboard/CourseLibrary';
import MyCourses from './pages/StudentDashboard/MyCourses';
import MentorshipProgram from './pages/StudentDashboard/MentorshipProgram';
import CommunityForum from './pages/StudentDashboard/CommunityForum';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import React from 'react';

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-library" element={<CourseLibrary />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/mentorship" element={<MentorshipProgram />} />
        <Route path="/community-forum" element={<CommunityForum />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

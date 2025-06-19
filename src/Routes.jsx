import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

export default function AppRoutes() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={
          <div className="page-with-header">
            <About />
          </div>
        } />
        <Route path="/courses" element={
          <div className="page-with-header">
            <Courses />
          </div>
        } />
        <Route path="/contact" element={
          <div className="page-with-header">
            <Contact />
          </div>
        } />
        <Route path="/login" element={
          <div className="page-with-header">
            <Login />
          </div>
        } />
        <Route path="/register" element={
          <div className="page-with-header">
            <Register />
          </div>
        } />
      </Routes>
    </Router>
  );
}

import { Box, Typography, Grid, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import { BookOpen, TrendingUp, ExternalLink, GraduationCap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:5000/api/student/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const studentData = await response.json();
        setStudent(studentData);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <Box className="dashboard-container" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="dashboard-container" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  // Use user data from auth context as fallback if student data is not available
  const displayName = student?.name || user?.name || 'Student';

  return (
    <Box className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="welcome-content">
          <Typography variant="h3" className="welcome-title">
            Welcome back, {displayName}!
          </Typography>
          <Typography variant="h6" className="welcome-subtitle">
            Continue your learning journey and track your progress
          </Typography>
        </div>
        <div className="hero-icon">
          <GraduationCap size={64} />
        </div>
      </div>

      <Grid container spacing={6} className="main-content">
        {/* Enrolled Courses & Progress - Left */}
        <Grid item xs={12} className="courses-grid-item">
          <Card className="courses-card">
            <CardContent className="card-content">
              <div className="section-header">
                <BookOpen className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Your Learning Path
                </Typography>
              </div>
              
              {!student?.enrolledCourses || student.enrolledCourses.length === 0 ? (
                <div className="empty-state">
                  <BookOpen size={48} className="empty-icon" />
                  <Typography className="empty-text">
                    No courses enrolled yet
                  </Typography>
                  <Typography className="empty-subtext">
                    Start your learning journey by enrolling in a course
                  </Typography>
                </div>
              ) : (
                <List className="courses-list">
                  {student.enrolledCourses.map((course, index) => (
                    <ListItem key={course.id || index} className="course-item">
                      <div className="course-content">
                        <div className="course-header">
                          <Typography className="course-title">
                            {course.title}
                          </Typography>
                          <div className="progress-badge">
                            <TrendingUp size={16} />
                            <span>{course.progress || 0}%</span>
                          </div>
                        </div>
                        
                        <div className="progress-container">
                          <LinearProgress 
                            variant="determinate" 
                            value={course.progress || 0}
                            className={`progress-bar progress-${Math.floor((course.progress || 0) / 25)}`}
                          />
                        </div>
                        
                        <Typography className="progress-text">
                          {course.progress >= 100 ? 'Completed!' : 
                           course.progress >= 75 ? 'Almost there!' :
                           course.progress >= 50 ? 'Great progress!' :
                           course.progress >= 25 ? 'Keep going!' : 'Just started'}
                        </Typography>
                      </div>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recommended Resources - Right */}
        <Grid item xs={12} className="resources-grid-item">
          <Card className="resources-card">
            <CardContent className="card-content">
              <div className="section-header">
                <ExternalLink className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Recommended Resources
                </Typography>
              </div>
              {!student?.suggestedResources || student.suggestedResources.length === 0 ? (
                <div className="empty-state">
                  <ExternalLink size={48} className="empty-icon" />
                  <Typography className="empty-text">
                    No resources available
                  </Typography>
                </div>
              ) : (
                <List className="resources-list">
                  {student.suggestedResources.map((resource, index) => (
                    <ListItem key={resource.id || index} className="resource-item">
                      <a 
                        href={resource.link} 
                        className="resource-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="resource-title">{resource.title}</span>
                        <ExternalLink size={16} className="resource-icon" />
                      </a>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Community Forum - New Section */}
      <div className="community-section">
        <div className="community-header">
          <div className="community-header-content">
            <Typography variant="h4" className="community-title">
              Join Our Community
            </Typography>
            <Typography variant="body1" className="community-subtitle">
              Connect with educators, volunteers, and fellow students
            </Typography>
          </div>
          <div className="community-stats">
            <div className="stat-item">
              <Typography variant="h6" className="stat-number">2+</Typography>
              <Typography variant="body2" className="stat-label">Active Members</Typography>
            </div>
            <div className="stat-item">
              <Typography variant="h6" className="stat-number">1+</Typography>
              <Typography variant="body2" className="stat-label">Educators</Typography>
            </div>
            <div className="stat-item">
              <Typography variant="h6" className="stat-number">10+</Typography>
              <Typography variant="body2" className="stat-label">Discussions</Typography>
            </div>
          </div>
        </div>
        
        <div className="community-content">
          <div className="community-features">
            <div className="feature-item">
              <MessageCircle size={32} className="feature-icon" />
              <Typography variant="h6" className="feature-title">Ask Questions</Typography>
              <Typography variant="body2" className="feature-description">
                Get help from experienced educators and volunteers
              </Typography>
            </div>
            <div className="feature-item">
              <BookOpen size={32} className="feature-icon" />
              <Typography variant="h6" className="feature-title">Share Resources</Typography>
              <Typography variant="body2" className="feature-description">
                Discover and share educational materials
              </Typography>
            </div>
            <div className="feature-item">
              <TrendingUp size={32} className="feature-icon" />
              <Typography variant="h6" className="feature-title">Track Progress</Typography>
              <Typography variant="body2" className="feature-description">
                Monitor your learning journey with the community
              </Typography>
            </div>
          </div>
          
          <div className="community-actions">
            <Link to="/community-forum" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                className="community-primary-btn"
                startIcon={<MessageCircle size={24} />}
              >
                Join Discussion
              </Button>
            </Link>
            <Link to="/community-guidelines" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                className="community-secondary-btn"
              >
                Community Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
}
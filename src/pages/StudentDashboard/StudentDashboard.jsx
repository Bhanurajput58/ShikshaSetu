import { Box, Typography, Grid, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Button } from '@mui/material';
import { BookOpen, TrendingUp, ExternalLink, GraduationCap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

export default function StudentDashboard({ student }) {
  return (
    <Box className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="welcome-content">
          <Typography variant="h3" className="welcome-title">
            Welcome back, {student?.name || 'Student'}!
          </Typography>
          <Typography variant="h6" className="welcome-subtitle">
            Continue your learning journey and track your progress
          </Typography>
        </div>
        <div className="hero-icon">
          <GraduationCap size={64} />
        </div>
      </div>

      <Grid container spacing={4} className="main-content">
        {/* Enrolled Courses & Progress */}
        <Grid item xs={12} lg={8}>
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

        {/* Suggested Resources & Community Forum */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Community Forum Card */}
            <Grid item xs={12}>
              <Card className="community-card">
                <CardContent className="card-content">
                  <div className="section-header">
                    <MessageCircle className="section-icon" />
                    <Typography variant="h5" className="section-title">
                      Community Forum
                    </Typography>
                  </div>
                  
                  <Typography className="community-description">
                    Have questions? Connect with educators and volunteers in our community forum.
                  </Typography>
                  
                  <Link to="/community-forum" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="community-btn"
                      startIcon={<MessageCircle size={20} />}
                    >
                      Join Discussion
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>

            {/* Suggested Resources */}
            <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
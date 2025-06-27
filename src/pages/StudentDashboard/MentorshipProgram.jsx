import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Alert
} from '@mui/material';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  MessageCircle, 
  Star, 
  Clock, 
  CheckCircle, 
  XCircle,
  Send,
  Video,
  FileText,
  Award
} from 'lucide-react';
import './MentorshipProgram.css';

export default function MentorshipProgram({ student }) {
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    subject: '',
    goals: '',
    experience: '',
    availability: '',
    preferredMentor: ''
  });

  const assignedMentor = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    subject: 'Computer Science',
    experience: '8 years',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    email: 'sarah.johnson@university.edu',
    bio: 'Senior Software Engineer at Google with expertise in machine learning and web development. Passionate about mentoring students and helping them achieve their career goals.',
    skills: ['JavaScript', 'Python', 'React', 'Machine Learning', 'System Design']
  };

  const sessions = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      date: '2024-01-15',
      time: '14:00',
      duration: '60 min',
      status: 'completed',
      notes: 'Covered useState, useEffect, and custom hooks. Great progress on the project!'
    },
    {
      id: 2,
      title: 'System Design Interview Prep',
      date: '2024-01-22',
      time: '15:30',
      duration: '90 min',
      status: 'upcoming',
      notes: ''
    },
    {
      id: 3,
      title: 'Code Review & Best Practices',
      date: '2024-01-29',
      time: '16:00',
      duration: '60 min',
      status: 'scheduled',
      notes: ''
    }
  ];

  const handleApplySubmit = () => {
    // Handle application submission
    console.log('Application submitted:', applicationForm);
    setApplyDialogOpen(false);
    setApplicationForm({
      subject: '',
      goals: '',
      experience: '',
      availability: '',
      preferredMentor: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'upcoming': return 'warning';
      case 'scheduled': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'upcoming': return <Clock size={16} />;
      case 'scheduled': return <Calendar size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <Box className="mentorship-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="welcome-content">
          <Typography variant="h3" className="welcome-title">
            Mentorship Program
          </Typography>
          <Typography variant="h6" className="welcome-subtitle">
            Connect with experienced mentors and accelerate your learning journey
          </Typography>
        </div>
        <div className="hero-icon">
          <Users size={64} />
        </div>
      </div>

      <Grid container spacing={4} className="main-content">
        {/* Apply for Mentor Section */}
        <Grid item xs={12} lg={4}>
          <Card className="mentorship-card">
            <CardContent className="card-content">
              <div className="section-header">
                <UserPlus className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Apply for Mentor
                </Typography>
              </div>
              
              {!assignedMentor ? (
                <div className="apply-section">
                  <Typography className="section-description">
                    Ready to accelerate your learning? Apply for a mentor who can guide you through your educational journey.
                  </Typography>
                  <Button 
                    variant="contained" 
                    className="apply-button"
                    onClick={() => setApplyDialogOpen(true)}
                    startIcon={<UserPlus />}
                  >
                    Apply Now
                  </Button>
                </div>
              ) : (
                <Alert severity="success" className="success-alert">
                  <Typography variant="body2">
                    You have been assigned a mentor! Check the "Your Mentor" section below.
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Assigned Mentor Section */}
        <Grid item xs={12} lg={8}>
          <Card className="mentorship-card">
            <CardContent className="card-content">
              <div className="section-header">
                <Award className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Your Mentor
                </Typography>
              </div>
              
              {assignedMentor ? (
                <div className="mentor-profile">
                  <div className="mentor-header">
                    <Avatar 
                      src={assignedMentor.avatar} 
                      alt={assignedMentor.name}
                      className="mentor-avatar"
                    />
                    <div className="mentor-info">
                      <Typography variant="h6" className="mentor-name">
                        {assignedMentor.name}
                      </Typography>
                      <Typography variant="body2" className="mentor-subject">
                        {assignedMentor.subject} • {assignedMentor.experience} experience
                      </Typography>
                      <div className="mentor-rating">
                        <Star size={16} className="star-icon" />
                        <span>{assignedMentor.rating}/5.0</span>
                      </div>
                    </div>
                    <div className="mentor-actions">
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<MessageCircle />}
                        className="contact-button"
                      >
                        Message
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<Video />}
                        className="contact-button"
                      >
                        Video Call
                      </Button>
                    </div>
                  </div>
                  
                  <Typography variant="body2" className="mentor-bio">
                    {assignedMentor.bio}
                  </Typography>
                  
                  <div className="mentor-skills">
                    <Typography variant="subtitle2" className="skills-title">
                      Expertise:
                    </Typography>
                    <div className="skills-list">
                      {assignedMentor.skills.map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          size="small" 
                          className="skill-chip"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <Users size={48} className="empty-icon" />
                  <Typography className="empty-text">
                    No mentor assigned yet
                  </Typography>
                  <Typography className="empty-subtext">
                    Apply for a mentor to get started
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sessions Tracking Section */}
        <Grid item xs={12}>
          <Card className="mentorship-card">
            <CardContent className="card-content">
              <div className="section-header">
                <Calendar className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Session Tracking
                </Typography>
              </div>
              
              {sessions.length > 0 ? (
                <div className="sessions-container">
                  <div className="sessions-stats">
                    <div className="stat-item">
                      <Typography variant="h4" className="stat-number">
                        {sessions.filter(s => s.status === 'completed').length}
                      </Typography>
                      <Typography variant="body2" className="stat-label">
                        Completed
                      </Typography>
                    </div>
                    <div className="stat-item">
                      <Typography variant="h4" className="stat-number">
                        {sessions.filter(s => s.status === 'upcoming').length}
                      </Typography>
                      <Typography variant="body2" className="stat-label">
                        Upcoming
                      </Typography>
                    </div>
                    <div className="stat-item">
                      <Typography variant="h4" className="stat-number">
                        {sessions.filter(s => s.status === 'scheduled').length}
                      </Typography>
                      <Typography variant="body2" className="stat-label">
                        Scheduled
                      </Typography>
                    </div>
                  </div>
                  
                  <List className="sessions-list">
                    {sessions.map((session) => (
                      <React.Fragment key={session.id}>
                        <ListItem className="session-item">
                          <ListItemAvatar>
                            <Avatar className="session-avatar">
                              {getStatusIcon(session.status)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <div className="session-header">
                                <Typography className="session-title">
                                  {session.title}
                                </Typography>
                                <Chip 
                                  label={session.status} 
                                  size="small"
                                  color={getStatusColor(session.status)}
                                  className="status-chip"
                                />
                              </div>
                            }
                            secondary={
                              <div className="session-details">
                                <Typography variant="body2" className="session-time">
                                  {new Date(session.date).toLocaleDateString()} at {session.time} ({session.duration})
                                </Typography>
                                {session.notes && (
                                  <Typography variant="body2" className="session-notes">
                                    {session.notes}
                                  </Typography>
                                )}
                              </div>
                            }
                          />
                          <div className="session-actions">
                            {session.status === 'upcoming' && (
                              <Button 
                                variant="outlined" 
                                size="small"
                                startIcon={<Calendar />}
                                className="reschedule-button"
                              >
                                Reschedule
                              </Button>
                            )}
                            {session.status === 'scheduled' && (
                              <Button 
                                variant="contained" 
                                size="small"
                                startIcon={<Video />}
                                className="join-button"
                              >
                                Join
                              </Button>
                            )}
                          </div>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </div>
              ) : (
                <div className="empty-state">
                  <Calendar size={48} className="empty-icon" />
                  <Typography className="empty-text">
                    No sessions scheduled
                  </Typography>
                  <Typography className="empty-subtext">
                    Sessions will appear here once scheduled with your mentor
                  </Typography>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Apply for Mentor Dialog */}
      <Dialog 
        open={applyDialogOpen} 
        onClose={() => setApplyDialogOpen(false)}
        maxWidth="md"
        fullWidth
        className="apply-dialog"
      >
        <DialogTitle className="dialog-title">
          <UserPlus className="dialog-icon" />
          Apply for a Mentor
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject/Field of Interest"
                value={applicationForm.subject}
                onChange={(e) => setApplicationForm({...applicationForm, subject: e.target.value})}
                placeholder="e.g., Computer Science, Mathematics, Business"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Learning Goals"
                value={applicationForm.goals}
                onChange={(e) => setApplicationForm({...applicationForm, goals: e.target.value})}
                placeholder="What do you want to achieve through mentorship?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Current Experience Level"
                value={applicationForm.experience}
                onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                placeholder="Describe your current knowledge and experience"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Preferred Availability"
                value={applicationForm.availability}
                onChange={(e) => setApplicationForm({...applicationForm, availability: e.target.value})}
                placeholder="e.g., Weekdays 6-8 PM, Weekends"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Preferred Mentor Type (Optional)"
                value={applicationForm.preferredMentor}
                onChange={(e) => setApplicationForm({...applicationForm, preferredMentor: e.target.value})}
                placeholder="e.g., Industry professional, Academic"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={() => setApplyDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleApplySubmit} 
            variant="contained"
            startIcon={<Send />}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 
import React, { useState, useEffect } from 'react';
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
  Alert,
  Snackbar
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
import { useAuth } from '../../contexts/AuthContext';

const API_BASE = 'http://localhost:5000';

export default function MentorshipProgram() {
  const { user } = useAuth();
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    subject: '',
    goals: '',
    experience: '',
    availability: '',
    preferredMentor: ''
  });
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });
  const [studentId, setStudentId] = useState(null);
  const [myRequest, setMyRequest] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  // Container styles for responsive layout
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const applyStyle = {
    flex: '0 0 30%',
    transform: 'translateY(20px)',
    minWidth: '300px'
  };

  const mentorStyle = {
    flex: '0 0 65%',
    minWidth: '400px'
  };

  const sessionsStyle = {
    flex: '0 0 100%',
    marginTop: '1rem'
  };

  // Mobile responsive styles
  const mobileStyle = {
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      '& > *': {
        flex: '1 1 100%',
        transform: 'none !important',
        marginTop: '0 !important'
      }
    }
  };

  // Fetch student profile to get _id (if not available in user)
  useEffect(() => {
    async function fetchStudentId() {
      if (user && user._id) {
        setStudentId(user._id);
        return;
      }
      // fallback: fetch profile
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/student/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStudentId(data._id);
        }
      } catch (err) {
        // ignore
      }
    }
    fetchStudentId();
  }, [user]);

  // Fetch student's mentorship request
  const fetchMyRequest = async () => {
    if (!studentId) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/mentorship/my-request`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data) setMyRequest(data);
      }
    } catch (err) {
      // ignore
    }
  };
  useEffect(() => { fetchMyRequest(); }, [studentId]);

  // Placeholder for dynamic mentor assignment
  const assignedMentor = null; // Will be set dynamically later

  // Placeholder for dynamic sessions
  const sessions = []; // Will be set dynamically later

  const handleApplySubmit = async () => {
    if (!studentId) {
      setFeedback({ open: true, message: 'Student ID not found. Please re-login.', severity: 'error' });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/mentorship/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          student: studentId,
          subject: applicationForm.subject,
          goals: applicationForm.goals,
          experience: applicationForm.experience,
          availability: applicationForm.availability,
          preferredMentor: applicationForm.preferredMentor,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }
      setFeedback({ open: true, message: 'Application submitted successfully!', severity: 'success' });
      setApplyDialogOpen(false);
      setApplicationForm({
        subject: '',
        goals: '',
        experience: '',
        availability: '',
        preferredMentor: ''
      });
      // Fetch the latest request to update UI
      fetchMyRequest();
    } catch (error) {
      setFeedback({ open: true, message: error.message || 'Submission failed', severity: 'error' });
    }
  };

  // Open update dialog with pre-filled data
  const handleUpdateClick = () => {
    setApplicationForm({
      subject: myRequest.subject || '',
      goals: myRequest.goals || '',
      experience: myRequest.experience || '',
      availability: myRequest.availability || '',
      preferredMentor: myRequest.preferredMentor || ''
    });
    setIsUpdateMode(true);
    setApplyDialogOpen(true);
  };

  // Cancel mentorship request (with confirmation)
  const handleCancelRequest = async () => {
    setConfirmCancelOpen(true);
  };

  const handleConfirmCancel = async () => {
    setConfirmCancelOpen(false);
    if (!studentId) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/mentorship/my-request`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to cancel request');
      }
      setFeedback({ open: true, message: 'Request cancelled successfully!', severity: 'success' });
      setMyRequest(null);
    } catch (error) {
      setFeedback({ open: true, message: error.message || 'Cancel failed', severity: 'error' });
    }
  };

  // Update mentorship request
  const handleUpdateSubmit = async () => {
    if (!studentId) {
      setFeedback({ open: true, message: 'Student ID not found. Please re-login.', severity: 'error' });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/api/mentorship/my-request`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: applicationForm.subject,
          goals: applicationForm.goals,
          experience: applicationForm.experience,
          availability: applicationForm.availability,
          preferredMentor: applicationForm.preferredMentor,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update application');
      }
      setFeedback({ open: true, message: 'Application updated successfully!', severity: 'success' });
      setApplyDialogOpen(false);
      setIsUpdateMode(false);
      setApplicationForm({
        subject: '',
        goals: '',
        experience: '',
        availability: '',
        preferredMentor: ''
      });
      fetchMyRequest();
    } catch (error) {
      setFeedback({ open: true, message: error.message || 'Update failed', severity: 'error' });
    }
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

      {/* Main Content with Responsive Layout */}
      <div 
        className="main-content"
        style={{
          ...containerStyle,
          ...mobileStyle
        }}
      >
        {/* Apply for Mentor Section */}
        <div 
          className="apply-section-wrapper"
          style={window.innerWidth > 768 ? applyStyle : { flex: '1 1 100%' }}
        >
          <Card className="mentorship-card">
            <CardContent className="card-content">
              <div className="section-header">
                <UserPlus className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Apply for Mentor
                </Typography>
              </div>
              
              {!myRequest ? (
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
                <Alert severity={myRequest.status === 'pending' ? 'info' : myRequest.status === 'accepted' ? 'success' : 'warning'} className="success-alert">
                  <Typography variant="body2">
                    {myRequest.status === 'accepted' ? (
                      <>
                        Congratulations! Your mentorship request has been <b>accepted</b>.<br/>
                      </>
                    ) : (
                      <>
                        You have already applied for a mentor.<br/>
                        Status: <b>{myRequest.status}</b>
                        {myRequest.subject && (<><br/>Subject: {myRequest.subject}</>)}
                        {myRequest.goals && (<><br/>Goals: {myRequest.goals}</>)}
                      </>
                    )}
                  </Typography>
                  <Box mt={2} display="flex" gap={1}>
                    {/* Only show Update button if not accepted */}
                    {myRequest.status !== 'accepted' && (
                      <Button variant="outlined" color="primary" onClick={handleUpdateClick}>Update</Button>
                    )}
                    <Button variant="outlined" color="error" onClick={handleCancelRequest}>Cancel</Button>
                  </Box>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Assigned Mentor Section */}
        <div 
          className="mentor-section-wrapper"
          style={window.innerWidth > 768 ? mentorStyle : { flex: '1 1 100%' }}
        >
          <Card className="mentorship-card">
            <CardContent className="card-content">
              <div className="section-header">
                <Award className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Your Mentor
                </Typography>
              </div>
              
              {myRequest && myRequest.educator ? (
                <div className="mentor-profile">
                  <div className="mentor-header">
                    <Avatar
                      className="mentor-avatar"
                      src={myRequest.educator.personalInfo?.profilePicture || ''}
                      alt={myRequest.educator.name}
                    >
                      {myRequest.educator.name?.[0]}
                    </Avatar>
                    <div className="mentor-info">
                      <Typography variant="h6" className="mentor-name">
                        {myRequest.educator.name}
                      </Typography>
                      <Typography className="mentor-subject">
                        {myRequest.educator.professionalInfo?.currentPosition || 'Mentor'}
                      </Typography>
                      <Typography className="mentor-bio">
                        {myRequest.educator.personalInfo?.bio || 'No bio available.'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Email: {myRequest.educator.email}
                      </Typography>
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
        </div>

        {/* Sessions Tracking Section */}
        <div 
          className="sessions-section-wrapper"
          style={window.innerWidth > 768 ? sessionsStyle : { flex: '1 1 100%' }}
        >
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
                  {/* Sessions will be rendered here dynamically */}
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
        </div>
      </div>

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
          {isUpdateMode ? 'Update Application' : 'Apply for a Mentor'}
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
          <Button onClick={() => { 
            setApplyDialogOpen(false); 
            setIsUpdateMode(false); 
            setApplicationForm({
              subject: '',
              goals: '',
              experience: '',
              availability: '',
              preferredMentor: ''
            });
          }}>
            Cancel
          </Button>
          <Button 
            onClick={isUpdateMode ? handleUpdateSubmit : handleApplySubmit} 
            variant="contained"
            startIcon={<Send />}
          >
            {isUpdateMode ? 'Update Application' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          severity={feedback.severity}
          onClose={() => setFeedback({ ...feedback, open: false })}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={confirmCancelOpen} onClose={() => setConfirmCancelOpen(false)}>
        <DialogTitle>Cancel Mentorship Request</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel your mentorship request? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCancelOpen(false)} color="primary">No</Button>
          <Button onClick={handleConfirmCancel} color="error" variant="contained">Yes, Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
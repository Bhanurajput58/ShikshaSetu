import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Snackbar,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Badge,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Fade,
  Skeleton
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  Person,
  School,
  Interests,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Grade,
  MenuBook,
  Star,
  ExpandMore,
  TrendingUp,
  EmojiEvents,
  BookmarkBorder,
  Timeline,
  CameraAlt,
  Verified,
  Psychology,
  AutoAwesome
} from '@mui/icons-material';
import './StudentProfile.css';
import { useAuth } from '../../contexts/AuthContext';

const INTEREST_AREAS = [
  'Mathematics', 'Science', 'English Literature', 'History', 'Geography',
  'Computer Science', 'Art & Design', 'Music', 'Physical Education',
  'Languages', 'Economics', 'Psychology', 'Engineering', 'Medicine',
  'Business', 'Environmental Science', 'Philosophy', 'Political Science'
];

const GRADE_LEVELS = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12'
];

export default function StudentProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [studentData, setStudentData] = useState({
    personalInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      profilePicture: null,
      bio: '',
      socialLinks: {
        github: '',
        linkedin: '',
        portfolio: ''
      }
    },
    academicInfo: {
      grade: '',
      school: '',
      rollNumber: '',
      admissionDate: '',
      currentGPA: '',
      subjects: [],
      achievements: []
    },
    interestAreas: [],
    learningStats: {
      coursesCompleted: 0,
      hoursLearned: 0,
      streakDays: 0,
      badges: []
    }
  });

  const [editData, setEditData] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch('/api/student/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setStudentData(data);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    setEditData(JSON.parse(JSON.stringify(studentData)));
  }, [studentData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setStudentData(editData);
    setIsEditing(false);
    
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/student/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editData)
      });
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleCancel = () => {
    setEditData(JSON.parse(JSON.stringify(studentData)));
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      const interestExists = editData.interestAreas.some(
        interest => interest.name.toLowerCase() === newInterest.toLowerCase()
      );
      
      if (interestExists) {
        setSnackbar({
          open: true,
          message: 'This interest area already exists! 📚',
          severity: 'warning'
        });
        return;
      }

      const newInterestObj = {
        id: Date.now(),
        name: newInterest,
        level: 'Beginner',
        description: '',
        progress: 0
      };

      setEditData(prev => ({
        ...prev,
        interestAreas: [...prev.interestAreas, newInterestObj]
      }));

      setNewInterest('');
      setShowInterestDialog(false);
      setSnackbar({
        open: true,
        message: 'Interest area added successfully! ✨',
        severity: 'success'
      });
    }
  };

  const handleRemoveInterest = (interestId) => {
    setEditData(prev => ({
      ...prev,
      interestAreas: prev.interestAreas.filter(interest => interest.id !== interestId)
    }));
    setSnackbar({
      open: true,
      message: 'Interest area removed successfully! 🗑️',
      severity: 'success'
    });
  };

  const handleInterestChange = (interestId, field, value) => {
    setEditData(prev => ({
      ...prev,
      interestAreas: prev.interestAreas.map(interest =>
        interest.id === interestId ? { ...interest, [field]: value } : interest
      )
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box className="profile-container">
        <Box className="profile-header">
          <Skeleton variant="text" width="40%" height={60} />
          <Skeleton variant="text" width="60%" height={30} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className="profile-card">
              <CardContent>
                <Box className="profile-picture-section">
                  <Skeleton variant="circular" width={120} height={120} />
                  <Skeleton variant="text" width="80%" height={40} />
                  <Skeleton variant="text" width="60%" height={20} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card className="profile-content-card">
              <CardContent>
                <Skeleton variant="rectangular" width="100%" height={400} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box className="profile-container">
      {/* Two-column layout: Profile Card (left) and Profile Content Card (right) */}
      <Box className="profile-main-row">
        {/* Profile Card (left) */}
        <Box>
          <Card className="profile-card">
            <CardContent className="profile-picture-section">
              <Box className="profile-picture-container">
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  badgeContent={
                    <Tooltip title="Verified Student">
                      <Verified className="verified-badge" />
                    </Tooltip>
                  }
                >
                  <Avatar
                    src={studentData.personalInfo?.profilePicture || ''}
                    alt={studentData.personalInfo?.name || ''}
                    className="profile-picture"
                  >
                    <Person fontSize="large" />
                  </Avatar>
                </Badge>
                {isEditing && (
                  <IconButton className="camera-btn">
                    <CameraAlt />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h5" className="student-name">
                {isEditing ? editData.personalInfo?.name : studentData.personalInfo?.name}
              </Typography>
              <Typography variant="body2" className="student-grade">
                <Grade className="info-icon" />
                {isEditing ? editData.academicInfo?.grade : studentData.academicInfo?.grade}
              </Typography>
              <Typography variant="body2" className="student-school">
                <School className="info-icon" />
                {isEditing ? editData.academicInfo?.school : studentData.academicInfo?.school}
              </Typography>
              {/* Bio Section */}
              <Box className="bio-section">
                <Typography variant="body2" className="bio-text">
                  {studentData.personalInfo?.bio || 'No bio available'}
                </Typography>
              </Box>
              {/* Learning Stats */}
              <Box className="stats-section">
                <Typography variant="h6" className="stats-title">
                  Learning Stats
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box className="profile-stat-item">
                      <Typography variant="h6" className="profile-stat-number">
                        {studentData.learningStats?.coursesCompleted || 0}
                      </Typography>
                      <Typography variant="caption" className="profile-stat-label">
                        Courses
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className="profile-stat-item">
                      <Typography variant="h6" className="profile-stat-number">
                        {studentData.learningStats?.hoursLearned || 0}
                      </Typography>
                      <Typography variant="caption" className="profile-stat-label">
                        Hours
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box className="profile-stat-item">
                      <Typography variant="h6" className="profile-stat-number">
                        {studentData.learningStats?.streakDays || 0}
                      </Typography>
                      <Typography variant="caption" className="profile-stat-label">
                        Streak
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Profile Content Card (right) */}
        <Box style={{ flex: 1 }}>
          <Card className="profile-content-card">
            <CardContent>
              {/* Subtitle and Edit Profile Button Row */}
              <Box display="flex" alignItems="baseline" mb={3}>
                <Typography variant="h6" className="profile-subtitle" sx={{ mb: 0, mr: 1.5 }}>
                  Manage your personal information and academic journey
                </Typography>
                <Box className="action-buttons">
                  {!isEditing ? (
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={handleEdit}
                      className="edit-btn"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box className="edit-actions">
                      <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSave}
                        className="save-btn"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        className="cancel-btn"
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
              {/* Enhanced Tabs */}
              <Box className="profile-tabs">
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  className="tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab 
                    icon={<Person />} 
                    label="Personal" 
                    className="tab-item"
                  />
                  <Tab 
                    icon={<School />} 
                    label="Academic" 
                    className="tab-item"
                  />
                  <Tab 
                    icon={<Psychology />} 
                    label="Interests" 
                    className="tab-item"
                  />
                  <Tab 
                    icon={<EmojiEvents />} 
                    label="Achievements" 
                    className="tab-item"
                  />
                </Tabs>
              </Box>
              {/* Enhanced Tab Content */}
              <Box className="tab-content">
                {/* Personal Information Tab */}
                {activeTab === 0 && (
                  <Fade in={activeTab === 0}>
                    <Box>
                      <Typography variant="h6" className="section-title">
                        Personal Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={isEditing ? editData.personalInfo?.name : studentData.personalInfo?.name}
                            onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={isEditing ? editData.personalInfo?.email : studentData.personalInfo?.email}
                            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            value={isEditing ? editData.personalInfo?.phone : studentData.personalInfo?.phone}
                            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Date of Birth"
                            type="date"
                            value={isEditing ? editData.personalInfo?.dateOfBirth : studentData.personalInfo?.dateOfBirth}
                            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                            disabled={!isEditing}
                            InputLabelProps={{ shrink: true }}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth disabled={!isEditing} className="profile-field">
                            <InputLabel shrink>Gender</InputLabel>
                            <Select
                              value={isEditing ? editData.personalInfo?.gender : studentData.personalInfo?.gender}
                              onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                              label="Gender"
                            >
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Bio"
                            multiline
                            rows={2}                          
                            value={isEditing ? editData.personalInfo?.bio : studentData.personalInfo?.bio}
                            onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                            placeholder="Tell us about yourself..."
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Address"
                            multiline
                            rows={2}
                            value={isEditing ? editData.personalInfo?.address : studentData.personalInfo?.address}
                            onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Fade>
                )}

                {/* Academic Information Tab */}
                {activeTab === 1 && (
                  <Fade in={activeTab === 1}>
                    <Box>
                      <Typography variant="h6" className="section-title">
                        Academic Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Grade Level"
                            value={isEditing ? editData.academicInfo?.grade : studentData.academicInfo?.grade}
                            onChange={(e) => handleInputChange('academicInfo', 'grade', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="School Name"
                            value={isEditing ? editData.academicInfo?.school : studentData.academicInfo?.school}
                            onChange={(e) => handleInputChange('academicInfo', 'school', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Roll Number"
                            value={isEditing ? editData.academicInfo?.rollNumber : studentData.academicInfo?.rollNumber}
                            onChange={(e) => handleInputChange('academicInfo', 'rollNumber', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Current GPA"
                            type="number"
                            inputProps={{ min: 0, max: 10, step: 0.1 }}
                            value={isEditing ? editData.academicInfo?.currentGPA : studentData.academicInfo?.currentGPA}
                            onChange={(e) => handleInputChange('academicInfo', 'currentGPA', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" className="section-subtitle">
                            Current Subjects
                          </Typography>
                          <Box className="subjects-container">
                            {(isEditing ? editData.academicInfo?.subjects : studentData.academicInfo?.subjects)?.map((subject, index) => (
                              <Chip
                                key={index}
                                label={subject}
                                className="subject-chip"
                                color="primary"
                                variant="outlined"
                                icon={<MenuBook />}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Fade>
                )}

                {/* Enhanced Interest Areas Tab */}
                {activeTab === 2 && (
                  <Fade in={activeTab === 2}>
                    <Box className="interests-section">
                      <Box className="interests-header">
                        <Typography variant="h6" className="section-title">
                          Interest Areas & Skills
                        </Typography>
                        {isEditing && (
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setShowInterestDialog(true)}
                            className="add-interest-btn"
                          >
                            Add Interest
                          </Button>
                        )}
                      </Box>

                      {editData.interestAreas?.length === 0 ? (
                        <Box className="empty-interests">
                          <Psychology className="empty-icon" />
                          <Typography className="empty-text">
                            No interest areas added yet
                          </Typography>
                          <Typography className="empty-subtext">
                            Add your areas of interest to get personalized recommendations
                          </Typography>
                        </Box>
                      ) : (
                        <Grid container spacing={3}>
                          {editData.interestAreas?.map((interest, idx) => (
                            <Grid item xs={12} key={interest.id}>
                              <Card className="interest-card">
                                <CardContent>
                                  <Box className="interest-header">
                                    <Box className="interest-info">
                                      <Typography variant="h6" className="interest-name">
                                        {interest.name}
                                      </Typography>
                                      <Chip
                                        label={interest.level}
                                        size="small"
                                        className={`level-chip level-${interest.level.toLowerCase()}`}
                                        icon={<TrendingUp />}
                                      />
                                    </Box>
                                    {isEditing && (
                                      <IconButton 
                                        onClick={() => handleRemoveInterest(interest.id)}
                                        className="remove-interest-btn"
                                      >
                                        <Delete />
                                      </IconButton>
                                    )}
                                  </Box>
                                  
                                  {isEditing && (
                                    <Box className="interest-controls">
                                      <FormControl size="small" className="level-select">
                                        <InputLabel>Level</InputLabel>
                                        <Select
                                          value={interest.level}
                                          onChange={(e) => handleInterestChange(interest.id, 'level', e.target.value)}
                                          label="Level"
                                        >
                                          <MenuItem value="Beginner">Beginner</MenuItem>
                                          <MenuItem value="Intermediate">Intermediate</MenuItem>
                                          <MenuItem value="Advanced">Advanced</MenuItem>
                                        </Select>
                                      </FormControl>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Description"
                                        value={interest.description}
                                        onChange={(e) => handleInterestChange(interest.id, 'description', e.target.value)}
                                        className="interest-description"
                                      />
                                    </Box>
                                  )}
                                  
                                  {interest.description && !isEditing && (
                                    <Typography className="interest-description-text">
                                      {interest.description}
                                    </Typography>
                                  )}
                                  
                                  {/* Progress Bar */}
                                  <Box className="interest-progress">
                                    <Typography variant="caption" className="progress-label">
                                      Progress: {interest.progress || 0}%
                                    </Typography>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={interest.progress || 0} 
                                      className="progress-bar"
                                    />
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  </Fade>
                )}

                {/* New Achievements Tab */}
                {activeTab === 3 && (
                  <Fade in={activeTab === 3}>
                    <Box className="achievements-section">
                      <Typography variant="h6" className="section-title">
                        Achievements & Badges
                      </Typography>
                      
                      {/* Achievements Accordion */}
                      <Accordion className="achievement-accordion">
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <EmojiEvents className="achievement-icon" />
                          <Typography variant="h6">Academic Achievements</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Your academic achievements will appear here once you complete courses and earn certificates.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>

                      <Accordion className="achievement-accordion">
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Star className="achievement-icon" />
                          <Typography variant="h6">Skill Badges</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Earn badges by demonstrating proficiency in different subjects and skills.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </Fade>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Enhanced Add Interest Dialog */}
      <Dialog 
        open={showInterestDialog} 
        onClose={() => setShowInterestDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box className="dialog-title">
            <Psychology className="dialog-icon" />
            Add New Interest Area
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Interest Area"
            fullWidth
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="e.g., Mathematics, Science, Art..."
            className="dialog-field"
          />
          <Typography variant="caption" className="dialog-help-text">
            Choose from common interest areas or add your own custom interest
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInterestDialog(false)}>Cancel</Button>
          <Button onClick={handleAddInterest} variant="contained">
            Add Interest
          </Button>
        </DialogActions>
      </Dialog>

      {/* Enhanced Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
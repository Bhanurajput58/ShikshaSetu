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
  OutlinedInput
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
  BookOpen,
  Star
} from '@mui/icons-material';
import './StudentProfile.css';

const INTEREST_AREAS = [
  'Mathematics',
  'Science',
  'English Literature',
  'History',
  'Geography',
  'Computer Science',
  'Art & Design',
  'Music',
  'Physical Education',
  'Languages',
  'Economics',
  'Psychology',
  'Engineering',
  'Medicine',
  'Business',
  'Environmental Science',
  'Philosophy',
  'Political Science'
];

// Grade levels
const GRADE_LEVELS = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12'
];

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [studentData, setStudentData] = useState({
    personalInfo: {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 98765 43210',
      dateOfBirth: '2005-03-15',
      gender: 'Male',
      address: '123 Education Street, Mumbai, Maharashtra',
      profilePicture: null
    },
    academicInfo: {
      grade: 'Class 10',
      school: 'Delhi Public School',
      rollNumber: 'DPS2024001',
      admissionDate: '2020-06-01',
      currentGPA: '8.5',
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi']
    },
    interestAreas: [
      { id: 1, name: 'Mathematics', level: 'Advanced', description: 'Love solving complex problems' },
      { id: 2, name: 'Computer Science', level: 'Intermediate', description: 'Interested in programming' },
      { id: 3, name: 'Science', level: 'Advanced', description: 'Fascinated by physics and chemistry' }
    ],
    achievements: [
      { id: 1, title: 'Mathematics Olympiad Winner', year: '2023', description: 'Secured 1st place in district level' },
      { id: 2, title: 'Science Fair Project Award', year: '2022', description: 'Best project in school science fair' }
    ]
  });

  const [editData, setEditData] = useState({});

  useEffect(() => {
    setEditData(JSON.parse(JSON.stringify(studentData)));
  }, [studentData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setStudentData(editData);
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success'
    });
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
          message: 'This interest area already exists!',
          severity: 'warning'
        });
        return;
      }

      const newInterestObj = {
        id: Date.now(),
        name: newInterest,
        level: 'Beginner',
        description: ''
      };

      setEditData(prev => ({
        ...prev,
        interestAreas: [...prev.interestAreas, newInterestObj]
      }));

      setNewInterest('');
      setShowInterestDialog(false);
      setSnackbar({
        open: true,
        message: 'Interest area added successfully!',
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
      message: 'Interest area removed successfully!',
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

  return (
    <Box className="profile-container">
      {/* Header */}
      <Box className="profile-header">
        <Typography variant="h3" className="profile-title">
          Student Profile
        </Typography>
        <Typography variant="h6" className="profile-subtitle">
          Manage your personal information and academic interests
        </Typography>
      </Box>

      {/* Profile Content */}
      <Grid container spacing={4}>
        {/* Profile Picture and Basic Info */}
        <Grid item xs={12} md={4}>
          <Card className="profile-card">
            <CardContent className="profile-picture-section">
              <Box className="profile-picture-container">
                <Avatar
                  src={studentData.personalInfo.profilePicture}
                  alt={studentData.personalInfo.name}
                  className="profile-picture"
                >
                  <Person fontSize="large" />
                </Avatar>
                {isEditing && (
                  <Button
                    variant="outlined"
                    size="small"
                    className="change-photo-btn"
                  >
                    Change Photo
                  </Button>
                )}
              </Box>
              
              <Typography variant="h5" className="student-name">
                {isEditing ? editData.personalInfo.name : studentData.personalInfo.name}
              </Typography>
              
              <Typography variant="body2" className="student-grade">
                {isEditing ? editData.academicInfo.grade : studentData.academicInfo.grade}
              </Typography>
              
              <Typography variant="body2" className="student-school">
                {isEditing ? editData.academicInfo.school : studentData.academicInfo.school}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Profile Content */}
        <Grid item xs={12} md={8}>
          <Card className="profile-content-card">
            <CardContent>
              {/* Edit/Save Buttons */}
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

              {/* Tabs */}
              <Box className="profile-tabs">
                <Tabs value={activeTab} onChange={handleTabChange} className="tabs">
                  <Tab 
                    icon={<Person />} 
                    label="Personal Info" 
                    className="tab-item"
                  />
                  <Tab 
                    icon={<School />} 
                    label="Academic Info" 
                    className="tab-item"
                  />
                  <Tab 
                    icon={<Interests />} 
                    label="Interest Areas" 
                    className="tab-item"
                  />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box className="tab-content">
                {/* Personal Information Tab */}
                {activeTab === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={isEditing ? editData.personalInfo.name : studentData.personalInfo.name}
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
                        value={isEditing ? editData.personalInfo.email : studentData.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                        disabled={!isEditing}
                        className="profile-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={isEditing ? editData.personalInfo.phone : studentData.personalInfo.phone}
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
                        value={isEditing ? editData.personalInfo.dateOfBirth : studentData.personalInfo.dateOfBirth}
                        onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                        className="profile-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth disabled={!isEditing} className="profile-field">
                        <InputLabel>Gender</InputLabel>
                        <Select
                          value={isEditing ? editData.personalInfo.gender : studentData.personalInfo.gender}
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
                        label="Address"
                        multiline
                        rows={3}
                        value={isEditing ? editData.personalInfo.address : studentData.personalInfo.address}
                        onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                        disabled={!isEditing}
                        className="profile-field"
                      />
                    </Grid>
                  </Grid>
                )}

                {/* Academic Information Tab */}
                {activeTab === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth disabled={!isEditing} className="profile-field">
                        <InputLabel>Grade Level</InputLabel>
                        <Select
                          value={isEditing ? editData.academicInfo.grade : studentData.academicInfo.grade}
                          onChange={(e) => handleInputChange('academicInfo', 'grade', e.target.value)}
                          label="Grade Level"
                        >
                          {GRADE_LEVELS.map((grade) => (
                            <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="School Name"
                        value={isEditing ? editData.academicInfo.school : studentData.academicInfo.school}
                        onChange={(e) => handleInputChange('academicInfo', 'school', e.target.value)}
                        disabled={!isEditing}
                        className="profile-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Roll Number"
                        value={isEditing ? editData.academicInfo.rollNumber : studentData.academicInfo.rollNumber}
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
                        value={isEditing ? editData.academicInfo.currentGPA : studentData.academicInfo.currentGPA}
                        onChange={(e) => handleInputChange('academicInfo', 'currentGPA', e.target.value)}
                        disabled={!isEditing}
                        className="profile-field"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" className="section-subtitle">
                        Current Subjects
                      </Typography>
                      <Box className="subjects-container">
                        {(isEditing ? editData.academicInfo.subjects : studentData.academicInfo.subjects).map((subject, index) => (
                          <Chip
                            key={index}
                            label={subject}
                            className="subject-chip"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                )}

                {/* Interest Areas Tab */}
                {activeTab === 2 && (
                  <Box className="interests-section">
                    <Box className="interests-header">
                      <Typography variant="h6" className="section-subtitle">
                        Your Interest Areas
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

                    {editData.interestAreas.length === 0 ? (
                      <Box className="empty-interests">
                        <Interests className="empty-icon" />
                        <Typography className="empty-text">
                          No interest areas added yet
                        </Typography>
                        <Typography className="empty-subtext">
                          Add your areas of interest to get personalized recommendations
                        </Typography>
                      </Box>
                    ) : (
                      <List className="interests-list">
                        {editData.interestAreas.map((interest) => (
                          <ListItem key={interest.id} className="interest-item">
                            <ListItemText
                              primary={
                                <Box className="interest-header">
                                  <Typography className="interest-name">
                                    {interest.name}
                                  </Typography>
                                  {isEditing ? (
                                    <FormControl size="small" className="level-select">
                                      <Select
                                        value={interest.level}
                                        onChange={(e) => handleInterestChange(interest.id, 'level', e.target.value)}
                                        displayEmpty
                                      >
                                        <MenuItem value="Beginner">Beginner</MenuItem>
                                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                                        <MenuItem value="Advanced">Advanced</MenuItem>
                                      </Select>
                                    </FormControl>
                                  ) : (
                                    <Chip
                                      label={interest.level}
                                      size="small"
                                      className={`level-chip level-${interest.level.toLowerCase()}`}
                                    />
                                  )}
                                </Box>
                              }
                              secondary={
                                isEditing ? (
                                  <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Add description (optional)"
                                    value={interest.description}
                                    onChange={(e) => handleInterestChange(interest.id, 'description', e.target.value)}
                                    className="interest-description"
                                  />
                                ) : (
                                  interest.description && (
                                    <Typography className="interest-description-text">
                                      {interest.description}
                                    </Typography>
                                  )
                                )
                              }
                            />
                            {isEditing && (
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  onClick={() => handleRemoveInterest(interest.id)}
                                  className="remove-interest-btn"
                                >
                                  <Delete />
                                </IconButton>
                              </ListItemSecondaryAction>
                            )}
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Interest Dialog */}
      <Dialog open={showInterestDialog} onClose={() => setShowInterestDialog(false)}>
        <DialogTitle>Add New Interest Area</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Interest Area"
            fullWidth
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="e.g., Mathematics, Science, Art..."
          />
          <Typography variant="caption" className="dialog-help-text">
            Choose from common interest areas or add your own
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInterestDialog(false)}>Cancel</Button>
          <Button onClick={handleAddInterest} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 
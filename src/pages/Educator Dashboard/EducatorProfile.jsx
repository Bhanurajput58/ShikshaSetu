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
  Snackbar,
  Alert,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Grade,
  MenuBook,
  Star,
  ExpandMore,
  EmojiEvents,
  BookmarkBorder,
  Timeline,
  CameraAlt,
  Verified,
  Psychology,
  AutoAwesome
} from '@mui/icons-material';
import '../StudentDashboard/StudentProfile.css';
import { useAuth } from '../../contexts/AuthContext';

export default function EducatorProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [educatorData, setEducatorData] = useState({
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
      highestQualification: '',
      institution: '',
      graduationYear: '',
      specialization: '',
      teachingExperience: '',
      subjects: [],
      certifications: []
    },
    professionalInfo: {
      currentPosition: '',
      school: '',
      department: '',
      joiningDate: '',
      achievements: [],
      skills: []
    }
  });

  const [editData, setEditData] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch('/api/educator/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setEducatorData(data);
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
    setEditData(JSON.parse(JSON.stringify(educatorData)));
  }, [educatorData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setEducatorData(editData);
    setIsEditing(false);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/educator/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editData)
      });
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error saving profile', severity: 'error' });
      console.error('Error saving profile:', err);
    }
  };

  const handleCancel = () => {
    setEditData(JSON.parse(JSON.stringify(educatorData)));
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

  const handleArrayChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value.split(',').map(item => item.trim())
      }
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('personalInfo', 'profilePicture', e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
                    <Tooltip title="Verified Educator">
                      <Verified className="verified-badge" />
                    </Tooltip>
                  }
                >
                  <Avatar
                    src={educatorData.personalInfo?.profilePicture || ''}
                    alt={educatorData.personalInfo?.name || ''}
                    className="profile-picture"
                  >
                    <Person fontSize="large" />
                  </Avatar>
                </Badge>
                {isEditing && (
                  <IconButton className="camera-btn" component="label">
                    <CameraAlt />
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h5" className="student-name">
                {isEditing ? editData.personalInfo?.name : educatorData.personalInfo?.name}
              </Typography>
              <Typography variant="body2" className="student-grade">
                <Grade className="info-icon" />
                {isEditing ? editData.academicInfo?.highestQualification : educatorData.academicInfo?.highestQualification}
              </Typography>
              <Typography variant="body2" className="student-school">
                <School className="info-icon" />
                {isEditing ? editData.academicInfo?.institution : educatorData.academicInfo?.institution}
              </Typography>
              {/* Bio Section */}
              <Box className="bio-section">
                <Typography variant="body2" className="bio-text">
                  {educatorData.personalInfo?.bio || 'No bio available'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Profile Content Card (right) */}
        <Box style={{ flex: 1 }}>
          <Card className="profile-content-card">
            <CardContent>
              <Box display="flex" alignItems="baseline" mb={3}>
                <Typography variant="h6" className="profile-subtitle" sx={{ mb: 0, mr: 1.5 }}>
                  Manage your personal and professional information
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
                    icon={<Timeline />} 
                    label="Professional" 
                    className="tab-item"
                  />
                  <Tab 
                    icon={<EmojiEvents />} 
                    label="Achievements" 
                    className="tab-item"
                  />
                </Tabs>
              </Box>
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
                            value={isEditing ? editData.personalInfo?.name : educatorData.personalInfo?.name}
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
                            value={isEditing ? editData.personalInfo?.email : educatorData.personalInfo?.email}
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
                            value={isEditing ? editData.personalInfo?.phone : educatorData.personalInfo?.phone}
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
                            value={isEditing ? editData.personalInfo?.dateOfBirth : educatorData.personalInfo?.dateOfBirth}
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
                              value={isEditing ? editData.personalInfo?.gender : educatorData.personalInfo?.gender}
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
                            value={isEditing ? editData.personalInfo?.bio : educatorData.personalInfo?.bio}
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
                            value={isEditing ? editData.personalInfo?.address : educatorData.personalInfo?.address}
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
                            label="Highest Qualification"
                            value={isEditing ? editData.academicInfo?.highestQualification : educatorData.academicInfo?.highestQualification}
                            onChange={(e) => handleInputChange('academicInfo', 'highestQualification', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Institution"
                            value={isEditing ? editData.academicInfo?.institution : educatorData.academicInfo?.institution}
                            onChange={(e) => handleInputChange('academicInfo', 'institution', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Graduation Year"
                            value={isEditing ? editData.academicInfo?.graduationYear : educatorData.academicInfo?.graduationYear}
                            onChange={(e) => handleInputChange('academicInfo', 'graduationYear', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Specialization"
                            value={isEditing ? editData.academicInfo?.specialization : educatorData.academicInfo?.specialization}
                            onChange={(e) => handleInputChange('academicInfo', 'specialization', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Teaching Experience"
                            value={isEditing ? editData.academicInfo?.teachingExperience : educatorData.academicInfo?.teachingExperience}
                            onChange={(e) => handleInputChange('academicInfo', 'teachingExperience', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Subjects Taught (comma-separated)"
                            value={isEditing ? editData.academicInfo?.subjects?.join(', ') : educatorData.academicInfo?.subjects?.join(', ')}
                            onChange={(e) => handleArrayChange('academicInfo', 'subjects', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                            placeholder="Mathematics, Physics, Statistics"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Certifications (one per line)"
                            multiline
                            rows={3}
                            value={isEditing ? editData.academicInfo?.certifications?.join('\n') : educatorData.academicInfo?.certifications?.join('\n')}
                            onChange={(e) => handleInputChange('academicInfo', 'certifications', e.target.value.split('\n').filter(item => item.trim()))}
                            disabled={!isEditing}
                            className="profile-field"
                            placeholder="Enter each certification on a new line"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Fade>
                )}
                {/* Professional Information Tab */}
                {activeTab === 2 && (
                  <Fade in={activeTab === 2}>
                    <Box>
                      <Typography variant="h6" className="section-title">
                        Professional Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Current Position"
                            value={isEditing ? editData.professionalInfo?.currentPosition : educatorData.professionalInfo?.currentPosition}
                            onChange={(e) => handleInputChange('professionalInfo', 'currentPosition', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="School/Institution"
                            value={isEditing ? editData.professionalInfo?.school : educatorData.professionalInfo?.school}
                            onChange={(e) => handleInputChange('professionalInfo', 'school', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Department"
                            value={isEditing ? editData.professionalInfo?.department : educatorData.professionalInfo?.department}
                            onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Joining Date"
                            type="date"
                            value={isEditing ? editData.professionalInfo?.joiningDate : educatorData.professionalInfo?.joiningDate}
                            onChange={(e) => handleInputChange('professionalInfo', 'joiningDate', e.target.value)}
                            disabled={!isEditing}
                            InputLabelProps={{ shrink: true }}
                            className="profile-field"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Skills (comma-separated)"
                            value={isEditing ? editData.professionalInfo?.skills?.join(', ') : educatorData.professionalInfo?.skills?.join(', ')}
                            onChange={(e) => handleArrayChange('professionalInfo', 'skills', e.target.value)}
                            disabled={!isEditing}
                            className="profile-field"
                            placeholder="Advanced Mathematics, Curriculum Development, Student Assessment"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Achievements (one per line)"
                            multiline
                            rows={3}
                            value={isEditing ? editData.professionalInfo?.achievements?.join('\n') : educatorData.professionalInfo?.achievements?.join('\n')}
                            onChange={(e) => handleInputChange('professionalInfo', 'achievements', e.target.value.split('\n').filter(item => item.trim()))}
                            disabled={!isEditing}
                            className="profile-field"
                            placeholder="Enter each achievement on a new line"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Fade>
                )}
                {/* Achievements Tab */}
                {activeTab === 3 && (
                  <Fade in={activeTab === 3}>
                    <Box className="achievements-section">
                      <Typography variant="h6" className="section-title">
                        Achievements & Badges
                      </Typography>
                      <Accordion className="achievement-accordion">
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <EmojiEvents className="achievement-icon" />
                          <Typography variant="h6">Professional Achievements</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Your professional achievements will appear here once you add them to your profile.
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
      {/* Snackbar */}
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
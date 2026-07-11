import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Tabs, 
  Tab, 
  Alert, 
  CircularProgress, 
  Grid,
  LinearProgress,
  FormControlLabel,
  Checkbox,
  InputAdornment
} from '@mui/material';
import { 
  School, 
  Person, 
  VolunteerActivism, 
  Google, 
  Facebook, 
  GitHub,
  ErrorOutline as ErrorIcon,
  CheckCircleOutline as CheckIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const roles = [
  { 
    label: 'Student', 
    value: 'student', 
    icon: <School />,
    color: '#4CAF50',
    fields: ['Full Name', 'Email', 'Password', 'Confirm Password', 'School/College'] 
  },
  { 
    label: 'Educator', 
    value: 'educator', 
    icon: <Person />,
    color: '#2196F3',
    fields: ['Full Name', 'Email', 'Password', 'Confirm Password', 'Institution', 'Expertise'] 
  },
  { 
    label: 'Volunteer', 
    value: 'volunteer', 
    icon: <VolunteerActivism />,
    color: '#FF9800',
    fields: ['Full Name', 'Email', 'Password', 'Confirm Password', 'Area of Interest'] 
  },
];

export default function Register() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleTab = (e, v) => { 
    setTab(v); 
    setForm({}); 
    setError('');
    setSuccess('');
    setFieldErrors({});
  };

  const validateField = (name, value) => {
    const errors = {};
    
    switch(name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
        break;
      case 'confirmpassword':
        if (value !== form.password) {
          errors.confirmpassword = 'Passwords do not match';
        }
        break;
      case 'fullname':
        if (value.length < 2) {
          errors.fullname = 'Name must be at least 2 characters';
        }
        break;
      default:
        if (!value.trim()) {
          errors[name] = 'This field is required';
        }
    }
    
    return errors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Real-time validation
    const errors = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, ...errors }));
    
    // Clear error if field is now valid
    if (!errors[name] && fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const getFormProgress = () => {
    const currentRole = roles[tab];
    const totalFields = currentRole.fields.length;
    const filledFields = currentRole.fields.filter(field => {
      const fieldName = field.replace(/\s+/g, '').toLowerCase();
      return form[fieldName] && form[fieldName].trim() !== '';
    }).length;
    
    return totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      const currentRole = roles[tab];
      const requiredFields = currentRole.fields.map(field => 
        field.replace(/\s+/g, '').toLowerCase()
      );

      let hasErrors = false;
      const newErrors = {};

      for (const field of requiredFields) {
        if (!form[field] || form[field].trim() === '') {
          newErrors[field] = 'This field is required';
          hasErrors = true;
        } else {
          const fieldErrors = validateField(field, form[field]);
          if (Object.keys(fieldErrors).length > 0) {
            Object.assign(newErrors, fieldErrors);
            hasErrors = true;
          }
        }
      }

      if (hasErrors) {
        setFieldErrors(newErrors);
        throw new Error('Please fix the errors in the form');
      }

      // Validate password confirmation
      if (form.password !== form.confirmpassword) {
        throw new Error('Passwords do not match');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check terms agreement
      if (!agreedToTerms) {
        throw new Error('Please agree to the Terms of Service and Privacy Policy');
      }

      // Prepare data for backend
      const registrationData = {
        name: form.fullname,
        email: form.email,
        password: form.password,
        role: currentRole.value,
        additionalInfo: {
          schoolCollege: form.schoolcollege,
          institution: form.institution,
          expertise: form.expertise,
          areaOfInterest: form.areaofinterest
        }
      };

      // Make API call to backend
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`);
    // You can integrate with Firebase Auth, Auth0, or other providers
  };

  const getFieldIcon = (fieldName, value) => {
    if (!value) return null;
    
    const errors = validateField(fieldName, value);
    if (Object.keys(errors).length > 0) {
      return <ErrorIcon color="error" />;
    } else {
      return null; // Don't show success icon
    }
  };

  return (
    <div className="register-container">
      <Container maxWidth={false} className="register-container-container">
        <Grid container spacing={0} className="register-grid">
          {/* Left side - Image */}
          <Grid item xs={12} md={6} className="register-grid-item">
            <Box className="register-illustration-container">
              <img 
                src="/assets/images/login.png" 
                alt="Register" 
                className="register-illustration"
              />
              <Typography 
                variant="h4" 
                className="register-illustration-title"
              >
                Join ShikshaSetu!
              </Typography>
              <Typography 
                variant="body1" 
                className="register-illustration-subtitle"
              >
                Start your educational journey with our community-driven platform
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Register form */}
          <Grid item xs={12} md={6} className="register-grid-item">
            <div className="register-form-container">
              <Paper className="register-form-paper">
                <Typography className="register-title">
                Create Your Account
                </Typography>
                
                {error && (
                  <Alert severity="error" className="register-alert">
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert severity="success" className="register-alert">
                    {success}
                  </Alert>
                )}

                <Tabs value={tab} onChange={handleTab} variant="fullWidth" className="register-tabs">
                  {roles.map((role, i) => (
                    <Tab 
                      key={role.label} 
                      label={role.label} 
                      icon={role.icon}
                      iconPosition="start"
                      sx={{ 
                        color: tab === i ? role.color : 'inherit',
                        '&.Mui-selected': {
                          color: role.color
                        }
                      }}
                    />
                  ))}
                </Tabs>

                {/* Progress Indicator */}
                <Box className="register-progress-container">
                  <LinearProgress 
                    variant="determinate" 
                    value={getFormProgress()} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: roles[tab].color,
                        borderRadius: 4,
                      }
                    }}
                  />
                  <Typography variant="caption" className="register-progress-text">
                    {Math.round(getFormProgress())}% Complete
                  </Typography>
                </Box>
                
                <Box component="form" onSubmit={handleSubmit}>
                  {roles[tab].fields.map(field => {
                    const fieldName = field.replace(/\s+/g, '').toLowerCase();
                    const fieldValue = form[fieldName] || '';
                    
                    return (
                      <TextField
                        key={field}
                        fullWidth
                        label={field}
                        name={fieldName}
                        margin="normal"
                        required
                        type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                        value={fieldValue}
                        onChange={handleChange}
                        disabled={loading}
                        className="register-text-field"
                        error={!!fieldErrors[fieldName]}
                        helperText={fieldErrors[fieldName]}
                        InputProps={{
                          endAdornment: fieldValue && getFieldIcon(fieldName, fieldValue) ? (
                            <InputAdornment position="end">
                              {getFieldIcon(fieldName, fieldValue)}
                            </InputAdornment>
                          ) : undefined
                        }}
                      />
                    );
                  })}

                  {/* Terms and Conditions */}
                  <FormControlLabel
                    className="register-terms-checkbox"
                    control={
                      <Checkbox
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        I agree to the{' '}
                        <a href="/terms" target="_blank" rel="noopener noreferrer">
                          Terms of Service
                        </a>
                        {' '}and{' '}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer">
                          Privacy Policy
                        </a>
                      </Typography>
                    }
                  />

                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large"
                    className="register-button"
                    disabled={loading || !agreedToTerms}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </Box>

                {/* Social Login */}
                <Box className="register-social-divider">
                  <span>Or continue with</span>
                </Box>

                <Box className="register-social-buttons">
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Google />}
                    onClick={() => handleSocialLogin('google')}
                    className="register-social-button"
                    disabled={loading}
                  >
                    Google
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Facebook />}
                    onClick={() => handleSocialLogin('facebook')}
                    className="register-social-button"
                    disabled={loading}
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GitHub />}
                    onClick={() => handleSocialLogin('github')}
                    className="register-social-button"
                    disabled={loading}
                  >
                    GitHub
                  </Button>
                </Box>
                
                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <a href="/login" className="register-login-link">
                      Sign in
                    </a>
                  </Typography>
                </Box>
              </Paper>
            </div>
          </Grid>
        </Grid>

        {/* Mobile image */}
        <Box className="register-mobile-image-container">
          <img 
            src="/assets/images/login.png" 
            alt="Register" 
            className="register-mobile-image"
          />
        </Box>
      </Container>
    </div>
  );
}
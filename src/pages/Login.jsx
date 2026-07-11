import { Container, Typography, Box, TextField, Button, Paper, Tabs, Tab, Alert, CircularProgress, Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Define role mapping for each tab
  const roleMapping = ['student', 'educator', 'volunteer'];

  const handleTab = (e, v) => { 
    setTab(v); 
    setForm({});
    setError('');
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!form.email || !form.password) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Get the expected role for the selected tab
      const expectedRole = roleMapping[tab];

      // Make API call to backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Check if the user's role matches the selected tab
      if (data.user.role !== expectedRole) {
        throw new Error('Invalid user credentials');
      }

      // Use AuthContext to login
      login(data.user, data.token);

      // Redirect based on user role
      switch (data.user.role) {
        case 'student':
          navigate('/student-dashboard');
          break;
        case 'educator':
          navigate('/educator-dashboard');
          break;
        case 'volunteer':
          navigate('/volunteer-dashboard');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container maxWidth={false} sx={{ padding: 0, margin: 0, width: '100%', height: 'calc(100vh - 78px)' }}>
        <Grid container spacing={0} className="login-grid" sx={{ height: 'calc(100vh - 78px)' }}>
          {/* Left side - Image */}
          <Grid item xs={12} md={7.2} sx={{ width: '60%', flex: '0 0 60%', height: 'calc(100vh - 78px)' }}>
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'calc(100vh - 78px)',
              width: '100%',
              maxHeight: 'calc(100vh - 78px)',
              overflow: 'hidden'
            }}>
              <img 
                src="/assets/images/login.png" 
                alt="Login" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'contain'
                }}
              />
              <Typography 
                variant="h4" 
                sx={{ 
                  mt: 3, 
                  fontWeight: 700,
                  color: '#1e3a8a',
                  textAlign: 'center'
                }}
              >
                Welcome Back!
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 1, 
                  color: '#64748b',
                  textAlign: 'center',
                  maxWidth: '300px'
                }}
              >
                Connect, learn, and grow with our educational platform
              </Typography>
            </Box>
          </Grid>

          {/* Right side - Login form */}
          <Grid item xs={12} md={4.8} sx={{ width: '40%', flex: '0 0 40%', height: 'calc(100vh - 78px)' }}>
            <div className="login-form-container">
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  color: '#1e3a8a',
                  textAlign: 'center',
                  mb: 2,
                  fontSize: '1.75rem',
                  width: '100%'
                }}
              >
                Log in to continue your learning journey
              </Typography>
              
              <Paper className="login-form-paper">
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Tabs value={tab} onChange={handleTab} variant="fullWidth" className="login-tabs">
                  <Tab label="Student" />
                  <Tab label="Educator" />
                  <Tab label="Volunteer" />
                </Tabs>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField 
                    fullWidth 
                    label="Email" 
                    name="email"
                    margin="normal" 
                    required 
                    type="email"
                    value={form.email || ''}
                    onChange={handleChange}
                    disabled={loading}
                    className="login-text-field"
                  />
                  <TextField 
                    fullWidth 
                    label="Password" 
                    name="password"
                    margin="normal" 
                    required 
                    type="password"
                    value={form.password || ''}
                    onChange={handleChange}
                    disabled={loading}
                    className="login-text-field"
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large"
                    className="login-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      `Login as ${roleMapping[tab].charAt(0).toUpperCase() + roleMapping[tab].slice(1)}`
                    )}
                  </Button>
                </Box>
                
                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <a href="/register" className="login-register-link">
                      Register
                    </a>
                  </Typography>
                </Box>
              </Paper>
            </div>
          </Grid>
        </Grid>

        {/* Mobile image */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 4, textAlign: 'center' }}>
          <img 
            src="/assets/images/login.png" 
            alt="Login" 
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '300px',
              objectFit: 'contain'
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
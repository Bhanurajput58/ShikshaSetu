import { Container, Typography, Box, TextField, Button, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

export default function Login() {
  const [tab, setTab] = useState(0);
  const handleTab = (e, v) => setTab(v);

  return (
    <Container maxWidth="sm" sx={{ py: 4, px: 2 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <Tabs value={tab} onChange={handleTab} variant="fullWidth" sx={{ mb: 2 }}>
          <Tab label="Student" />
          <Tab label="Educator" />
          <Tab label="Volunteer" />
        </Tabs>
        <Box component="form">
          <TextField fullWidth label="Email" margin="normal" required type="email" />
          <TextField fullWidth label="Password" margin="normal" required type="password" />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>Register</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

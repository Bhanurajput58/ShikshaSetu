import { Container, Typography, Box, TextField, Button, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

const roles = [
  { label: 'Student', fields: ['Full Name', 'Email', 'Password', 'Confirm Password', 'School/College'] },
  { label: 'Educator', fields: ['Full Name', 'Email', 'Password', 'Confirm Password', 'Institution', 'Expertise'] },
  { label: 'Volunteer', fields: ['Full Name', 'Email', 'Password', 'Confirm Password', 'Area of Interest'] },
];

export default function Register() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({});
  const handleTab = (e, v) => { setTab(v); setForm({}); };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="sm" sx={{ py: 4, px: 2 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Register</Typography>
        <Tabs value={tab} onChange={handleTab} variant="fullWidth" sx={{ mb: 2 }}>
          {roles.map((role, i) => <Tab key={role.label} label={role.label} />)}
        </Tabs>
        <Box component="form">
          {roles[tab].fields.map(field => (
            <TextField
              key={field}
              fullWidth
              label={field}
              name={field.replace(/\s+/g, '').toLowerCase()}
              margin="normal"
              required
              type={field.toLowerCase().includes('password') ? 'password' : 'text'}
              value={form[field.replace(/\s+/g, '').toLowerCase()] || ''}
              onChange={handleChange}
            />
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

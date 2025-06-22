import { Container, Typography, Box, TextField, Button, Link as MuiLink } from '@mui/material';
import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setLoading(false);
    setForm({ name: '', email: '', message: '' });
    
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="contact-root">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="hero-content">
          <Typography className="contact-title">
            Get in Touch
          </Typography>
          <Typography className="contact-subtitle">
            Have a question or need support? We're here to help you on your educational journey. 
            Reach out to us through the form below or connect with our community.
          </Typography>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-section">
        <div className="contact-container">
          <Box component="form" onSubmit={handleSubmit} className="contact-form-card">
            <Typography className="form-title">
              Send us a Message
            </Typography>
            <Typography className="form-description">
              Fill out the form below and we'll get back to you as soon as possible. 
              You can also email us directly at <a href="mailto:support@shikshasetu.org">support@shikshasetu.org</a>.
            </Typography>
            
            <div className="form-field">
              <TextField 
                fullWidth 
                label="Name" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                variant="outlined"
              />
            </div>
            
            <div className="form-field">
              <TextField 
                fullWidth 
                label="Email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                type="email" 
                variant="outlined"
              />
            </div>
            
            <div className="form-field">
              <TextField 
                fullWidth 
                label="Message" 
                name="message" 
                value={form.message} 
                onChange={handleChange} 
                required 
                multiline 
                rows={4} 
                variant="outlined"
              />
            </div>
            
            <Button 
              type="submit" 
              variant="contained" 
              className={`submit-button ${loading ? 'loading-button' : ''}`}
              disabled={loading || !form.name || !form.email || !form.message}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
            
            {submitted && (
              <Typography className="success-message">
                Thank you! We will get back to you soon.
              </Typography>
            )}
          </Box>

          {/* Contact Links Section */}
          <div className="contact-links-section">
            <Typography className="contact-links-title">
              Other Ways to Connect
            </Typography>
            <div className="contact-links">
              <a 
                href="https://community.shikshasetu.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link community"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Community Forum
              </a>
              <a 
                href="mailto:support@shikshasetu.org"
                className="contact-link email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

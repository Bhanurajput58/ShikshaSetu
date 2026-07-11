import { Container, Typography, Box, TextField, Button, Link as MuiLink, Paper } from '@mui/material';
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
    
  };

  return (
    <div className="contact-root">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <Typography variant="h1" className="contact-title">
            Get in Touch
          </Typography>
          <Typography variant="h5" className="contact-subtitle">
            Have questions, suggestions, or want to contribute? We'd love to hear from you. 
            Reach out to us and let's build the future of education together.
          </Typography>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-section">
        <Paper elevation={0} className="contact-form-card">
          <Typography variant="h3" className="contact-form-title">
            Send us a Message
          </Typography>
          <Typography variant="body1" className="contact-form-description">
            Fill out the form below and we'll get back to you as soon as possible. 
            You can also join our <a href="https://discord.gg/shikshasetu" target="_blank" rel="noopener noreferrer">Discord community</a> for real-time discussions.
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <div className="contact-form-field">
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
            
            <div className="contact-form-field">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </div>
            
            <div className="contact-form-field">
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </div>
            
            <div className="contact-form-field">
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
              color="primary"
              size="large"
              className={`contact-submit-button ${loading ? 'contact-loading-button' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
          
          {submitted && (
            <div className="contact-success-message">
              <div className="contact-success-icon">✅</div>
              <Typography variant="h6" className="contact-success-text">
                Message sent successfully!
              </Typography>
              <Typography variant="body2" className="contact-success-subtext">
                We'll get back to you within 24 hours.
              </Typography>
            </div>
          )}
        </Paper>

        {/* Contact Links */}
        <Paper elevation={0} className="contact-links-section">
          <Typography variant="h4" className="contact-links-title">
            Other Ways to Connect
          </Typography>
          <div className="contact-links">
            <a 
              href="https://discord.gg/shikshasetu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link community"
            >
              <span>Discord</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </a>
            <a 
              href="mailto:hello@shikshasetu.org" 
              className="contact-link email"
            >
              <span>Email</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <a 
              href="https://github.com/shikshasetu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span>GitHub</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
          </div>
        </Paper>
      </div>
    </div>
  );
}

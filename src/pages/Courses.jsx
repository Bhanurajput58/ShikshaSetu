import { Container, Typography, Box, Grid, Card, CardContent, Chip, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';
import './Courses.css';

const resources = [];

const subjects = ['All'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Courses() {
  const [subject, setSubject] = useState('All');
  const [level, setLevel] = useState('All');

  const filtered = resources.filter(r =>
    (subject === 'All' || r.subject === subject) &&
    (level === 'All' || r.level === level)
  );

  return (
    <div className="courses-root">
      {/* Hero Section */}
      <div className="courses-hero">
        <div className="courses-hero-content">
          <Typography className="courses-title">
            Free Courses & Resources
          </Typography>
          <Typography className="courses-subtitle">
            Access high-quality educational materials designed to help you learn and grow. 
            Filter by subject and level to find the perfect resources for your learning journey.
          </Typography>
        </div>
      </div>

      {/* Filter Section */}
      <div className="courses-filter-section">
        <Typography className="courses-filter-title">
          Find Your Perfect Course
        </Typography>
        <Box className="courses-filter-controls">
          <TextField 
            select 
            label="Subject" 
            value={subject} 
            onChange={e => setSubject(e.target.value)} 
            size="small"
            className="courses-filter-select"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: 'rgba(59, 130, 246, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(59, 130, 246, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
            }}
          >
            {subjects.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <TextField 
            select 
            label="Level" 
            value={level} 
            onChange={e => setLevel(e.target.value)} 
            size="small"
            className="courses-filter-select"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: 'rgba(59, 130, 246, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(59, 130, 246, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                },
              },
            }}
          >
            {levels.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </TextField>
        </Box>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <div className="courses-grid">
          {filtered.length > 0 ? (
            <Grid container spacing={3}>
              {filtered.map(res => (
                <Grid xs={12} sm={6} md={4} key={res.id}>
                  <Card className="courses-course-card">
                    <CardContent className="courses-course-content">
                      <Typography className="courses-course-title">
                        {res.title}
                      </Typography>
                      <Box className="courses-course-chips">
                        <Chip 
                          label={res.subject} 
                          size="small" 
                          className="courses-course-chip subject"
                        />
                        <Chip 
                          label={res.level} 
                          size="small" 
                          className="courses-course-chip level"
                        />
                      </Box>
                      <a href={res.link} className="courses-course-link">
                        <span>Download/View</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className="courses-empty-state">
              <div className="courses-empty-icon">📚</div>
              <Typography className="courses-empty-text">
                No courses found
              </Typography>
              <Typography className="courses-empty-subtext">
                Try adjusting your filters to find more courses
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

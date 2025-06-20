import { Button, Container, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import './Home.css';

export default function Home() {
  const stats = [
    { icon: <SchoolIcon sx={{ fontSize: 40 }} />, count: '0+', label: 'Students' },
    { icon: <GroupIcon sx={{ fontSize: 40 }} />, count: '0+', label: 'Educators' },
    { icon: <MenuBookIcon sx={{ fontSize: 40 }} />, count: '0+', label: 'Courses' },
    { icon: <PeopleIcon sx={{ fontSize: 40 }} />, count: '0+', label: 'Volunteers' },
  ];

  const features = [
    {
      title: 'Free Resources',
      description: 'Access a vast library of educational materials, video lectures, and practice tests.',
    },
    {
      title: 'Expert Mentorship',
      description: 'Connect with experienced educators and receive personalized guidance.',
    },
    {
      title: 'Live Classes',
      description: 'Participate in interactive live sessions with real-time doubt resolution.',
    },
    {
      title: 'Community Learning',
      description: 'Join study groups and collaborate with peers from across the country.',
    },
  ];

  const testimonials = [];

  return (
    <div className="home-root">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="home-title">
            Welcome to <span className="hindi-text">शिक्षा</span><span className="separator">-</span><span className="english-text">Setu</span>
          </h1>
          <p className="home-subtitle">
            Bridging Education for All. Join our community-driven platform to access free resources, 
            mentorship, and collaborative learning opportunities.
          </p>
          <div className="home-cta-row">
            <Button 
              component={Link} 
              to="/register?role=student" 
              variant="contained" 
              color="primary" 
              className="home-cta-btn primary"
            >
              Join as Student
            </Button>
            <Button 
              component={Link} 
              to="/register?role=educator" 
              variant="outlined" 
              color="primary" 
              className="home-cta-btn educator"
            >
              Join as Educator
            </Button>
            <Button 
              component={Link} 
              to="/register?role=volunteer" 
              variant="outlined" 
              className="home-cta-btn volunteer"
            >
              Join as Volunteer
            </Button>
          </div>
        </div>
      </div>

      <Container maxWidth="lg">
        <Grid container spacing={4} className="stats-grid">
          {stats.map((stat, index) => (
            <Grid key={index} columns={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={0} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <Typography variant="h4" className="stat-count">{stat.count}</Typography>
                <Typography variant="subtitle1" className="stat-label">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" className="section features-section">
        <Typography variant="h3" className="section-title">
          Why Choose ShikshaSetu?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} columns={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={2} className="feature-card">
                <Typography variant="h5" className="feature-title">
                  {feature.title}
                </Typography>
                <Typography variant="body1" className="feature-description">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <div className="testimonials-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title">
            What Our Community Says
          </Typography>
          <Grid container spacing={4} sx={{ justifyContent: 'center', py: 4 }}>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <Grid key={index} columns={{ xs: 12, md: 4 }}>
                  <Paper elevation={3} className="testimonial-card">
                    <Typography variant="body1" className="testimonial-text">
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="h6" className="testimonial-name">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="subtitle2" className="testimonial-role">
                      {testimonial.role}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{
                    color: '#cbd5e1',
                    fontStyle: 'italic',
                    mt: 4,
                  }}
                >
                  Reviews from our community will be shared here soon!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </div>

      <div className="home-footer">
        <Typography variant="h5" className="footer-quote">
          Empowering through education, one learner at a time.
        </Typography>
        <Button 
          component={Link} 
          to="/courses" 
          variant="contained" 
          color="primary" 
          size="large" 
          className="explore-btn"
        >
          Explore Our Courses
        </Button>
      </div>
    </div>
  );
}

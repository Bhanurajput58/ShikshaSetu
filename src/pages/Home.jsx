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
        <div className="home-hero-content">
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
              sx={{
                minWidth: '200px',
                fontWeight: 600,
                fontSize: '1.125rem',
                padding: '16px 36px',
                borderRadius: '12px',
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                color: '#1e3a8a',
                border: '2px solid transparent',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              Join as Student
            </Button>
            <Button 
              component={Link} 
              to="/register?role=educator" 
              variant="outlined" 
              color="primary" 
              className="home-cta-btn educator"
              sx={{
                minWidth: '200px',
                fontWeight: 600,
                fontSize: '1.125rem',
                padding: '16px 36px',
                borderRadius: '12px',
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                border: '2px solid #f59e0b',
                color: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'rgba(245, 158, 11, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(245, 158, 11, 0.2)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              Join as Educator
            </Button>
            <Button 
              component={Link} 
              to="/register?role=volunteer" 
              variant="outlined" 
              className="home-cta-btn volunteer"
              sx={{
                minWidth: '200px',
                fontWeight: 600,
                fontSize: '1.125rem',
                padding: '16px 36px',
                borderRadius: '12px',
                textTransform: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                border: '2px solid #ffffff',
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(255, 255, 255, 0.1)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover::before': {
                  left: '100%',
                },
              }}
            >
              Join as Volunteer
            </Button>
          </div>
        </div>
      </div>

      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={4} 
          className="home-stats-grid"
          sx={{
            marginTop: 0,
            position: 'relative',
            zIndex: 2,
            width: '100%',
          }}
        >
          {stats.map((stat, index) => (
            <Grid key={index} columns={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                elevation={0} 
                className="home-stat-card"
                sx={{
                  textAlign: 'center',
                  padding: '36px 24px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.1),
                    0 4px 16px rgba(0, 0, 0, 0.05),
                    inset 0 1px 0 rgba(255, 255, 255, 0.5)
                  `,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: `
                      0 20px 40px rgba(0, 0, 0, 0.15),
                      0 8px 24px rgba(0, 0, 0, 0.1)
                    `,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::before': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                <div className="home-stat-icon">{stat.icon}</div>
                <Typography 
                  variant="h4" 
                  className="home-stat-count"
                  sx={{
                    color: '#1e3a8a',
                    fontWeight: 800,
                    marginBottom: '12px',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.count}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  className="home-stat-label"
                  sx={{
                    color: '#64748b',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.875rem',
                  }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" className="home-section home-features-section">
        <Typography 
          variant="h3" 
          className="home-section-title"
          sx={{
            textAlign: 'center',
            color: '#efe1e1',
            fontWeight: 800,
            marginBottom: '64px',
            position: 'relative',
            fontSize: '3rem',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              borderRadius: '2px',
            },
          }}
        >
          Why Choose ShikshaSetu?
        </Typography>
        <Grid 
          container 
          spacing={4}
          sx={{
            flexWrap: 'nowrap',
          }}
        >
          {features.map((feature, index) => (
            <Grid key={index} columns={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                elevation={2} 
                className="home-feature-card"
                sx={{
                  padding: '40px 32px',
                  height: '100%',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                  '&:hover': {
                    transform: 'translateY(-12px) rotateX(5deg)',
                    boxShadow: `
                      0 25px 50px rgba(0, 0, 0, 0.15),
                      0 12px 24px rgba(0, 0, 0, 0.1)
                    `,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                }}
              >
                <Typography 
                  variant="h5" 
                  className="home-feature-title"
                  sx={{
                    color: '#1e3a8a',
                    fontWeight: 700,
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  className="home-feature-description"
                  sx={{
                    color: '#64748b',
                    lineHeight: 1.7,
                    position: 'relative',
                    zIndex: 1,
                    fontWeight: 400,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <div className="home-testimonials-section">
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            className="home-section-title"
            sx={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 800,
              marginBottom: '64px',
              position: 'relative',
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                borderRadius: '2px',
              },
            }}
          >
            What Our Community Says
          </Typography>
          <Grid container spacing={4} sx={{ justifyContent: 'center', py: 4 }}>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <Grid key={index} columns={{ xs: 12, md: 4 }}>
                  <Paper 
                    elevation={3} 
                    className="home-testimonial-card"
                    sx={{
                      padding: '40px',
                      borderRadius: '20px',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        background: 'rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                      },
                      '&::before': {
                        content: '"\\201D"',
                        position: 'absolute',
                        top: '-30px',
                        left: '20px',
                        fontSize: '140px',
                        color: 'rgba(255, 255, 255, 0.1)',
                        fontFamily: 'serif',
                        zIndex: 0,
                      },
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      className="home-testimonial-text"
                      sx={{
                        position: 'relative',
                        color: '#e2e8f0',
                        fontStyle: 'italic',
                        marginBottom: '32px',
                        lineHeight: 1.8,
                        zIndex: 1,
                        fontSize: '1.1rem',
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Typography 
                      variant="h6" 
                      className="home-testimonial-name"
                      sx={{
                        color: '#ffffff',
                        marginBottom: '8px',
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      className="home-testimonial-role"
                      sx={{
                        color: '#cbd5e1',
                        fontSize: '0.875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
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
        <Typography 
          variant="h5" 
          className="home-footer-quote"
          sx={{
            color: '#1e293b',
            fontWeight: 700,
            marginBottom: '40px',
            fontSize: '2rem',
            background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Empowering through education, one learner at a time.
        </Typography>
        <Button 
          component={Link} 
          to="/courses" 
          variant="contained" 
          color="primary" 
          size="large" 
          className="home-explore-btn"
          sx={{
            fontSize: '1.25rem',
            padding: '18px 48px',
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(59, 130, 246, 0.4)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            },
          }}
        >
          Explore Our Courses
        </Button>
      </div>
    </div>
  );
}

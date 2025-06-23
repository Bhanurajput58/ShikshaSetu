import { Typography, Box, Paper, Grid, Divider } from '@mui/material';
import './About.css';

export default function About() {
  return (
    <div className="about-root">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <Typography variant="h1" className="about-title">
            About <span className="highlight">ShikshaSetu</span>
          </Typography>
          <Typography variant="h5" className="about-subtitle">
            ShikshaSetu is a community-driven platform committed to connecting learners, educators, and volunteers to create an inclusive educational space. Our goal is to break barriers and bring free learning to everyone.
          </Typography>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content">
        <div className="about-content-container">
          {/* Vision & Mission Section */}
          <Box className="about-vision-mission-section">
            <Grid container spacing={4}>
              <Grid xs={12} md={6}>
                <Paper elevation={0} className="about-vision-card">
                  <div className="about-card-icon">🌍</div>
                  <Typography variant="h4" className="about-card-title">
                    Vision
                  </Typography>
                  <Typography variant="body1" className="about-card-description">
                    To make education accessible to all by building digital bridges between knowledge providers and seekers.
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={12} md={6}>
                <Paper elevation={0} className="about-mission-card">
                  <div className="about-card-icon">🎯</div>
                  <Typography variant="h4" className="about-card-title">
                    Mission
                  </Typography>
                  <Typography variant="body1" className="about-card-description">
                    Empower every learner, regardless of background, with quality educational resources, mentorship, and community support.
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={12} md={4}>
                <Paper elevation={0} className="about-values-card">
                  <div className="about-card-icon">💎</div>
                  <Typography variant="h4" className="about-card-title">
                    Values
                  </Typography>
                  <Typography variant="body1" className="about-card-description">
                    Integrity, inclusivity, innovation, and impact drive everything we do. We believe in transparency and community-driven growth.
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={12} md={4}>
                <Paper elevation={0} className="about-goals-card">
                  <div className="about-card-icon">🎓</div>
                  <Typography variant="h4" className="about-card-title">
                    Goals
                  </Typography>
                  <Typography variant="body1" className="about-card-description">
                    Reach 1 million students by 2025, establish partnerships with 1000+ educators, and create a sustainable learning ecosystem.
                  </Typography>
                </Paper>
              </Grid>
              <Grid xs={12} md={4}>
                <Paper elevation={0} className="about-approach-card">
                  <div className="about-card-icon">🤝</div>
                  <Typography variant="h4" className="about-card-title">
                    Approach
                  </Typography>
                  <Typography variant="body1" className="about-card-description">
                    Technology-enabled, community-driven, and personalized learning experiences that adapt to individual needs and preferences.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* What We Offer Section */}
          <Box className="about-offerings-section">
            <Typography variant="h2" className="about-section-title">
              What We Offer
            </Typography>
            <Paper elevation={0} className="about-offerings-card">
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={3}>
                  <div className="about-offering-item">
                    <div className="about-offering-icon">📚</div>
                    <Typography variant="h6" className="about-offering-title">
                      Free Resources
                    </Typography>
                    <Typography variant="body2" className="about-offering-text">
                      Access to course materials and video lectures
                    </Typography>
                  </div>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <div className="about-offering-item">
                    <div className="about-offering-icon">🎥</div>
                    <Typography variant="h6" className="about-offering-title">
                      Live Sessions
                    </Typography>
                    <Typography variant="body2" className="about-offering-text">
                      Real-time doubt support and interactive learning
                    </Typography>
                  </div>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <div className="about-offering-item">
                    <div className="about-offering-icon">👨‍🏫</div>
                    <Typography variant="h6" className="about-offering-title">
                      Mentorship
                    </Typography>
                    <Typography variant="body2" className="about-offering-text">
                      Programs by experienced educators
                    </Typography>
                  </div>
                </Grid>
                <Grid xs={12} sm={6} md={3}>
                  <div className="about-offering-item">
                    <div className="about-offering-icon">🌐</div>
                    <Typography variant="h6" className="about-offering-title">
                      Inclusive Support
                    </Typography>
                    <Typography variant="body2" className="about-offering-text">
                      For students from all regions and languages
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Community Impact Section */}
          <Box className="about-impact-section">
            <Typography variant="h2" className="about-section-title">
              Community Impact
            </Typography>
            <Paper elevation={0} className="about-impact-card">
              <div className="about-impact-content">
                <div className="about-impact-icon">🚀</div>
                <Typography variant="body1" className="about-impact-text">
                  ShikshaSetu has helped hundreds of students connect with mentors, gain clarity in their learning paths, and access free resources. We are expanding daily to reach learners in every corner of the country.
                </Typography>
                <div className="about-impact-stats">
                  <div className="about-stat-item">
                    <Typography variant="h3" className="about-stat-number">0+</Typography>
                    <Typography variant="body2" className="about-stat-label">Students Helped</Typography>
                  </div>
                  <div className="about-stat-item">
                    <Typography variant="h3" className="about-stat-number">0+</Typography>
                    <Typography variant="body2" className="about-stat-label">Educators</Typography>
                  </div>
                  <div className="about-stat-item">
                    <Typography variant="h3" className="about-stat-number">0+</Typography>
                    <Typography variant="body2" className="about-stat-label">Resources</Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </Box>

          {/* Footer */}
          <Box className="about-footer">
            <Divider className="about-footer-divider" />
            <Typography variant="body2" className="about-footer-text">
              © {new Date().getFullYear()} ShikshaSetu — Bridging Education for All.
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

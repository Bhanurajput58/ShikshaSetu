import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  LinearProgress, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award, 
  Play, 
  CheckCircle, 
  Calendar,
  Target,
  BarChart3,
  Star,
  Bookmark,
  MoreVertical
} from 'lucide-react';
import './MyCourses.css';

export default function MyCourses({ student }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const demoStudent = {
    name: "John Doe",
    enrolledCourses: [
      {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Dr. amir",
        category: "Web Development",
        progress: 85,
        totalLessons: 24,
        completedLessons: 20,
        totalHours: 48,
        completedHours: 40,
        lastAccessed: "2 hours ago",
        nextLesson: "React Hooks Deep Dive",
        rating: 4.8,
        enrolledDate: "2024-01-15",
        estimatedCompletion: "2024-03-20",
        certificate: false
      },
      {
        id: 2,
        title: "Data Science Fundamentals",
        instructor: "Prof. anand",
        category: "Data Science",
        progress: 45,
        totalLessons: 18,
        completedLessons: 8,
        totalHours: 36,
        completedHours: 16,
        lastAccessed: "1 day ago",
        nextLesson: "Statistical Analysis Basics",
        rating: 4.6,
        enrolledDate: "2024-02-01",
        estimatedCompletion: "2024-04-15",
        certificate: false
      },
      {
        id: 3,
        title: "UI/UX Design Masterclass",
        instructor: "Prof. ankur",
        category: "Design",
        progress: 100,
        totalLessons: 12,
        completedLessons: 12,
        totalHours: 24,
        completedHours: 24,
        lastAccessed: "3 days ago",
        nextLesson: "Course Completed",
        rating: 4.9,
        enrolledDate: "2023-12-10",
        estimatedCompletion: "2024-01-30",
        certificate: true
      },
      {
        id: 4,
        title: "Python for Beginners",
        instructor: "Prof. kunal",
        category: "Programming",
        progress: 0,
        totalLessons: 15,
        completedLessons: 0,
        totalHours: 30,
        completedHours: 0,
        lastAccessed: "Never",
        nextLesson: "Introduction to Python",
        rating: 4.7,
        enrolledDate: "2024-03-01",
        estimatedCompletion: "2024-05-15",
        certificate: false
      }
    ]
  };

  const enrolledCourses = student?.enrolledCourses || demoStudent.enrolledCourses;

  const filters = [
    { key: 'all', label: 'All Courses', count: enrolledCourses.length },
    { key: 'in-progress', label: 'In Progress', count: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length },
    { key: 'completed', label: 'Completed', count: enrolledCourses.filter(c => c.progress === 100).length },
    { key: 'not-started', label: 'Not Started', count: enrolledCourses.filter(c => c.progress === 0).length }
  ];

  const filteredCourses = enrolledCourses.filter(course => {
    switch (selectedFilter) {
      case 'in-progress':
        return course.progress > 0 && course.progress < 100;
      case 'completed':
        return course.progress === 100;
      case 'not-started':
        return course.progress === 0;
      default:
        return true;
    }
  });

  const overallStats = {
    totalCourses: enrolledCourses.length,
    completedCourses: enrolledCourses.filter(c => c.progress === 100).length,
    inProgressCourses: enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length,
    totalProgress: Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length),
    totalHours: enrolledCourses.reduce((acc, c) => acc + c.totalHours, 0),
    completedHours: enrolledCourses.reduce((acc, c) => acc + c.completedHours, 0)
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return '#10b981';
    if (progress >= 75) return '#3b82f6';
    if (progress >= 50) return '#f59e0b';
    if (progress >= 25) return '#ef4444';
    return '#6b7280';
  };

  const getProgressText = (progress) => {
    if (progress === 100) return 'Completed!';
    if (progress >= 75) return 'Almost there!';
    if (progress >= 50) return 'Great progress!';
    if (progress >= 25) return 'Keep going!';
    return 'Just started';
  };

  return (
    <Box className="my-courses-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="welcome-content">
          <Typography variant="h3" className="welcome-title">
            My Learning Journey
          </Typography>
          <Typography variant="h6" className="welcome-subtitle">
            Track your progress and continue your educational path
          </Typography>
        </div>
        <div className="hero-icon">
          <BookOpen size={64} />
        </div>
      </div>

      {/* Overall Statistics */}
      <Grid container spacing={3} className="stats-section">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon total-courses">
                <BookOpen size={24} />
              </div>
              <Typography className="stat-number">
                {overallStats.totalCourses}
              </Typography>
              <Typography className="stat-label">
                Total Courses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon completed">
                <Award size={24} />
              </div>
              <Typography className="stat-number">
                {overallStats.completedCourses}
              </Typography>
              <Typography className="stat-label">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon in-progress">
                <TrendingUp size={24} />
              </div>
              <Typography className="stat-number">
                {overallStats.inProgressCourses}
              </Typography>
              <Typography className="stat-label">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon hours">
                <Clock size={24} />
              </div>
              <Typography className="stat-number">
                {overallStats.completedHours}h
              </Typography>
              <Typography className="stat-label">
                Hours Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Overall Progress */}
      <Card className="overall-progress-card">
        <CardContent className="card-content">
          <div className="section-header">
            <BarChart3 className="section-icon" />
            <Typography variant="h5" className="section-title">
              Overall Progress
            </Typography>
          </div>
          <div className="overall-progress-content">
            <div className="progress-circle">
              <div className="progress-ring">
                <svg width="120" height="120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={getProgressColor(overallStats.totalProgress)}
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallStats.totalProgress / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="progress-text">
                  <Typography variant="h4" className="progress-percentage">
                    {overallStats.totalProgress}%
                  </Typography>
                  <Typography className="progress-label">Complete</Typography>
                </div>
              </div>
            </div>
            <div className="progress-details">
              <div className="detail-item">
                <Typography className="detail-label">Total Hours</Typography>
                <Typography className="detail-value">{overallStats.totalHours}h</Typography>
              </div>
              <div className="detail-item">
                <Typography className="detail-label">Completed Hours</Typography>
                <Typography className="detail-value">{overallStats.completedHours}h</Typography>
              </div>
              <div className="detail-item">
                <Typography className="detail-label">Completion Rate</Typography>
                <Typography className="detail-value">
                  {Math.round((overallStats.completedCourses / overallStats.totalCourses) * 100)}%
                </Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Filters */}
      <div className="filters-section">
        {filters.map((filter) => (
          <Chip
            key={filter.key}
            label={`${filter.label} (${filter.count})`}
            onClick={() => setSelectedFilter(filter.key)}
            className={`filter-chip ${selectedFilter === filter.key ? 'active' : ''}`}
            variant={selectedFilter === filter.key ? 'filled' : 'outlined'}
          />
        ))}
      </div>

      {/* Enrolled Courses */}
      <Grid container spacing={3} className="courses-section">
        {filteredCourses.length === 0 ? (
          <Grid item xs={12}>
            <Card className="empty-state-card">
              <CardContent className="card-content">
                <div className="empty-state">
                  <BookOpen size={64} className="empty-icon" />
                  <Typography className="empty-text">
                    No courses found for this filter
                  </Typography>
                  <Typography className="empty-subtext">
                    Try selecting a different filter or enroll in new courses
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          filteredCourses.map((course) => (
            <Grid item xs={12} lg={6} key={course.id}>
              <Card className="course-card">
                <CardContent className="card-content">
                  <div className="course-header">
                    <div className="course-info">
                      <Typography className="course-title">
                        {course.title}
                      </Typography>
                      <Typography className="course-instructor">
                        by {course.instructor}
                      </Typography>
                      <div className="course-meta">
                        <Chip 
                          label={course.category} 
                          size="small" 
                          className="category-chip"
                        />
                        <div className="rating">
                          <Star size={16} className="star-icon" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="course-actions">
                      {course.certificate && (
                        <Tooltip title="Certificate Earned">
                          <Badge badgeContent={<Award size={12} />} color="success">
                            <CheckCircle size={24} className="certificate-icon" />
                          </Badge>
                        </Tooltip>
                      )}
                      <IconButton size="small">
                        <MoreVertical size={16} />
                      </IconButton>
                    </div>
                  </div>

                  <div className="course-progress">
                    <div className="progress-header">
                      <Typography className="progress-percentage">
                        {course.progress}% Complete
                      </Typography>
                      <Typography className="progress-status">
                        {getProgressText(course.progress)}
                      </Typography>
                    </div>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={course.progress}
                      className="progress-bar"
                      sx={{
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getProgressColor(course.progress)
                        }
                      }}
                    />
                  </div>

                  <div className="course-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <Clock size={16} />
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <div className="detail-item">
                        <Target size={16} />
                        <span>{course.completedHours}/{course.totalHours} hours</span>
                      </div>
                    </div>
                    
                    <div className="detail-row">
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>Last accessed: {course.lastAccessed}</span>
                      </div>
                      <div className="detail-item">
                        <Play size={16} />
                        <span>Next: {course.nextLesson}</span>
                      </div>
                    </div>
                  </div>

                  <div className="course-footer">
                    <div className="enrollment-info">
                      <Typography className="enrollment-date">
                        Enrolled: {new Date(course.enrolledDate).toLocaleDateString()}
                      </Typography>
                      {course.progress < 100 && (
                        <Typography className="estimated-completion">
                          Est. completion: {course.estimatedCompletion}
                        </Typography>
                      )}
                    </div>
                    <button className="continue-button">
                      {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
} 
import { Container, Typography, Box, Grid, Card, CardContent, Chip, TextField, MenuItem, Button, Rating, Avatar, Badge } from '@mui/material';
import { useState } from 'react';
import { PlayArrow, Book, AccessTime, People, Star, School, Language, Computer, Science, Business, Brush, Audiotrack } from '@mui/icons-material';
import './CourseLibrary.css';

// Sample course data
const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
    instructor: "Bhupendra jogi",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    subject: "Computer Science",
    level: "Beginner",
    duration: "8 weeks",
    students: 1247,
    rating: 4.8,
    reviews: 89,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "Web Development"],
    isEnrolled: false,
    isFree: true
  },
  {
    id: 2,
    title: "Mathematics for Beginners",
    description: "Master essential mathematical concepts from algebra to calculus with practical examples.",
    instructor: "Puneet Superstar",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    subject: "Mathematics",
    level: "Beginner",
    duration: "12 weeks",
    students: 2156,
    rating: 4.9,
    reviews: 156,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
    tags: ["Algebra", "Calculus", "Geometry", "Statistics"],
    isEnrolled: false,
    isFree: true
  },
  {
    id: 3,
    title: "Digital Art Fundamentals",
    description: "Explore digital painting, illustration, and design principles using modern tools.",
    instructor: "Akansha kumari",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    subject: "Arts",
    level: "Intermediate",
    duration: "10 weeks",
    students: 892,
    rating: 4.7,
    reviews: 67,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&fit=crop",
    tags: ["Digital Art", "Illustration", "Design", "Creativity"],
    isEnrolled: false,
    isFree: true
  },
  {
    id: 4,
    title: "Business Strategy & Management",
    description: "Learn strategic thinking, leadership, and business management principles.",
    instructor: "Dr. Anand Kumar",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    subject: "Business",
    level: "Advanced",
    duration: "14 weeks",
    students: 1567,
    rating: 4.6,
    reviews: 123,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    tags: ["Strategy", "Leadership", "Management", "Business"],
    isEnrolled: false,
    isFree: true
  },
  {
    id: 5,
    title: "Physics: From Newton to Einstein",
    description: "Journey through classical and modern physics with hands-on experiments.",
    instructor: "Prof. Ankita kumari",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    subject: "Science",
    level: "Intermediate",
    duration: "16 weeks",
    students: 743,
    rating: 4.8,
    reviews: 94,
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop",
    tags: ["Physics", "Mechanics", "Relativity", "Experiments"],
    isEnrolled: false,
    isFree: true
  },
  {
    id: 6,
    title: "Spanish Language Mastery",
    description: "Learn Spanish from basic conversation to advanced grammar and cultural insights.",
    instructor: "Dr. Akash kumar",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    subject: "Languages",
    level: "Beginner",
    duration: "20 weeks",
    students: 1892,
    rating: 4.9,
    reviews: 178,
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop",
    tags: ["Spanish", "Grammar", "Conversation", "Culture"],
    isEnrolled: false,
    isFree: true
  },
  {
    id: 7,
    title: "Music Theory & Composition",
    description: "Master music theory fundamentals and learn to compose your own pieces.",
    instructor: "Dr. Richa kumari",
    instructorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    subject: "Music",
    level: "Intermediate",
    duration: "18 weeks",
    students: 634,
    rating: 4.7,
    reviews: 82,
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
    tags: ["Music Theory", "Composition", "Harmony", "Melody"],
    isEnrolled: false,
    isFree: true
  },
  {
    id: 8,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, machine learning, and statistical methods.",
    instructor: "Dr. Arjun kumar",
    instructorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    subject: "Computer Science",
    level: "Advanced",
    duration: "15 weeks",
    students: 1123,
    rating: 4.8,
    reviews: 145,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    tags: ["Data Science", "Machine Learning", "Python", "Statistics"],
    isEnrolled: false,
    isFree: true
  }
];

const subjects = ['All', 'Computer Science', 'Mathematics', 'Arts', 'Business', 'Science', 'Languages', 'Music'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const getSubjectIcon = (subject) => {
  switch (subject) {
    case 'Computer Science': return <Computer />;
    case 'Mathematics': return <School />;
    case 'Arts': return <Brush />;
    case 'Business': return <Business />;
    case 'Science': return <Science />;
    case 'Languages': return <Language />;
    case 'Music': return <Audiotrack />;
    default: return <Book />;
  }
};

export default function CourseLibrary() {
  const [subject, setSubject] = useState('All');
  const [level, setLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const filteredCourses = courses.filter(course =>
    (subject === 'All' || course.subject === subject) &&
    (level === 'All' || course.level === level) &&
    (searchQuery === '' || 
     course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleEnroll = (courseId) => {
    if (enrolledCourses.includes(courseId)) {
      setEnrolledCourses(enrolledCourses.filter(id => id !== courseId));
    } else {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const enrolledCount = enrolledCourses.length;

  return (
    <div className="course-library-root">
      {/* Hero Section */}
      <div className="course-library-hero">
        <div className="course-library-hero-content">
          <Typography className="course-library-title">
            Course Library
          </Typography>
          <Typography className="course-library-subtitle">
            Discover and enroll in free courses from top instructors. 
            Build your skills with our comprehensive collection of educational resources.
          </Typography>
          <Box className="course-library-stats">
            <div className="course-library-stat">
              <Typography className="course-library-stat-number">{courses.length}</Typography>
              <Typography className="course-library-stat-label">Free Courses</Typography>
            </div>
            <div className="course-library-stat">
              <Typography className="course-library-stat-number">{enrolledCount}</Typography>
              <Typography className="course-library-stat-label">Enrolled</Typography>
            </div>
            <div className="course-library-stat">
              <Typography className="course-library-stat-number">4.8</Typography>
              <Typography className="course-library-stat-label">Average Rating</Typography>
            </div>
          </Box>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="course-library-filter-section">
        <Container maxWidth="lg">
          <Box className="course-library-search-box">
            <TextField
              fullWidth
              placeholder="Search courses, topics, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="course-library-search-input"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary' }}>
                    <Book />
                  </Box>
                ),
              }}
            />
          </Box>
          
          <Box className="course-library-filters">
            <TextField 
              select 
              label="Subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              size="small"
              className="course-library-filter-select"
            >
              {subjects.map(s => (
                <MenuItem key={s} value={s}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getSubjectIcon(s)}
                    {s}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
            
            <TextField 
              select 
              label="Level" 
              value={level} 
              onChange={(e) => setLevel(e.target.value)} 
              size="small"
              className="course-library-filter-select"
            >
              {levels.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField>
          </Box>
        </Container>
      </div>

      {/* Courses Grid */}
      <div className="course-library-section">
        <Container maxWidth="lg">
          <Typography className="course-library-results">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </Typography>
          
          <div className="course-library-grid">
            {filteredCourses.map(course => (
              <Card className="course-library-card" key={course.id}>
                <div className="course-library-card-image">
                  <img src={course.thumbnail} alt={course.title} />
                  <div className="course-library-card-overlay">
                    <Button
                      variant="contained"
                      className={`course-library-enroll-btn ${enrolledCourses.includes(course.id) ? 'enrolled' : ''}`}
                      onClick={() => handleEnroll(course.id)}
                      startIcon={enrolledCourses.includes(course.id) ? <PlayArrow /> : <Book />}
                    >
                      {enrolledCourses.includes(course.id) ? 'Continue Learning' : 'Enroll Free'}
                    </Button>
                  </div>
                </div>
                
                <CardContent className="course-library-card-content">
                  <Box className="course-library-card-header">
                    <Typography className="course-library-card-title">
                      {course.title}
                    </Typography>
                    <Box className="course-library-card-rating">
                      <Rating value={course.rating} precision={0.1} size="small" readOnly />
                      <Typography className="course-library-card-rating-text">
                        ({course.reviews})
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography className="course-library-card-description">
                    {course.description}
                  </Typography>
                  
                  <Box className="course-library-card-instructor">
                    <Avatar src={course.instructorAvatar} className="course-library-instructor-avatar" />
                    <Typography className="course-library-instructor-name">
                      {course.instructor}
                    </Typography>
                  </Box>
                  
                  <Box className="course-library-card-meta">
                    <Box className="course-library-card-info">
                      <AccessTime className="course-library-meta-icon" />
                      <Typography className="course-library-meta-text">
                        {course.duration}
                      </Typography>
                    </Box>
                    <Box className="course-library-card-info">
                      <People className="course-library-meta-icon" />
                      <Typography className="course-library-meta-text">
                        {course.students.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box className="course-library-card-chips">
                    <Chip 
                      label={course.subject} 
                      size="small" 
                      className="course-library-chip subject"
                      icon={getSubjectIcon(course.subject)}
                    />
                    <Chip 
                      label={course.level} 
                      size="small" 
                      className="course-library-chip level"
                    />
                  </Box>
                  
                  <Box className="course-library-card-tags">
                    {course.tags.slice(0, 3).map(tag => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                        className="course-library-tag"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="course-library-empty-state">
              <div className="course-library-empty-icon">📚</div>
              <Typography className="course-library-empty-title">
                No courses found
              </Typography>
              <Typography className="course-library-empty-text">
                Try adjusting your search or filters to find more courses
              </Typography>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
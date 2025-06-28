import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
  Tooltip
} from '@mui/material';
import {
  MessageCircle,
  Plus,
  Send,
  ThumbsUp,
  ThumbsDown,
  Reply,
  User,
  Users,
  BookOpen,
  Clock,
  Tag,
  Search
} from 'lucide-react';
import './CommunityForum.css';

export default function CommunityForum({ student }) {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to implement authentication in React?",
      content: "I'm building a React app and need help with user authentication. What's the best approach for implementing login/signup functionality?",
      author: {
        name: "Sarah Johnson",
        role: "Student",
        avatar: "SJ"
      },
      category: "Web Development",
      tags: ["React", "Authentication", "JavaScript"],
      timestamp: "2 hours ago",
      replies: [
        {
          id: 1,
          content: "I recommend using Firebase Authentication or Auth0. They provide easy-to-use SDKs for React. Here's a basic example...",
          author: {
            name: "Dr. Amir",
            role: "Educator",
            avatar: "DA"
          },
          timestamp: "1 hour ago",
          isEducator: true,
          likes: 5
        },
        {
          id: 2,
          content: "You can also use JWT tokens with a backend API. I've used this approach in my projects.",
          author: {
            name: "Volunteer Helper",
            role: "Volunteer",
            avatar: "VH"
          },
          timestamp: "30 minutes ago",
          isVolunteer: true,
          likes: 3
        }
      ],
      likes: 12,
      isResolved: false
    },
    {
      id: 2,
      title: "Understanding Python decorators",
      content: "Can someone explain Python decorators with a simple example? I'm having trouble grasping the concept.",
      author: {
        name: "Mike Chen",
        role: "Student",
        avatar: "MC"
      },
      category: "Programming",
      tags: ["Python", "Decorators"],
      timestamp: "1 day ago",
      replies: [
        {
          id: 3,
          content: "Decorators are functions that modify other functions. Here's a simple example: @timer decorator that measures execution time...",
          author: {
            name: "Prof. Kunal",
            role: "Educator",
            avatar: "PK"
          },
          timestamp: "1 day ago",
          isEducator: true,
          likes: 8
        }
      ],
      likes: 7,
      isResolved: true
    },
    {
      id: 3,
      title: "Best practices for responsive design",
      content: "What are the key principles for creating responsive websites that work well on all devices?",
      author: {
        name: "Emily Davis",
        role: "Student",
        avatar: "ED"
      },
      category: "Design",
      tags: ["CSS", "Responsive", "Mobile"],
      timestamp: "3 days ago",
      replies: [
        {
          id: 4,
          content: "Start with mobile-first design, use CSS Grid and Flexbox, and test on real devices. Here are some key breakpoints...",
          author: {
            name: "Prof. Ankur",
            role: "Educator",
            avatar: "PA"
          },
          timestamp: "2 days ago",
          isEducator: true,
          likes: 6
        }
      ],
      likes: 15,
      isResolved: false
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [showNewQuestionDialog, setShowNewQuestionDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Web Development',
    'Programming',
    'Data Science',
    'Design',
    'Mobile Development',
    'Database',
    'DevOps',
    'General'
  ];

  const currentUser = {
    name: student?.name || "Current Student",
    role: "Student",
    avatar: "CS"
  };

  const handlePostQuestion = () => {
    if (newQuestion.title && newQuestion.content && newQuestion.category) {
      const question = {
        id: questions.length + 1,
        title: newQuestion.title,
        content: newQuestion.content,
        author: currentUser,
        category: newQuestion.category,
        tags: newQuestion.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        timestamp: "Just now",
        replies: [],
        likes: 0,
        isResolved: false
      };

      setQuestions([question, ...questions]);
      setNewQuestion({ title: '', content: '', category: '', tags: '' });
      setShowNewQuestionDialog(false);
    }
  };

  const handleReply = () => {
    if (replyContent && selectedQuestion) {
      const reply = {
        id: Date.now(),
        content: replyContent,
        author: currentUser,
        timestamp: "Just now",
        likes: 0
      };

      const updatedQuestions = questions.map(q => 
        q.id === selectedQuestion.id 
          ? { ...q, replies: [...q.replies, reply] }
          : q
      );

      setQuestions(updatedQuestions);
      setReplyContent('');
      setShowReplyDialog(false);
      setSelectedQuestion(null);
    }
  };

  const handleLike = (questionId, replyId = null) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        if (replyId) {
          // Like a reply
          const updatedReplies = q.replies.map(r => 
            r.id === replyId ? { ...r, likes: r.likes + 1 } : r
          );
          return { ...q, replies: updatedReplies };
        } else {
          // Like the question
          return { ...q, likes: q.likes + 1 };
        }
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const filteredQuestions = questions.filter(question => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'resolved' && question.isResolved) ||
      (selectedFilter === 'unresolved' && !question.isResolved);
    
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <Box className="community-forum-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="welcome-content">
          <Typography variant="h3" className="welcome-title">
            Community Forum
          </Typography>
          <Typography variant="h6" className="welcome-subtitle">
            Ask questions, share knowledge, and connect with educators and volunteers
          </Typography>
        </div>
        <div className="hero-icon">
          <MessageCircle size={64} />
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="search-filter-card">
        <CardContent className="search-filter-content">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search questions, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search size={20} style={{ marginRight: 8, color: '#667eea' }} />
                }}
                className="search-input"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  label="Filter"
                >
                  <MenuItem value="all">All Questions</MenuItem>
                  <MenuItem value="unresolved">Unresolved</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Plus />}
                onClick={() => setShowNewQuestionDialog(true)}
                className="post-question-btn"
              >
                Post Question
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Grid container spacing={3} className="questions-section">
        {filteredQuestions.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Card className="question-card">
              <CardContent className="question-content">
                <div className="question-header">
                  <div className="question-author">
                    <Avatar className="author-avatar">
                      {question.author.avatar}
                    </Avatar>
                    <div className="author-info">
                      <Typography className="author-name">
                        {question.author.name}
                      </Typography>
                      <Chip 
                        label={question.author.role}
                        size="small"
                        className={`role-chip ${question.author.role.toLowerCase()}`}
                      />
                    </div>
                  </div>
                  <div className="question-meta">
                    <Typography className="question-timestamp">
                      <Clock size={14} />
                      {question.timestamp}
                    </Typography>
                    {question.isResolved && (
                      <Chip 
                        label="Resolved"
                        size="small"
                        color="success"
                        className="resolved-chip"
                      />
                    )}
                  </div>
                </div>

                <Typography variant="h6" className="question-title">
                  {question.title}
                </Typography>

                <Typography className="question-content-text">
                  {question.content}
                </Typography>

                <div className="question-tags">
                  {question.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      className="tag-chip"
                    />
                  ))}
                </div>

                <div className="question-actions">
                  <div className="action-buttons">
                    <Tooltip title="Like">
                      <IconButton 
                        onClick={() => handleLike(question.id)}
                        className="action-btn"
                      >
                        <ThumbsUp size={16} />
                        <span className="action-count">{question.likes}</span>
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Reply">
                      <IconButton 
                        onClick={() => {
                          setSelectedQuestion(question);
                          setShowReplyDialog(true);
                        }}
                        className="action-btn"
                      >
                        <Reply size={16} />
                        <span className="action-count">{question.replies.length}</span>
                      </IconButton>
                    </Tooltip>
                  </div>

                  <Chip 
                    label={question.category}
                    size="small"
                    className="category-chip"
                  />
                </div>

                {/* Replies Section */}
                {question.replies.length > 0 && (
                  <div className="replies-section">
                    <Typography variant="h6" className="replies-title">
                      Replies ({question.replies.length})
                    </Typography>
                    <List className="replies-list">
                      {question.replies.map((reply) => (
                        <ListItem key={reply.id} className="reply-item">
                          <ListItemAvatar>
                            <Avatar className="reply-avatar">
                              {reply.author.avatar}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <div className="reply-header">
                                <Typography className="reply-author">
                                  {reply.author.name}
                                </Typography>
                                <Chip 
                                  label={reply.author.role}
                                  size="small"
                                  className={`role-chip ${reply.author.role.toLowerCase()}`}
                                />
                                <Typography className="reply-timestamp">
                                  {reply.timestamp}
                                </Typography>
                              </div>
                            }
                            secondary={
                              <div className="reply-content">
                                <Typography className="reply-text">
                                  {reply.content}
                                </Typography>
                                <div className="reply-actions">
                                  <Tooltip title="Like">
                                    <IconButton 
                                      size="small"
                                      onClick={() => handleLike(question.id, reply.id)}
                                      className="reply-action-btn"
                                    >
                                      <ThumbsUp size={14} />
                                      <span className="action-count">{reply.likes}</span>
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              </div>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* New Question Dialog */}
      <Dialog 
        open={showNewQuestionDialog} 
        onClose={() => setShowNewQuestionDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Post a New Question</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: 8 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Question Title"
                value={newQuestion.title}
                onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                placeholder="What's your question?"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Question Details"
                multiline
                rows={4}
                value={newQuestion.content}
                onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                placeholder="Provide more details about your question..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tags (comma-separated)"
                value={newQuestion.tags}
                onChange={(e) => setNewQuestion({...newQuestion, tags: e.target.value})}
                placeholder="React, JavaScript, API"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewQuestionDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePostQuestion}
            variant="contained"
            disabled={!newQuestion.title || !newQuestion.content || !newQuestion.category}
          >
            Post Question
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog 
        open={showReplyDialog} 
        onClose={() => setShowReplyDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Reply to Question</DialogTitle>
        <DialogContent>
          {selectedQuestion && (
            <div style={{ marginBottom: 16 }}>
              <Typography variant="h6" style={{ marginBottom: 8 }}>
                {selectedQuestion.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedQuestion.content}
              </Typography>
            </div>
          )}
          <TextField
            fullWidth
            label="Your Reply"
            multiline
            rows={4}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReplyDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleReply}
            variant="contained"
            disabled={!replyContent}
          >
            Post Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 
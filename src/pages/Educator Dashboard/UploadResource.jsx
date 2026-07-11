import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Chip, Snackbar, Alert, IconButton, Tooltip, CircularProgress, 
  LinearProgress, TextField, MenuItem, InputAdornment, Box, 
  Typography, Button, Select, FormControl, InputLabel, Card, 
  CardContent, CardHeader, Grid, Paper, Avatar, 
  Fade, Grow, Slide, Zoom
} from '@mui/material';
import { 
  InsertDriveFile, Link as LinkIcon, Description, Visibility, 
  VisibilityOff, Delete, AddCircle, Clear, CloudUpload, 
  InsertLink, PictureAsPdf, Article, Save, Preview, Assignment, 
  InfoOutlined, TrendingUp, Schedule, Star, AutoStories
} from '@mui/icons-material';
import './UploadResource.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const API_BASE = 'http://localhost:5000';

const resourceTypeOptions = [
  { value: 'pdf', label: 'PDF Document', icon: <PictureAsPdf color="error" />, color: '#f44336' },
  { value: 'doc', label: 'Word Document', icon: <Article color="primary" />, color: '#2196f3' },
  { value: 'link', label: 'Web Link', icon: <LinkIcon color="success" />, color: '#4caf50' },
];

const UploadResource = () => {
  const { user } = useAuth();
  const [type, setType] = useState('pdf');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [link, setLink] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [recentResources, setRecentResources] = useState([]);
  const [linkPreview, setLinkPreview] = useState(null);
  const fileInputRef = useRef();
  const dropRef = useRef();
  const [previewResource, setPreviewResource] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const formCardRef = useRef();
  const [formCardHeight, setFormCardHeight] = useState('auto');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/courses`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setCourses(data.filter(c => c.educator && (c.educator._id === user?._id || c.educator === user?._id)));
        }
      } catch (err) {}
    };
    if (user?.role === 'educator') fetchCourses();
  }, [user]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/resources`);
        if (res.ok) {
          const data = await res.json();
          setRecentResources(data.filter(r => r.educator === user?._id).slice(0, 7));
        }
      } catch (err) {}
    };
    if (user?._id) fetchResources();
  }, [user, success]);

  useEffect(() => {
    if (file) {
      setFilePreview(file.name + ' (' + Math.round(file.size / 1024) + ' KB)');
    } else {
      setFilePreview(null);
    }
  }, [file]);

  useEffect(() => {
    if (type === 'link' && link) {
      const ytMatch = link.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
      if (ytMatch) {
        setLinkPreview(`https://img.youtube.com/vi/${ytMatch[1]}/0.jpg`);
      } else {
        try {
          const url = new URL(link);
          setLinkPreview(url.origin + '/favicon.ico');
        } catch {
          setLinkPreview(null);
        }
      }
    } else {
      setLinkPreview(null);
    }
  }, [type, link]);

  useEffect(() => {
    if (formCardRef.current) {
      setFormCardHeight(formCardRef.current.offsetHeight);
    }
  }, [title, description, type, file, link, tags, selectedCourse, isDraft, loading]);

  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea) return;
    
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        setFile(e.dataTransfer.files[0]);
      }
    };
    
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(true);
    };
    
    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
    };
    
    dropArea.addEventListener('drop', handleDrop);
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('dragleave', handleDragLeave);
    
    return () => {
      dropArea.removeEventListener('drop', handleDrop);
      dropArea.removeEventListener('dragover', handleDragOver);
      dropArea.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleClear = () => {
    setType('pdf');
    setFile(null);
    setFilePreview(null);
    setLink('');
    setTags([]);
    setTagInput('');
    setTitle('');
    setDescription('');
    setSelectedCourse('');
    setError('');
    setSuccess(false);
    setProgress(0);
    setLinkPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    setProgress(0);
    
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('tags', tags.join(','));
      formData.append('isDraft', isDraft);
      if (selectedCourse) formData.append('course', selectedCourse);
      if (type === 'link') {
        formData.append('linkUrl', link);
      } else if (file) {
        formData.append('file', file);
      }

      const uploadPromise = fetch(`${API_BASE}/api/resources/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      let fakeProgress = 0;
      const progressInterval = setInterval(() => {
        fakeProgress += 10;
        setProgress(Math.min(fakeProgress, 90));
      }, 150);

      const res = await uploadPromise;
      clearInterval(progressInterval);
      setProgress(100);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Upload failed');
      }

      setSuccess(true);
      setSnackbar({ open: true, message: 'Resource uploaded successfully!', severity: 'success' });
      handleClear();
    } catch (err) {
      setError(err.message);
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const handlePreview = async (resource) => {
    setPreviewLoading(true);
    setPreviewError('');
    try {
      const res = await fetch(`${API_BASE}/api/resources/${resource._id}`);
      if (!res.ok) throw new Error('Failed to fetch resource details');
      const data = await res.json();
      setPreviewResource(data);
      setPreviewOpen(true);
    } catch (err) {
      setPreviewError('Could not load preview.');
      setPreviewOpen(true);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setPreviewResource(null);
    setPreviewError('');
  };

  const selectedTypeConfig = resourceTypeOptions.find(opt => opt.value === type);

  return (
    <Box className="upload-resource-container">
      {/* Header Section */}
      <Fade in={true} timeout={800}>
        <Box className="header-section">
          <Box className="header-content">
            <Avatar className="header-avatar" sx={{ bgcolor: 'primary.main', width: 80, height: 80 }}>
              <CloudUpload sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h3" className="main-title">
                Upload Resource
              </Typography>
              <Typography variant="h6" className="subtitle">
                Share knowledge with your students
              </Typography>
            </Box>
          </Box>
          <Box className="stats-grid">
            <Card className="stat-card">
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUp color="primary" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6">{recentResources.length}</Typography>
                <Typography variant="body2" color="text.secondary">Recent Uploads</Typography>
              </CardContent>
            </Card>
            <Card className="stat-card">
              <CardContent sx={{ textAlign: 'center' }}>
                <AutoStories color="success" sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant="h6">{courses.length}</Typography>
                <Typography variant="body2" color="text.secondary">Your Courses</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Fade>

      {/* Top Row: Create New Resource & Recent Uploads */}
      <Grid container spacing={3} sx={{ mb: 4, alignItems: 'flex-start' }}>
        {/* Create New Resource Card */}
        <Grid item xs={12} lg={8}>
          <Card className="upload-form-card" ref={formCardRef}>
            <CardHeader
              title={
                <Box display="flex" alignItems="center" gap={2}>
                  {selectedTypeConfig?.icon}
                  <Typography variant="h5">Create New Resource</Typography>
                </Box>
              }
              subheader="Fill in the details to upload your resource"
            />
            <CardContent>
              <form onSubmit={handleSubmit} className="modern-form">
                {/* Resource Type Selection */}
                <Box className="type-selection-grid">
                  {resourceTypeOptions.map((option) => (
                    <Paper
                      key={option.value}
                      className={`type-option ${type === option.value ? 'selected' : ''}`}
                      onClick={() => setType(option.value)}
                      sx={{
                        borderColor: type === option.value ? option.color : 'transparent',
                        '&:hover': { borderColor: option.color }
                      }}
                    >
                      {option.icon}
                      <Typography variant="subtitle1">{option.label}</Typography>
                    </Paper>
                  ))}
                </Box>

                  {/* Basic Information */}
                  <Box className="form-section">
                    <Typography variant="h6" className="section-title">Basic Information</Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          label="Resource Title"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          fullWidth
                          required
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><Assignment /></InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Description"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          fullWidth
                          multiline
                          rows={2}
                          variant="outlined"
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><Description /></InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  {/* File Upload or Link */}
                  <Box className="form-section">
                    <Typography variant="h6" className="section-title">Content</Typography>
                    {(type === 'pdf' || type === 'doc') && (
                      <Paper
                        ref={dropRef}
                        className={`file-drop-zone ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          type="file"
                          accept={type === 'pdf' ? 'application/pdf' : '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
                          onChange={e => setFile(e.target.files[0])}
                          style={{ display: 'none' }}
                          ref={fileInputRef}
                          required
                        />
                        
                        {!file ? (
                          <Box className="drop-content">
                            <CloudUpload sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" gutterBottom>
                              Drop your file here or click to browse
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Supports {type.toUpperCase()} files up to 10MB
                            </Typography>
                          </Box>
                        ) : (
                          <Box className="file-preview">
                            <Box display="flex" alignItems="center" gap={2}>
                              <InsertDriveFile sx={{ fontSize: 48, color: selectedTypeConfig?.color }} />
                              <Box>
                                <Typography variant="subtitle1">{file.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {Math.round(file.size / 1024)} KB
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                color="error"
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </Box>
                        )}
                      </Paper>
                    )}

                    {type === 'link' && (
                      <Box>
                        <TextField
                          label="Resource URL"
                          value={link}
                          onChange={e => setLink(e.target.value)}
                          fullWidth
                          required
                          variant="outlined"
                          placeholder="https://example.com/resource"
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><InsertLink /></InputAdornment>,
                          }}
                        />
                        {linkPreview && (
                          <Box className="link-preview">
                            <img
                              src={linkPreview}
                              alt="Preview"
                              onError={e => e.target.style.display = 'none'}
                            />
                            <Typography variant="body2">Link Preview</Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>

                  {/* Tags */}
                  <Box className="form-section">
                    <Typography variant="h6" className="section-title">Tags</Typography>
                    <TextField
                      label="Add Tags"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => (e.key === 'Enter' || e.key === ',') && (e.preventDefault(), handleTagAdd())}
                      fullWidth
                      placeholder="e.g. mathematics, algebra, grade-10"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTagAdd} color="primary">
                              <AddCircle />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <Box className="tags-container">
                      {tags.map(tag => (
                        <Chip
                          key={tag}
                          label={tag}
                          onDelete={() => handleTagDelete(tag)}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Settings */}
                  <Box className="form-section">
                    <Typography variant="h6" className="section-title">Settings</Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Course</InputLabel>
                          <Select
                            value={selectedCourse}
                            onChange={e => setSelectedCourse(e.target.value)}
                            label="Course"
                          >
                            <MenuItem value=""><em>No Course</em></MenuItem>
                            {courses.map(course => (
                              <MenuItem key={course._id} value={course._id}>
                                {course.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    
                  </Box>

                  {/* Progress Bar */}
                  {progress > 0 && (
                    <Box className="progress-section">
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Uploading... {progress}%
                      </Typography>
                    </Box>
                  )}

                  {/* Action Buttons */}
                  <Box className="action-buttons">
                    <Button
                      onClick={handleClear}
                      variant="outlined"
                      color="secondary"
                      startIcon={<Clear />}
                      disabled={loading}
                    >
                      Clear Form
                    </Button>
                    <Button
                      onClick={() => setIsDraft(!isDraft)}
                      variant={isDraft ? 'contained' : 'outlined'}
                      color="warning"
                      startIcon={<Save />}
                      disabled={loading}
                    >
                      {isDraft ? 'Save as Draft' : 'Draft Mode'}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <CloudUpload />}
                      sx={{ minWidth: 150 }}
                    >
                      {loading ? 'Uploading...' : 'Upload Resource'}
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
          {/* Recent Uploads Card */}
          <Grid item xs={12} lg sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Card className="sidebar-card" style={{ height: formCardHeight, minHeight: 200 }}>
              <CardHeader
                title="Recent Uploads"
                avatar={<Schedule color="primary" />}
              />
              <CardContent>
                {recentResources.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No recent uploads yet
                  </Typography>
                ) : (
                  <Box className="recent-resources">
                    {recentResources.map((resource, index) => (
                      <Paper
                        className="resource-item"
                        elevation={2}
                        key={resource._id}
                        sx={{
                          p: 1,
                          mb: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          borderRadius: 2,
                          transition: 'box-shadow 0.2s, background 0.2s',
                          '&:hover': {
                            boxShadow: 6,
                            background: '#f5f7fa',
                          },
                          minHeight: 56,
                        }}
                      >
                        {/* Resource Type Icon/Chip */}
                        <Tooltip title={resource.type.toUpperCase()}>
                          <Box>
                            {resource.type === 'pdf' && <PictureAsPdf color="error" />}
                            {resource.type === 'doc' && <Article color="primary" />}
                            {resource.type === 'link' && <LinkIcon color="success" />}
                          </Box>
                        </Tooltip>
                        {/* Main Info */}
                        <Box flex={1} minWidth={0}>
                          <Tooltip title={resource.title}>
                            <Typography variant="subtitle2" noWrap>
                              {resource.title}
                            </Typography>
                          </Tooltip>
                          <Tooltip title={resource.description || ''}>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {resource.description}
                            </Typography>
                          </Tooltip>
                        </Box>
                        {/* Stats */}
                        <Box display="flex" alignItems="center" gap={1} sx={{ minWidth: 60 }}>
                          {(resource.type === 'pdf' || resource.type === 'doc') && (
                            <Tooltip title="Download">
                              <span>
                                <IconButton
                                  size="small"
                                  color="secondary"
                                  disabled={!resource.fileUrl}
                                  onClick={() => {
                                    if (resource.fileUrl) {
                                      const link = document.createElement('a');
                                      link.href = API_BASE + resource.fileUrl;
                                      link.setAttribute('download', resource.title || 'resource');
                                      link.style.display = 'none';
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                    }
                                  }}
                                >
                                  <DownloadIcon fontSize="small" />
                                </IconButton>
                              </span>
                            </Tooltip>
                          )}
                        </Box>
                        {/* Upload Date (if available) */}
                        {resource.createdAt && (
                          <Tooltip title={new Date(resource.createdAt).toLocaleString()}>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              {new Date(resource.createdAt).toLocaleDateString()}
                            </Typography>
                          </Tooltip>
                        )}
                        {/* Preview Button */}
                        <Tooltip title="Preview">
                          <IconButton size="small" color="primary" onClick={() => handlePreview(resource)}>
                            <Preview />
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={4} className="main-content">
        <Grid item xs={12} lg={8}>
        </Grid>
        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Slide direction="left" in={true} timeout={1200}>
            <Box className="sidebar">
              {/* Tips Card */}
              <Card className="sidebar-card tips-card">
                <CardHeader
                  title="Upload Tips"
                  avatar={<Star color="warning" />}
                />
                <CardContent>
                  <Box className="tips-list">
                    <Typography variant="body2" className="tip-item">
                      💡 Use descriptive titles to help students find your resources
                    </Typography>
                    <Typography variant="body2" className="tip-item">
                      🏷️ Add relevant tags to improve searchability
                    </Typography>
                    <Typography variant="body2" className="tip-item">
                      📚 Link resources to courses for better organization
                    </Typography>
                    <Typography variant="body2" className="tip-item">
                      🔒 Set appropriate visibility based on your content
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Slide>
        </Grid>
      </Grid>

      {/* Preview Modal - Keep existing */}
      <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box display="flex" alignItems="center" gap={2}>
            {previewResource?.type === 'pdf' && <PictureAsPdf color="error" />}
            {previewResource?.type === 'doc' && <Article color="primary" />}
            {previewResource?.type === 'link' && <LinkIcon color="success" />}
            <Typography variant="h6">Resource Preview</Typography>
          </Box>
          <IconButton onClick={handleClosePreview}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          {previewLoading && <CircularProgress />}
          {previewError && <Alert severity="error">{previewError}</Alert>}
          {previewResource && (
            <Box width="100%" maxWidth={600}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                  {previewResource.type === 'pdf' && <PictureAsPdf />}
                  {previewResource.type === 'doc' && <Article />}
                  {previewResource.type === 'link' && <LinkIcon />}
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h5" fontWeight={700}>{previewResource.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{previewResource.description}</Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1} flexWrap="wrap">
                    {previewResource.tags && previewResource.tags.map((tag, i) => (
                      <Chip key={i} label={tag} size="small" color="primary" variant="outlined" />
                    ))}
                    {previewResource.createdAt && (
                      <Tooltip title={new Date(previewResource.createdAt).toLocaleString()}>
                        <Box display="flex" alignItems="center" gap={0.5} ml={1}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(previewResource.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Box>
              {/* Educator info (optional, if available) */}
              {false && previewResource.educator && (
                <Box mb={2} display="flex" alignItems="center" gap={1}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main' }}>
                    {typeof previewResource.educator === 'object' && previewResource.educator.name ? previewResource.educator.name[0] : 'E'}
                  </Avatar>
                </Box>
              )}
              {/* File/Link Preview */}
              {previewResource.type === 'pdf' && previewResource.fileUrl && (
                <Box textAlign="center" my={2}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    File: {previewResource.fileUrl.split('/').pop()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={API_BASE + previewResource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<DownloadIcon />}
                    sx={{ mt: 1 }}
                  >
                    Download PDF
                  </Button>
                  <Box mt={2}>
                    <iframe
                      src={API_BASE + previewResource.fileUrl}
                      title="PDF Preview"
                      width="100%"
                      height="400px"
                      style={{ border: '1px solid #eee', borderRadius: 8 }}
                    />
                  </Box>
                </Box>
              )}
              {previewResource.type === 'doc' && previewResource.fileUrl && (
                <Box textAlign="center" my={2}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    File: {previewResource.fileUrl.split('/').pop()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={API_BASE + previewResource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<DownloadIcon />}
                    sx={{ mt: 1 }}
                  >
                    Download Document
                  </Button>
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      (Document preview not available. Download to view.)
                    </Typography>
                  </Box>
                </Box>
              )}
              {previewResource.type === 'link' && previewResource.linkUrl && (
                <Box textAlign="center" my={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={previewResource.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LinkIcon />}
                    sx={{ mb: 2 }}
                  >
                    Visit Link
                  </Button>
                  <Box mt={2}>
                    <iframe
                      src={previewResource.linkUrl}
                      title="Link Preview"
                      width="100%"
                      height="400px"
                      style={{ border: '1px solid #eee', borderRadius: 8 }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar - Keep existing */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadResource;
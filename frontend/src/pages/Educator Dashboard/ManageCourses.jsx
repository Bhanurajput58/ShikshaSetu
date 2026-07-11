import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageCourses.css';

// Utility to export feedback as CSV
function exportFeedbackCSV(course) {
  if (!course.feedback || course.feedback.length === 0) return;
  const header = 'User,Comment\n';
  const rows = course.feedback.map(fb => `"${fb.user}","${fb.comment.replace(/"/g, '""')}"`).join('\n');
  const csv = header + rows;
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_feedback.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  URL.revokeObjectURL(url);
}

const ManageCourses = () => {
  // Fetch courses from backend
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/courses')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setCourses([]);
        setLoading(false);
      });
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  // New state for add course form
  const [newCourse, setNewCourse] = useState({
    title: '',
    type: 'Video',
    tags: '',
    description: '',
  });
  // New state for editing type and tags
  const [editType, setEditType] = useState('Video');
  const [editTags, setEditTags] = useState('');

  // New state for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterTag, setFilterTag] = useState('All');
  // New state for sorting
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // State for expanded course details
  const [expandedId, setExpandedId] = useState(null);
  // State for new feedback per course
  const [newFeedback, setNewFeedback] = useState({});

  // Filtered and sorted courses
  let filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || course.type === filterType;
    const matchesTag = filterTag === 'All' || course.tags.includes(filterTag);
    return matchesSearch && matchesType && matchesTag;
  });

  filteredCourses = [...filteredCourses].sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'title') {
      cmp = a.title.localeCompare(b.title);
    } else if (sortBy === 'type') {
      cmp = a.type.localeCompare(b.type);
    } else if (sortBy === 'feedback') {
      cmp = (a.feedback?.length || 0) - (b.feedback?.length || 0);
    }
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  // Pagination state (must come after filteredCourses)
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const paginatedCourses = filteredCourses.slice((page - 1) * pageSize, page * pageSize);

  // Compute all unique tags for filter dropdown
  const allTags = Array.from(new Set(courses.flatMap(c => c.tags)));

  // Statistics
  const totalCourses = courses.length;
  const totalFeedback = courses.reduce((sum, c) => sum + (c.feedback?.length || 0), 0);
  const tagCounts = courses.flatMap(c => c.tags).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  const handleDelete = (id) => {
    const course = courses.find(c => c.id === id);
    if (window.confirm(`Are you sure you want to delete the course "${course?.title}"? This action cannot be undone.`)) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditTitle(course.title);
    setEditType(course.type);
    setEditTags(course.tags.join(', '));
  };

  const handleEditSave = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              title: editTitle,
              type: editType,
              tags: editTags.split(',').map((t) => t.trim()).filter(Boolean),
            }
          : course
      )
    );
    setEditingId(null);
    setEditTitle('');
    setEditType('Video');
    setEditTags('');
  };

  // Add new course handler
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;
    setCourses([
      ...courses,
      {
        id: Date.now(),
        title: newCourse.title,
        type: newCourse.type,
        tags: newCourse.tags.split(',').map((t) => t.trim()).filter(Boolean),
        description: newCourse.description,
        uploadDate: new Date().toLocaleString(),
        feedback: [],
      },
    ]);
    setNewCourse({ title: '', type: 'Video', tags: '', description: '' });
  };

  // In the render, handle loading, error, and empty states
  return (
    <div className="manage-courses-container">
      <h1 className="manage-courses-header">Manage Courses</h1>
      {/* Statistics Section */}
      <div style={{display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', background: '#f1f5f9', borderRadius: '12px', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(60,60,60,0.04)'}}>
        <div><strong>Total Courses:</strong> {courses.length}</div>
        <div><strong>Total Feedback:</strong> {courses.reduce((sum, c) => sum + (c.feedback?.length || 0), 0)}</div>
        <div><strong>Popular Tags:</strong> {(() => {
          const tagCounts = courses.flatMap(c => c.tags).reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
          }, {});
          const popularTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([tag]) => tag);
          return popularTags.length > 0 ? popularTags.join(', ') : 'None';
        })()}</div>
      </div>
      {/* Add Course Form */}
      <form className="add-course-form" onSubmit={handleAddCourse} style={{marginBottom: '2rem', background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(60,60,60,0.06)'}}>
        <h2 style={{fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Add New Course</h2>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
            style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 2}}
            required
          />
          <select
            value={newCourse.type}
            onChange={e => setNewCourse({ ...newCourse, type: e.target.value })}
            style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 1}}
          >
            <option value="Video">Video</option>
            <option value="PDF">PDF</option>
            <option value="Quiz">Quiz</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newCourse.tags}
            onChange={e => setNewCourse({ ...newCourse, tags: e.target.value })}
            style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', flex: 2}}
          />
        </div>
        <textarea
          placeholder="Description (optional)"
          value={newCourse.description}
          onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
          style={{marginTop: '0.5rem', width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', minHeight: '60px'}}
        />
        <button type="submit" style={{background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem'}}>Add</button>
      </form>
      {/* Search and Filter Controls */}
      <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', minWidth: '180px'}}
        />
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1'}}
        >
          <option value="All">All Types</option>
          <option value="Video">Video</option>
          <option value="PDF">PDF</option>
          <option value="Quiz">Quiz</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={filterTag}
          onChange={e => setFilterTag(e.target.value)}
          style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1'}}
        >
          <option value="All">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      {/* Sort Controls */}
      <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
        <label style={{fontWeight: 500}}>Sort by:</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1'}}
        >
          <option value="title">Title</option>
          <option value="type">Type</option>
          <option value="feedback">Feedback Count</option>
        </select>
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f1f5f9', cursor: 'pointer'}}
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className="course-list">
        <h2 className="course-title">Your Uploaded Content</h2>
        {loading ? (
          <div style={{textAlign: 'center', color: '#64748b', padding: '2rem'}}>Loading...</div>
        ) : error ? (
          <div style={{textAlign: 'center', color: '#ef4444', padding: '2rem'}}>Error: {error}</div>
        ) : paginatedCourses.length === 0 ? (
          <div style={{textAlign: 'center', color: '#64748b', padding: '2rem'}}></div>
        ) : (
          <ul>
            {paginatedCourses.map((course) => (
              <li key={course.id} className="course-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {editingId === course.id ? (
                    <>
                      <input
                        className="course-edit-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={{marginBottom: '0.5rem'}}
                      />
                      <select
                        className="course-edit-input"
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        style={{marginBottom: '0.5rem'}}
                      >
                        <option value="Video">Video</option>
                        <option value="PDF">PDF</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Other">Other</option>
                      </select>
                      <input
                        className="course-edit-input"
                        value={editTags}
                        onChange={(e) => setEditTags(e.target.value)}
                        placeholder="Tags (comma separated)"
                      />
                    </>
                  ) : (
                    <>
                      <span className="course-title">{course.title}</span>
                      <span className="course-type">[{course.type}]</span>
                      <div className="course-tags">Tags: {course.tags.join(', ')}</div>
                    </>
                  )}
                </div>
                <div className="course-actions">
                  {editingId === course.id ? (
                    <button
                      onClick={() => handleEditSave(course.id)}
                      className="course-save-btn"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(course)}
                      className="course-edit-btn"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="course-delete-btn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === course.id ? null : course.id)}
                    style={{background: '#e0e7ef', color: '#1e293b', border: 'none', borderRadius: '6px', padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer', marginLeft: '0.5rem'}}
                  >
                    {expandedId === course.id ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
                {expandedId === course.id && (
                  <div style={{marginTop: '1rem', background: '#f1f5f9', borderRadius: '8px', padding: '1rem'}}>
                    <div><strong>Description:</strong> {course.description || <span style={{color:'#64748b'}}>No description</span>}</div>
                    <div><strong>Upload Date:</strong> {course.uploadDate || <span style={{color:'#64748b'}}>N/A</span>}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem'}}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              style={{padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: page === 1 ? '#e5e7eb' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer'}}
            >
              Prev
            </button>
            <span style={{alignSelf: 'center'}}>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              style={{padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: page === totalPages ? '#e5e7eb' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer'}}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <h2 className="course-title" style={{ marginTop: '2rem' }}>Learner Feedback</h2>
      {loading ? (
        <div style={{textAlign: 'center', color: '#64748b', padding: '2rem'}}>Loading...</div>
      ) : error ? (
        <div style={{textAlign: 'center', color: '#ef4444', padding: '2rem'}}>Error: {error}</div>
      ) : paginatedCourses.length === 0 ? (
        <div style={{textAlign: 'center', color: '#64748b', padding: '2rem'}}></div>
      ) : (
        <ul>
          {paginatedCourses.map((course) => (
            <li key={course.id} className="course-feedback">
              <div className="course-feedback-title">{course.title}
                <button
                  onClick={() => exportFeedbackCSV(course)}
                  style={{marginLeft: '1rem', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.25rem 0.8rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.95rem'}}
                  disabled={!course.feedback || course.feedback.length === 0}
                  title={course.feedback && course.feedback.length > 0 ? 'Export feedback as CSV' : 'No feedback to export'}
                >
                  Export CSV
                </button>
              </div>
              <ul className="course-feedback-list">
                {course.feedback.map((fb, idx) => (
                  <li key={idx} className="course-feedback-item">
                    <span className="course-feedback-user">{fb.user}:</span> {fb.comment}
                  </li>
                ))}
              </ul>
              {/* Add Feedback Form */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!newFeedback[course.id]?.user?.trim() || !newFeedback[course.id]?.comment?.trim()) return;
                  setCourses(courses => courses.map(c =>
                    c.id === course.id
                      ? { ...c, feedback: [...c.feedback, { user: newFeedback[course.id].user, comment: newFeedback[course.id].comment }] }
                      : c
                  ));
                  setNewFeedback(fb => ({ ...fb, [course.id]: { user: '', comment: '' } }));
                }}
                style={{marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={newFeedback[course.id]?.user || ''}
                  onChange={e => setNewFeedback(fb => ({ ...fb, [course.id]: { ...fb[course.id], user: e.target.value } }))}
                  style={{padding: '0.3rem', borderRadius: '6px', border: '1px solid #cbd5e1', minWidth: '100px'}}
                  required
                />
                <input
                  type="text"
                  placeholder="Your feedback"
                  value={newFeedback[course.id]?.comment || ''}
                  onChange={e => setNewFeedback(fb => ({ ...fb, [course.id]: { ...fb[course.id], comment: e.target.value } }))}
                  style={{padding: '0.3rem', borderRadius: '6px', border: '1px solid #cbd5e1', minWidth: '180px', flex: 2}}
                  required
                />
                <button type="submit" style={{background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.3rem 1rem', fontWeight: 600, cursor: 'pointer'}}>Add Feedback</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCourses; 
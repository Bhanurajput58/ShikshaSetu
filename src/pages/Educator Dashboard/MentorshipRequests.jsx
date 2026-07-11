import React, { useState, useEffect } from 'react';
import './MentorshipRequests.css';
import dayjs from 'dayjs';

const API_BASE = 'http://localhost:5000';

export default function MentorshipRequests() {
  const [requests, setRequests] = useState([]);
  const [sessionDate, setSessionDate] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialog, setCancelDialog] = useState({ open: false, reqId: null });
  const [cancelReason, setCancelReason] = useState('');
  const [detailDialog, setDetailDialog] = useState({ open: false, req: null });
  const [rescheduleDate, setRescheduleDate] = useState({});
  const [rescheduleDialog, setRescheduleDialog] = useState({ open: false, reqId: null });
  const [scheduleDateDialog, setScheduleDateDialog] = useState({ open: false, reqId: null });
  const [scheduleTime, setScheduleTime] = useState({});
  const [scheduleDuration, setScheduleDuration] = useState({});
  const [scheduleNote, setScheduleNote] = useState({});
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState('');
  const [scheduleTimezone, setScheduleTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [rescheduleTime, setRescheduleTime] = useState({});
  const [rescheduleDuration, setRescheduleDuration] = useState({});
  const [rescheduleNote, setRescheduleNote] = useState({});
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [rescheduleError, setRescheduleError] = useState('');
  const [rescheduleTimezone, setRescheduleTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [detailLoading, setDetailLoading] = useState(false);
  const [fullStudentProfile, setFullStudentProfile] = useState(null);

  // Safe state update functions with error handling
  const safeSetSessionDate = (reqId, value) => {
    try {
      setSessionDate(prev => ({ ...prev, [reqId]: value }));
    } catch (err) {
      console.error('Error updating session date:', err);
      setScheduleError('Error updating date field');
    }
  };

  const safeSetScheduleTime = (reqId, value) => {
    try {
      setScheduleTime(prev => ({ ...prev, [reqId]: value }));
    } catch (err) {
      console.error('Error updating schedule time:', err);
      setScheduleError('Error updating time field');
    }
  };

  const safeSetScheduleDuration = (reqId, value) => {
    try {
      setScheduleDuration(prev => ({ ...prev, [reqId]: parseInt(value) || 60 }));
    } catch (err) {
      console.error('Error updating schedule duration:', err);
      setScheduleError('Error updating duration field');
    }
  };

  const safeSetScheduleNote = (reqId, value) => {
    try {
      setScheduleNote(prev => ({ ...prev, [reqId]: value }));
    } catch (err) {
      console.error('Error updating schedule note:', err);
      setScheduleError('Error updating note field');
    }
  };

  const safeSetRescheduleDate = (reqId, value) => {
    try {
      setRescheduleDate(prev => ({ ...prev, [reqId]: value }));
    } catch (err) {
      console.error('Error updating reschedule date:', err);
      setRescheduleError('Error updating date field');
    }
  };

  const safeSetRescheduleTime = (reqId, value) => {
    try {
      setRescheduleTime(prev => ({ ...prev, [reqId]: value }));
    } catch (err) {
      console.error('Error updating reschedule time:', err);
      setRescheduleError('Error updating time field');
    }
  };

  const safeSetRescheduleDuration = (reqId, value) => {
    try {
      setRescheduleDuration(prev => ({ ...prev, [reqId]: parseInt(value) || 60 }));
    } catch (err) {
      console.error('Error updating reschedule duration:', err);
      setRescheduleError('Error updating duration field');
    }
  };

  const safeSetRescheduleNote = (reqId, value) => {
    try {
      setRescheduleNote(prev => ({ ...prev, [reqId]: value }));
    } catch (err) {
      console.error('Error updating reschedule note:', err);
      setRescheduleError('Error updating note field');
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/mentorship/all-requests`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch mentorship requests');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError(err.message || 'Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchFullStudentProfile = async (studentId) => {
    setDetailLoading(true);
    setFullStudentProfile(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/users/${studentId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch student profile');
      const data = await res.json();
      setFullStudentProfile(data);
    } catch (err) {
      console.error('Error fetching student profile:', err);
      // Don't show error to user, just log it and continue with basic data
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/mentorship/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: action }),
      });
      if (!res.ok) throw new Error('Failed to update request');
      await fetchRequests();
    } catch (err) {
      setError(err.message || 'Error updating request');
    }
  };

  const handleCancelMentorship = async () => {
    if (!cancelDialog.reqId || !cancelReason.trim()) return;
    try {
      const reqToCancel = requests.find(r => r._id === cancelDialog.reqId);
      const token = localStorage.getItem('token');
      let res;
      if (reqToCancel && reqToCancel.status === 'scheduled') {
        // If scheduled, again send to accepted (allow rescheduling)
        res = await fetch(`${API_BASE}/api/mentorship/${cancelDialog.reqId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'accepted' }),
        });
      } else {
        // Otherwise, cancel as usual
        res = await fetch(`${API_BASE}/api/mentorship/${cancelDialog.reqId}/cancel`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ reason: cancelReason }),
        });
      }
      if (!res.ok) throw new Error('Failed to cancel mentorship');
      setCancelDialog({ open: false, reqId: null });
      setCancelReason('');
      await fetchRequests();
    } catch (err) {
      setError(err.message || 'Error cancelling mentorship');
    }
  };

  const handleSchedule = async (id) => {
    if (!sessionDate[id]) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/mentorship/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          status: 'scheduled',
          scheduledDate: sessionDate[id]
        }),
      });
      if (!res.ok) throw new Error('Failed to schedule mentorship');
      setSessionDate((prev) => ({ ...prev, [id]: '' }));
      await fetchRequests();
    } catch (err) {
      setError(err.message || 'Error scheduling mentorship');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'status-badge status-pending',
      'accepted': 'status-badge status-accepted',
      'rejected': 'status-badge status-rejected',
      'scheduled': 'status-badge status-scheduled',
      'cancelled': 'status-badge status-cancelled'
    };
    return statusClasses[status] || 'status-badge';
  };

  const getGoogleCalendarLink = ({ title, details, startDate, endDate }) => {
    try {
      const format = (date) => {
        if (!date || !dayjs.isDayjs(date)) {
          console.error('Invalid date provided to getGoogleCalendarLink:', date);
          return '';
        }
        return date.utc().format('YYYYMMDDTHHmmss[Z]');
      };
      
      // Check if both dates are valid before generating the link
      if (!startDate || !endDate || !dayjs.isDayjs(startDate) || !dayjs.isDayjs(endDate)) {
        console.error('Invalid dates provided to getGoogleCalendarLink:', { startDate, endDate });
        return '#';
      }
      
      const startFormatted = format(startDate);
      const endFormatted = format(endDate);
      
      if (!startFormatted || !endFormatted) {
        console.error('Failed to format dates for Google Calendar link');
        return '#';
      }
      
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${startFormatted}/${endFormatted}`;
    } catch (err) {
      console.error('Error generating Google Calendar link:', err);
      return '#';
    }
  };

  // Safe dayjs wrapper functions
  const safeDayjs = (dateString) => {
    try {
      if (!dateString) {
        console.warn('safeDayjs: Empty date string provided');
        return null;
      }
      const parsed = dayjs(dateString);
      if (!parsed.isValid()) {
        console.warn('safeDayjs: Invalid date string provided:', dateString);
        return null;
      }
      return parsed;
    } catch (err) {
      console.error('Error parsing date with dayjs:', err, dateString);
      return null;
    }
  };

  const safeFormatDate = (dateString, format = 'YYYY-MM-DD HH:mm') => {
    try {
      const parsed = safeDayjs(dateString);
      return parsed ? parsed.format(format) : '-';
    } catch (err) {
      console.error('Error formatting date:', err, dateString);
      return '-';
    }
  };

  const safeIsBefore = (date1, date2) => {
    try {
      const parsed1 = safeDayjs(date1);
      const parsed2 = safeDayjs(date2);
      if (!parsed1 || !parsed2) return false;
      return parsed1.isBefore(parsed2);
    } catch (err) {
      console.error('Error comparing dates:', err);
      return false;
    }
  };

  const safeAddMinutes = (dateString, minutes) => {
    try {
      const parsed = safeDayjs(dateString);
      if (!parsed) return null;
      const result = parsed.add(minutes, 'minute');
      return result.isValid() ? result : null;
    } catch (err) {
      console.error('Error adding minutes to date:', err);
      return null;
    }
  };

  if (error) {
    return (
      <div className="mentorship-requests-container">
        <div className="mentorship-requests-error-container">
          <div className="mentorship-requests-error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="mentorship-requests-btn mentorship-requests-btn-primary" onClick={fetchRequests}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mentorship-requests-container">
      <div className="mentorship-requests-header-section">
        <h1 className="mentorship-requests-title">
          <span className="mentorship-requests-title-icon">👨‍🏫</span>
          Mentorship Requests
        </h1>
        <button className="mentorship-requests-btn mentorship-requests-btn-secondary mentorship-requests-refresh-btn" onClick={fetchRequests}>
          <span className="mentorship-requests-btn-icon">🔄</span>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="mentorship-requests-loading-container">
          <div className="mentorship-requests-loading-spinner"></div>
          <p>Loading mentorship requests...</p>
        </div>
      ) : (
        <div className="mentorship-requests-table-container">
          <table className="mentorship-requests-table">
            <thead>
              <tr>
                <th className="mentorship-requests-th">Student</th>
                <th className="mentorship-requests-th">Subject</th>
                <th className="mentorship-requests-th">Requested Date</th>
                <th className="mentorship-requests-th">Status</th>
                <th className="mentorship-requests-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="mentorship-requests-empty-state">
                    <div className="mentorship-requests-empty-icon">📚</div>
                    <h3>No mentorship requests found</h3>
                    <p>New requests will appear here when students apply for mentorship.</p>
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id} className="mentorship-requests-row">
                    <td className="mentorship-requests-td">
                      <div className="mentorship-requests-student-info">
                        <span className="mentorship-requests-student-name">
                          {req.student?.name || req.student?.email || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="mentorship-requests-td">
                      <span className="mentorship-requests-subject-tag">{req.subject || '-'}</span>
                    </td>
                    <td className="mentorship-requests-td">
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="mentorship-requests-td">
                      <span className={`mentorship-requests-status-badge mentorship-requests-status-${req.status}`}>
                        {req.status}
                      </span>
                      {req.status === 'cancelled' && req.cancelReason && (
                        <div className="mentorship-requests-cancel-reason">
                          <small>Reason: {req.cancelReason}</small>
                        </div>
                      )}
                      {req.status === 'scheduled' && req.scheduledDate && (
                        <div className="mentorship-requests-scheduled-date">
                          <small>📅 {safeFormatDate(req.scheduledDate)}</small>
                        </div>
                      )}
                    </td>
                    <td className="mentorship-requests-td">
                      <div className="mentorship-requests-action-buttons">
                        {req.status === 'pending' && (
                          <>
                            <button
                              className="mentorship-requests-btn mentorship-requests-btn-accept"
                              onClick={() => handleAction(req._id, 'accepted')}
                            >
                              <span className="mentorship-requests-btn-icon">✅</span>
                              Accept
                            </button>
                            <button
                              className="mentorship-requests-btn mentorship-requests-btn-reject"
                              onClick={() => handleAction(req._id, 'rejected')}
                            >
                              <span className="mentorship-requests-btn-icon">❌</span>
                              Reject
                            </button>
                          </>
                        )}
                        {req.status === 'accepted' && (
                          <>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button
                                className="mentorship-requests-btn mentorship-requests-btn-schedule"
                                onClick={() => setScheduleDateDialog({ open: true, reqId: req._id })}
                              >
                                <span className="mentorship-requests-btn-icon">📅</span>
                                Schedule
                              </button>
                              <button
                                className="mentorship-requests-btn mentorship-requests-btn-primary"
                                onClick={() => {
                                  setDetailDialog({ open: true, req });
                                  // Fetch full student profile if we have student ID
                                  if (req.student?._id) {
                                    fetchFullStudentProfile(req.student._id);
                                  }
                                }}
                              >
                                <span className="mentorship-requests-btn-icon">🔍</span>
                                View Detail
                              </button>
                              <button
                                className="mentorship-requests-btn mentorship-requests-btn-cancel"
                                onClick={() => setCancelDialog({ open: true, reqId: req._id })}
                              >
                                <span className="mentorship-requests-btn-icon">🚫</span>
                                Cancel
                              </button>
                            </div>
                            {/* Schedule Dialog */}
                            {scheduleDateDialog.open && scheduleDateDialog.reqId === req._id && (
                              <div className="mentorship-requests-modal-overlay" onClick={() => {
                                setScheduleDateDialog({ open: false, reqId: null });
                                setSessionDate({ ...sessionDate, [req._id]: '' });
                                setScheduleTime({ ...scheduleTime, [req._id]: '' });
                                setScheduleDuration({ ...scheduleDuration, [req._id]: 60 });
                                setScheduleNote({ ...scheduleNote, [req._id]: '' });
                                setScheduleError('');
                              }}>
                                <div className="mentorship-requests-modal-content" onClick={e => e.stopPropagation()}>
                                  <div className="mentorship-requests-modal-header">
                                    <h2>Schedule Mentorship</h2>
                                  </div>
                                  <div className="mentorship-requests-modal-body">
                                    {/* Session Details Preview */}
                                    <div style={{ marginBottom: 16 }}>
                                      <b>Student:</b> {req.student?.name || req.student?.email || 'Unknown'}<br />
                                      <b>Subject:</b> {req.subject || '-'}
                                    </div>
                                    <label htmlFor="schedule-date" className="mentorship-requests-form-label">Select Date:</label>
                                    <input
                                      id="schedule-date"
                                      type="date"
                                      className="mentorship-requests-date-input"
                                      value={sessionDate[req._id] || ''}
                                      onChange={e => safeSetSessionDate(req._id, e.target.value)}
                                    />
                                    <label htmlFor="schedule-time" className="mentorship-requests-form-label">Select Time:</label>
                                    <input
                                      id="schedule-time"
                                      type="time"
                                      className="mentorship-requests-date-input"
                                      value={scheduleTime[req._id] || ''}
                                      onChange={e => safeSetScheduleTime(req._id, e.target.value)}
                                    />
                                    <label htmlFor="schedule-duration" className="mentorship-requests-form-label">Duration:</label>
                                    <select
                                      id="schedule-duration"
                                      className="mentorship-requests-date-input"
                                      value={scheduleDuration[req._id] || 60}
                                      onChange={e => safeSetScheduleDuration(req._id, e.target.value)}
                                    >
                                      <option value={30}>30 minutes</option>
                                      <option value={45}>45 minutes</option>
                                      <option value={60}>1 hour</option>
                                      <option value={90}>1.5 hours</option>
                                    </select>
                                    <label htmlFor="schedule-note" className="mentorship-requests-form-label">Note (optional):</label>
                                    <textarea
                                      id="schedule-note"
                                      className="mentorship-requests-form-textarea"
                                      value={scheduleNote[req._id] || ''}
                                      onChange={e => safeSetScheduleNote(req._id, e.target.value)}
                                    />
                                    <div style={{ margin: '12px 0', color: '#6b7280', fontSize: '0.95rem' }}>
                                      <b>Timezone:</b> {scheduleTimezone}
                                    </div>
                                    {/* Error Message */}
                                    {scheduleError && <div style={{ color: 'red', marginBottom: 8 }}>{scheduleError}</div>}
                                    {/* Confirmation Summary */}
                                    {sessionDate[req._id] && scheduleTime[req._id] && (
                                      <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 10, margin: '10px 0' }}>
                                        You are about to schedule a session with <b>{req.student?.name || req.student?.email || 'Unknown'}</b> on <b>{sessionDate[req._id]}</b> at <b>{scheduleTime[req._id]}</b> ({scheduleTimezone}) for <b>{scheduleDuration[req._id] || 60} minutes</b>.<br />
                                        {scheduleNote[req._id] && <span>Note: {scheduleNote[req._id]}</span>}
                                      </div>
                                    )}
                                  </div>
                                  <div className="mentorship-requests-modal-footer">
                                    <button
                                      className="mentorship-requests-btn mentorship-requests-btn-secondary"
                                      onClick={() => {
                                        setScheduleDateDialog({ open: false, reqId: null });
                                        setSessionDate({ ...sessionDate, [req._id]: '' });
                                        setScheduleTime({ ...scheduleTime, [req._id]: '' });
                                        setScheduleDuration({ ...scheduleDuration, [req._id]: 60 });
                                        setScheduleNote({ ...scheduleNote, [req._id]: '' });
                                        setScheduleError('');
                                      }}
                                      disabled={scheduleLoading}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="mentorship-requests-btn mentorship-requests-btn-schedule"
                                      onClick={async () => {
                                        setScheduleError('');
                                        if (!sessionDate[req._id] || !scheduleTime[req._id]) {
                                          setScheduleError('Please select both date and time.');
                                          return;
                                        }
                                        const selectedDateTime = safeDayjs(`${sessionDate[req._id]}T${scheduleTime[req._id]}`);
                                        if (!selectedDateTime) {
                                          setScheduleError('Invalid date/time format.');
                                          return;
                                        }
                                        if (safeIsBefore(selectedDateTime, dayjs())) {
                                          setScheduleError('Selected date and time is in the past.');
                                          return;
                                        }
                                        setScheduleLoading(true);
                                        try {
                                          const token = localStorage.getItem('token');
                                          const scheduledDate = selectedDateTime.toISOString();
                                          const duration = scheduleDuration[req._id] || 60;
                                          const note = scheduleNote[req._id] || '';
                                          const res = await fetch(`${API_BASE}/api/mentorship/${req._id}`, {
                                            method: 'PATCH',
                                            headers: {
                                              'Content-Type': 'application/json',
                                              'Authorization': `Bearer ${token}`,
                                            },
                                            body: JSON.stringify({ status: 'scheduled', scheduledDate, duration, note, timezone: scheduleTimezone }),
                                          });
                                          if (!res.ok) throw new Error('Failed to schedule mentorship');
                                          setScheduleDateDialog({ open: false, reqId: null });
                                          setSessionDate({ ...sessionDate, [req._id]: '' });
                                          setScheduleTime({ ...scheduleTime, [req._id]: '' });
                                          setScheduleDuration({ ...scheduleDuration, [req._id]: 60 });
                                          setScheduleNote({ ...scheduleNote, [req._id]: '' });
                                          setScheduleError('');
                                          await fetchRequests();
                                        } catch (err) {
                                          setScheduleError(err.message || 'Error scheduling mentorship');
                                        } finally {
                                          setScheduleLoading(false);
                                        }
                                      }}
                                      disabled={scheduleLoading || !sessionDate[req._id] || !scheduleTime[req._id]}
                                    >
                                      {scheduleLoading ? 'Scheduling...' : 'Confirm Schedule'}
                                    </button>
                                    {/* Google Calendar Integration */}
                                    {sessionDate[req._id] && scheduleTime[req._id] && (() => {
                                      const startDate = safeDayjs(`${sessionDate[req._id]}T${scheduleTime[req._id]}`);
                                      const endDate = safeAddMinutes(`${sessionDate[req._id]}T${scheduleTime[req._id]}`, Number(scheduleDuration[req._id] || 60));
                                      
                                      // Only show Google Calendar link if both dates are valid
                                      if (startDate && endDate && dayjs.isDayjs(startDate) && dayjs.isDayjs(endDate)) {
                                        return (
                                          <a
                                            href={getGoogleCalendarLink({
                                              title: `Mentorship with ${req.student?.name || req.student?.email || 'Unknown'}`,
                                              details: `Subject: ${req.subject || '-'}\nNote: ${scheduleNote[req._id] || ''}`,
                                              startDate,
                                              endDate,
                                            })}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mentorship-requests-btn mentorship-requests-btn-secondary"
                                            style={{ marginLeft: 8 }}
                                          >
                                            Add to Google Calendar
                                          </a>
                                        );
                                      }
                                      return null;
                                    })()}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        {req.status === 'scheduled' && (
                          <>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button
                                className="mentorship-requests-btn mentorship-requests-btn-schedule"
                                onClick={() => setRescheduleDialog({ open: true, reqId: req._id })}
                              >
                                <span className="mentorship-requests-btn-icon">📅</span>
                                Reschedule
                              </button>
                              <button
                                className="mentorship-requests-btn mentorship-requests-btn-primary"
                                onClick={() => setDetailDialog({ open: true, req })}
                              >
                                <span className="mentorship-requests-btn-icon">🔍</span>
                                View Detail
                              </button>
                              <button
                                className="mentorship-requests-btn mentorship-requests-btn-cancel"
                                onClick={() => setCancelDialog({ open: true, reqId: req._id })}
                              >
                                <span className="mentorship-requests-btn-icon">🚫</span>
                                Cancel
                              </button>
                            </div>
                            {/* Reschedule Dialog */}
                            {rescheduleDialog.open && rescheduleDialog.reqId === req._id && (
                              <div className="mentorship-requests-modal-overlay" onClick={() => {
                                setRescheduleDialog({ open: false, reqId: null });
                                setRescheduleDate({ ...rescheduleDate, [req._id]: '' });
                                setRescheduleTime({ ...rescheduleTime, [req._id]: '' });
                                setRescheduleDuration({ ...rescheduleDuration, [req._id]: 60 });
                                setRescheduleNote({ ...rescheduleNote, [req._id]: '' });
                                setRescheduleError('');
                              }}>
                                <div className="mentorship-requests-modal-content" onClick={e => e.stopPropagation()}>
                                  <div className="mentorship-requests-modal-header">
                                    <h2>Reschedule Mentorship</h2>
                                  </div>
                                  <div className="mentorship-requests-modal-body">
                                    {/* Session Details Preview */}
                                    <div style={{ marginBottom: 16 }}>
                                      <b>Student:</b> {req.student?.name || req.student?.email || 'Unknown'}<br />
                                      <b>Subject:</b> {req.subject || '-'}<br />
                                      <b>Current Scheduled:</b> {safeFormatDate(req.scheduledDate)}
                                    </div>
                                    
                                    {/* Cancel Schedule Section */}
                                    <div style={{ 
                                      background: '#fef2f2', 
                                      border: '1px solid #fecaca', 
                                      borderRadius: 8, 
                                      padding: 16, 
                                      marginBottom: 20,
                                      borderLeft: '4px solid #ef4444'
                                    }}>
                                      <h4 style={{ margin: '0 0 12px 0', color: '#dc2626', fontSize: '1rem' }}>
                                        🚫 Cancel This Session
                                      </h4>
                                      <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '0.9rem' }}>
                                        If you want to cancel this scheduled mentorship without rescheduling, click the button below.
                                      </p>
                                      <button
                                        className="mentorship-requests-btn mentorship-requests-btn-danger"
                                        onClick={async () => {
                                          if (window.confirm('Are you sure you want to cancel this scheduled mentorship? This action will allow you to reschedule.')) {
                                            setRescheduleLoading(true);
                                            try {
                                              const token = localStorage.getItem('token');
                                              const res = await fetch(`${API_BASE}/api/mentorship/${req._id}`, {
                                                method: 'PATCH',
                                                headers: {
                                                  'Content-Type': 'application/json',
                                                  'Authorization': `Bearer ${token}`,
                                                },
                                                body: JSON.stringify({ status: 'accepted' }),
                                              });
                                              if (!res.ok) throw new Error('Failed to update mentorship status');
                                              setRescheduleDialog({ open: false, reqId: null });
                                              setRescheduleDate({ ...rescheduleDate, [req._id]: '' });
                                              setRescheduleTime({ ...rescheduleTime, [req._id]: '' });
                                              setRescheduleDuration({ ...rescheduleDuration, [req._id]: 60 });
                                              setRescheduleNote({ ...rescheduleNote, [req._id]: '' });
                                              setRescheduleError('');
                                              await fetchRequests();
                                            } catch (err) {
                                              setRescheduleError(err.message || 'Error updating mentorship status');
                                            } finally {
                                              setRescheduleLoading(false);
                                            }
                                          }
                                        }}
                                        disabled={rescheduleLoading}
                                        style={{ width: '100%' }}
                                      >
                                        <span className="mentorship-requests-btn-icon">🚫</span>
                                        {rescheduleLoading ? 'Cancelling...' : 'Cancel This Session'}
                                      </button>
                                    </div>
                                    
                                    <div style={{ 
                                      background: '#f0f9ff', 
                                      border: '1px solid #bae6fd', 
                                      borderRadius: 8, 
                                      padding: 16, 
                                      marginBottom: 20,
                                      borderLeft: '4px solid #0ea5e9'
                                    }}>
                                      <h4 style={{ margin: '0 0 12px 0', color: '#0369a1', fontSize: '1rem' }}>
                                        📅 Reschedule This Session
                                      </h4>
                                      <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '0.9rem' }}>
                                        Or reschedule to a new date and time below.
                                      </p>
                                    </div>
                                    
                                    <label htmlFor="reschedule-date" className="mentorship-requests-form-label">New Date:</label>
                                    <input
                                      id="reschedule-date"
                                      type="date"
                                      className="mentorship-requests-date-input"
                                      value={rescheduleDate[req._id] || ''}
                                      onChange={e => safeSetRescheduleDate(req._id, e.target.value)}
                                    />
                                    <label htmlFor="reschedule-time" className="mentorship-requests-form-label">New Time:</label>
                                    <input
                                      id="reschedule-time"
                                      type="time"
                                      className="mentorship-requests-date-input"
                                      value={rescheduleTime[req._id] || ''}
                                      onChange={e => safeSetRescheduleTime(req._id, e.target.value)}
                                    />
                                    <label htmlFor="reschedule-duration" className="mentorship-requests-form-label">Duration:</label>
                                    <select
                                      id="reschedule-duration"
                                      className="mentorship-requests-date-input"
                                      value={rescheduleDuration[req._id] || 60}
                                      onChange={e => safeSetRescheduleDuration(req._id, e.target.value)}
                                    >
                                      <option value={30}>30 minutes</option>
                                      <option value={45}>45 minutes</option>
                                      <option value={60}>1 hour</option>
                                      <option value={90}>1.5 hours</option>
                                    </select>
                                    <label htmlFor="reschedule-note" className="mentorship-requests-form-label">Note (optional):</label>
                                    <textarea
                                      id="reschedule-note"
                                      className="mentorship-requests-form-textarea"
                                      value={rescheduleNote[req._id] || ''}
                                      onChange={e => safeSetRescheduleNote(req._id, e.target.value)}
                                    />
                                    <div style={{ margin: '12px 0', color: '#6b7280', fontSize: '0.95rem' }}>
                                      <b>Timezone:</b> {rescheduleTimezone}
                                    </div>
                                    {/* Error Message */}
                                    {rescheduleError && <div style={{ color: 'red', marginBottom: 8 }}>{rescheduleError}</div>}
                                    {/* Confirmation Summary */}
                                    {rescheduleDate[req._id] && rescheduleTime[req._id] && (
                                      <div style={{ background: '#f1f5f9', borderRadius: 8, padding: 10, margin: '10px 0' }}>
                                        You are about to reschedule a session with <b>{req.student?.name || req.student?.email || 'Unknown'}</b> to <b>{rescheduleDate[req._id]}</b> at <b>{rescheduleTime[req._id]}</b> ({rescheduleTimezone}) for <b>{rescheduleDuration[req._id] || 60} minutes</b>.<br />
                                        {rescheduleNote[req._id] && <span>Note: {rescheduleNote[req._id]}</span>}
                                      </div>
                                    )}
                                  </div>
                                  <div className="mentorship-requests-modal-footer">
                                    <button
                                      className="mentorship-requests-btn mentorship-requests-btn-secondary"
                                      onClick={() => {
                                        setRescheduleDialog({ open: false, reqId: null });
                                        setRescheduleDate({ ...rescheduleDate, [req._id]: '' });
                                        setRescheduleTime({ ...rescheduleTime, [req._id]: '' });
                                        setRescheduleDuration({ ...rescheduleDuration, [req._id]: 60 });
                                        setRescheduleNote({ ...rescheduleNote, [req._id]: '' });
                                        setRescheduleError('');
                                      }}
                                      disabled={rescheduleLoading}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="mentorship-requests-btn mentorship-requests-btn-schedule"
                                      onClick={async () => {
                                        setRescheduleError('');
                                        if (!rescheduleDate[req._id] || !rescheduleTime[req._id]) {
                                          setRescheduleError('Please select both date and time.');
                                          return;
                                        }
                                        const selectedDateTime = safeDayjs(`${rescheduleDate[req._id]}T${rescheduleTime[req._id]}`);
                                        if (!selectedDateTime) {
                                          setRescheduleError('Invalid date/time format.');
                                          return;
                                        }
                                        if (safeIsBefore(selectedDateTime, dayjs())) {
                                          setRescheduleError('Selected date and time is in the past.');
                                          return;
                                        }
                                        setRescheduleLoading(true);
                                        try {
                                          const token = localStorage.getItem('token');
                                          const scheduledDate = selectedDateTime.toISOString();
                                          const duration = rescheduleDuration[req._id] || 60;
                                          const note = rescheduleNote[req._id] || '';
                                          const res = await fetch(`${API_BASE}/api/mentorship/${req._id}`, {
                                            method: 'PATCH',
                                            headers: {
                                              'Content-Type': 'application/json',
                                              'Authorization': `Bearer ${token}`,
                                            },
                                            body: JSON.stringify({ status: 'scheduled', scheduledDate, duration, note, timezone: rescheduleTimezone }),
                                          });
                                          if (!res.ok) throw new Error('Failed to reschedule mentorship');
                                          setRescheduleDialog({ open: false, reqId: null });
                                          setRescheduleDate({ ...rescheduleDate, [req._id]: '' });
                                          setRescheduleTime({ ...rescheduleTime, [req._id]: '' });
                                          setRescheduleDuration({ ...rescheduleDuration, [req._id]: 60 });
                                          setRescheduleNote({ ...rescheduleNote, [req._id]: '' });
                                          setRescheduleError('');
                                          await fetchRequests();
                                        } catch (err) {
                                          setRescheduleError(err.message || 'Error rescheduling mentorship');
                                        } finally {
                                          setRescheduleLoading(false);
                                        }
                                      }}
                                      disabled={rescheduleLoading || !rescheduleDate[req._id] || !rescheduleTime[req._id]}
                                    >
                                      {rescheduleLoading ? 'Rescheduling...' : 'Confirm Reschedule'}
                                    </button>
                                    {/* Google Calendar Integration */}
                                    {rescheduleDate[req._id] && rescheduleTime[req._id] && (() => {
                                      const startDate = safeDayjs(`${rescheduleDate[req._id]}T${rescheduleTime[req._id]}`);
                                      const endDate = safeAddMinutes(`${rescheduleDate[req._id]}T${rescheduleTime[req._id]}`, Number(rescheduleDuration[req._id] || 60));
                                      
                                      // Only show Google Calendar link if both dates are valid
                                      if (startDate && endDate && dayjs.isDayjs(startDate) && dayjs.isDayjs(endDate)) {
                                        return (
                                          <a
                                            href={getGoogleCalendarLink({
                                              title: `Mentorship with ${req.student?.name || req.student?.email || 'Unknown'}`,
                                              details: `Subject: ${req.subject || '-'}\nNote: ${rescheduleNote[req._id] || ''}`,
                                              startDate,
                                              endDate,
                                            })}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mentorship-requests-btn mentorship-requests-btn-secondary"
                                            style={{ marginLeft: 8 }}
                                          >
                                            Add to Google Calendar
                                          </a>
                                        );
                                      }
                                      return null;
                                    })()}
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        {(req.status === 'rejected' || req.status === 'scheduled' || req.status === 'cancelled') && (
                          <span className="mentorship-requests-no-actions">No actions available</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Cancel Mentorship Dialog */}
      {cancelDialog.open && (
        <div className="mentorship-requests-modal-overlay" onClick={() => { setCancelDialog({ open: false, reqId: null }); setCancelReason(''); }}>
          <div className="mentorship-requests-modal-content" onClick={e => e.stopPropagation()}>
            <div className="mentorship-requests-modal-header">
              <h2>Cancel Mentorship</h2>
            </div>
            <div className="mentorship-requests-modal-body">
              <label htmlFor="cancel-reason" className="mentorship-requests-form-label">
                Reason for cancellation:
              </label>
              <textarea
                id="cancel-reason"
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                rows={4}
                className="mentorship-requests-form-textarea"
                placeholder="Please provide a detailed reason for cancellation..."
              />
            </div>
            <div className="mentorship-requests-modal-footer">
              <button 
                className="mentorship-requests-btn mentorship-requests-btn-secondary"
                onClick={() => { setCancelDialog({ open: false, reqId: null }); setCancelReason(''); }}
              >
                Cancel
              </button>
              <button 
                className="mentorship-requests-btn mentorship-requests-btn-danger"
                onClick={handleCancelMentorship}
                disabled={!cancelReason.trim()}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Dialog */}
      {detailDialog.open && detailDialog.req && (
        <div className="mentorship-requests-modal-overlay" onClick={() => {
          setDetailDialog({ open: false, req: null });
          setFullStudentProfile(null);
        }}>
          <div className="mentorship-requests-modal-content" onClick={e => e.stopPropagation()}>
            <div className="mentorship-requests-modal-header">
              <h2>📋 Student & Application Details</h2>
            </div>
            <div className="mentorship-requests-modal-body">
              {detailLoading ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div className="mentorship-requests-loading-spinner"></div>
                  <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading student profile...</p>
                </div>
              ) : (
                <>
                  {/* Student Profile Section */}
                  <h3 className="mentorship-requests-detail-section-title">👤 Student Profile</h3>
                  <div className="mentorship-requests-detail-row">
                    <b>Name:</b> {fullStudentProfile?.name || detailDialog.req.student?.name || detailDialog.req.studentName || 'Not provided'}
                  </div>
                  <div className="mentorship-requests-detail-row">
                    <b>Email:</b> {fullStudentProfile?.email || detailDialog.req.student?.email || detailDialog.req.studentEmail || 'Not provided'}
                  </div>
                  
                  {/* Personal Information */}
                  {(fullStudentProfile?.personalInfo || detailDialog.req.student?.personalInfo) && (
                    <>
                      <div className="mentorship-requests-detail-subsection">
                        <h4 style={{ color: '#6366f1', fontSize: '1rem', margin: '16px 0 8px 0' }}>📞 Personal Information</h4>
                        {(fullStudentProfile?.personalInfo?.phone || detailDialog.req.student?.personalInfo?.phone) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Phone:</b> {fullStudentProfile?.personalInfo?.phone || detailDialog.req.student?.personalInfo?.phone}
                          </div>
                        )}
                        {(fullStudentProfile?.personalInfo?.dateOfBirth || detailDialog.req.student?.personalInfo?.dateOfBirth) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Date of Birth:</b> {fullStudentProfile?.personalInfo?.dateOfBirth || detailDialog.req.student?.personalInfo?.dateOfBirth}
                          </div>
                        )}
                        {(fullStudentProfile?.personalInfo?.gender || detailDialog.req.student?.personalInfo?.gender) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Gender:</b> {fullStudentProfile?.personalInfo?.gender || detailDialog.req.student?.personalInfo?.gender}
                          </div>
                        )}
                        {(fullStudentProfile?.personalInfo?.address || detailDialog.req.student?.personalInfo?.address) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Address:</b> {fullStudentProfile?.personalInfo?.address || detailDialog.req.student?.personalInfo?.address}
                          </div>
                        )}
                        {(fullStudentProfile?.personalInfo?.bio || detailDialog.req.student?.personalInfo?.bio) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Bio:</b> 
                            <div style={{ 
                              marginTop: '4px', 
                              padding: '8px 12px', 
                              background: '#f8fafc', 
                              borderRadius: '6px',
                              borderLeft: '3px solid #6366f1',
                              fontStyle: 'italic',
                              color: '#475569'
                            }}>
                              {fullStudentProfile?.personalInfo?.bio || detailDialog.req.student?.personalInfo?.bio}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  
                  {/* Academic Information */}
                  {(fullStudentProfile?.academicInfo || detailDialog.req.student?.academicInfo) && (
                    <>
                      <div className="mentorship-requests-detail-subsection">
                        <h4 style={{ color: '#059669', fontSize: '1rem', margin: '16px 0 8px 0' }}>🎓 Academic Information</h4>
                        {(fullStudentProfile?.academicInfo?.grade || detailDialog.req.student?.academicInfo?.grade) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Grade/Level:</b> {fullStudentProfile?.academicInfo?.grade || detailDialog.req.student?.academicInfo?.grade}
                          </div>
                        )}
                        {(fullStudentProfile?.academicInfo?.school || detailDialog.req.student?.academicInfo?.school) && (
                          <div className="mentorship-requests-detail-row">
                            <b>School/Institution:</b> {fullStudentProfile?.academicInfo?.school || detailDialog.req.student?.academicInfo?.school}
                          </div>
                        )}
                        {(fullStudentProfile?.academicInfo?.currentGPA || detailDialog.req.student?.academicInfo?.currentGPA) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Current GPA:</b> {fullStudentProfile?.academicInfo?.currentGPA || detailDialog.req.student?.academicInfo?.currentGPA}
                          </div>
                        )}
                        {((fullStudentProfile?.academicInfo?.subjects && fullStudentProfile.academicInfo.subjects.length > 0) || 
                          (detailDialog.req.student?.academicInfo?.subjects && detailDialog.req.student.academicInfo.subjects.length > 0)) && (
                          <div className="mentorship-requests-detail-row">
                            <b>Subjects:</b> 
                            <div style={{ 
                              marginTop: '4px', 
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              gap: '6px' 
                            }}>
                              {(fullStudentProfile?.academicInfo?.subjects || detailDialog.req.student?.academicInfo?.subjects || []).map((subject, index) => (
                                <span key={index} style={{
                                  background: '#e0f2fe',
                                  color: '#0369a1',
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  fontSize: '0.8rem',
                                  fontWeight: '500'
                                }}>
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  
                  {/* Additional Student Info */}
                  {(fullStudentProfile?.profilePicture || detailDialog.req.student?.profilePicture) && (
                    <div className="mentorship-requests-detail-row">
                      <b>Profile Picture:</b> Available
                    </div>
                  )}
                  
                  {/* Additional fields from full profile */}
                  {fullStudentProfile && (
                    <>
                      {fullStudentProfile.role && (
                        <div className="mentorship-requests-detail-row">
                          <b>Role:</b> {fullStudentProfile.role}
                        </div>
                      )}
                      {fullStudentProfile.createdAt && (
                        <div className="mentorship-requests-detail-row">
                          <b>Account Created:</b> {new Date(fullStudentProfile.createdAt).toLocaleDateString()}
                        </div>
                      )}
                      {fullStudentProfile.lastLogin && (
                        <div className="mentorship-requests-detail-row">
                          <b>Last Login:</b> {new Date(fullStudentProfile.lastLogin).toLocaleString()}
                        </div>
                      )}
                    </>
                  )}
                  
                  <hr className="mentorship-requests-detail-divider" />
                  
                  {/* Application Details Section */}
                  <h3 className="mentorship-requests-detail-section-title">📝 Application Details</h3>
                  <div className="mentorship-requests-detail-row">
                    <b>Subject:</b> 
                    <span style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      marginLeft: '8px'
                    }}>
                      {detailDialog.req.subject || 'Not specified'}
                    </span>
                  </div>
                  
                  {detailDialog.req.goals && (
                    <div className="mentorship-requests-detail-row">
                      <b>Learning Goals:</b>
                      <div style={{ 
                        marginTop: '4px', 
                        padding: '8px 12px', 
                        background: '#f0f9ff', 
                        borderRadius: '6px',
                        borderLeft: '3px solid #0ea5e9',
                        color: '#0c4a6e'
                      }}>
                        {detailDialog.req.goals}
                      </div>
                    </div>
                  )}
                  
                  {detailDialog.req.experience && (
                    <div className="mentorship-requests-detail-row">
                      <b>Previous Experience:</b>
                      <div style={{ 
                        marginTop: '4px', 
                        padding: '8px 12px', 
                        background: '#f0fdf4', 
                        borderRadius: '6px',
                        borderLeft: '3px solid #22c55e',
                        color: '#14532d'
                      }}>
                        {detailDialog.req.experience}
                      </div>
                    </div>
                  )}
                  
                  {detailDialog.req.availability && (
                    <div className="mentorship-requests-detail-row">
                      <b>Availability:</b>
                      <div style={{ 
                        marginTop: '4px', 
                        padding: '8px 12px', 
                        background: '#fef7f0', 
                        borderRadius: '6px',
                        borderLeft: '3px solid #f59e0b',
                        color: '#92400e'
                      }}>
                        {detailDialog.req.availability}
                      </div>
                    </div>
                  )}
                  
                  {detailDialog.req.preferredMentor && (
                    <div className="mentorship-requests-detail-row">
                      <b>Preferred Mentor:</b> {detailDialog.req.preferredMentor}
                    </div>
                  )}
                  
                  {detailDialog.req.message && (
                    <div className="mentorship-requests-detail-row">
                      <b>Additional Message:</b>
                      <div style={{ 
                        marginTop: '4px', 
                        padding: '8px 12px', 
                        background: '#fdf4ff', 
                        borderRadius: '6px',
                        borderLeft: '3px solid #a855f7',
                        color: '#581c87',
                        fontStyle: 'italic'
                      }}>
                        {detailDialog.req.message}
                      </div>
                    </div>
                  )}
                  
                  <div className="mentorship-requests-detail-row">
                    <b>Requested At:</b> 
                    <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                      {detailDialog.req.createdAt ? new Date(detailDialog.req.createdAt).toLocaleString() : 'Not available'}
                    </span>
                  </div>
                  
                  {/* Status Information */}
                  <div className="mentorship-requests-detail-row">
                    <b>Current Status:</b> 
                    <span className={`mentorship-requests-status-badge mentorship-requests-status-${detailDialog.req.status}`}>
                      {detailDialog.req.status}
                    </span>
                  </div>
                  
                  {detailDialog.req.status === 'scheduled' && detailDialog.req.scheduledDate && (
                    <div className="mentorship-requests-detail-row">
                      <b>Scheduled Date:</b> {safeFormatDate(detailDialog.req.scheduledDate)}
                    </div>
                  )}
                  
                  {detailDialog.req.status === 'cancelled' && detailDialog.req.cancelReason && (
                    <div className="mentorship-requests-detail-row">
                      <b>Cancellation Reason:</b>
                      <div style={{ 
                        marginTop: '4px', 
                        padding: '8px 12px', 
                        background: '#fef2f2', 
                        borderRadius: '6px',
                        borderLeft: '3px solid #ef4444',
                        color: '#991b1b'
                      }}>
                        {detailDialog.req.cancelReason}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="mentorship-requests-modal-footer">
              <button 
                className="mentorship-requests-btn mentorship-requests-btn-secondary"
                onClick={() => {
                  setDetailDialog({ open: false, req: null });
                  setFullStudentProfile(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
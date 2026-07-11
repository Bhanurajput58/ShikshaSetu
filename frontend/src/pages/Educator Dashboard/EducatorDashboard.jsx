import React from 'react';
import { Link } from 'react-router-dom';
import './EducatorDashboard.css';
import { useState, useEffect } from 'react';
import { createApiUrl } from '../../config/api';

const EducatorDashboard = () => {
  const [mentees, setMentees] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchMentees() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(createApiUrl('/api/educator/my-mentees'), {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setMentees(data);
        }
      } catch (err) {
        // handle error
      }
    }

    async function fetchSessions() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(createApiUrl('/api/educator/my-sessions'), {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setSessions(data);
        }
      } catch (err) {
        // handle error
      }
    }

    fetchMentees();
    fetchSessions();
  }, []);

  return (
    <div className="educator-dashboard-container">
      <h1 className="educator-dashboard-title">Educator Dashboard - Home</h1>
      <div className="educator-dashboard-cards">
        {/* Overview Cards */}
        <div className="educator-dashboard-card content-contributed">
          <h2 className="card-title">Content Contributed</h2>
          <span className="card-value blue">&nbsp;</span>
          <p className="card-desc">Total articles, videos, or resources shared</p>
        </div>
        <div className="educator-dashboard-card mentees">
          <h2 className="card-title">Mentees</h2>
          <span className="card-value green">{mentees.length}</span>
          <p className="card-desc">Students you are mentoring</p>
        </div>
        <div className="educator-dashboard-card sessions">
          <h2 className="card-title">Sessions</h2>
          <span className="card-value purple">{sessions.length}</span>
          <p className="card-desc">Upcoming or past mentorship sessions</p>
        </div>
      </div>
      {/* Details Section */}
      <div className="educator-dashboard-details">
        <div className="educator-dashboard-section recent-content">
          <h3 className="section-title blue">Recent Content</h3>
          <ul className="section-list" style={{minHeight: '4.5em'}}>
            {/* Space reserved for recent content */}
          </ul>
        </div>
        <div className="educator-dashboard-section mentees-list">
          <h3 className="section-title green">Your Mentees</h3>
          <ul className="section-list" style={{minHeight: '6em'}}>
            {mentees.length === 0 ? (
              <li>No mentees assigned yet.</li>
            ) : (
              mentees.map((mentee) => {
                const s = mentee.student;
                return (
                  <li key={mentee._id} style={{marginBottom: '1.5em', padding: '0.75em 0', borderBottom: '1px solid #e5e7eb'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1em'}}>
                      {s?.personalInfo?.profilePicture && (
                        <img src={s.personalInfo.profilePicture} alt={s.name} style={{width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1px solid #ddd'}} />
                      )}
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: 600, fontSize: '1.08em'}}>{s?.name} <span style={{color: '#888', fontWeight: 400, fontSize: '0.97em'}}>&lt;{s?.email}&gt;</span></div>
                        {s?.personalInfo?.bio && (
                          <div style={{fontSize: '0.97em', color: '#555', marginTop: 2, marginBottom: 2}}>{s.personalInfo.bio}</div>
                        )}
                        <div style={{fontSize: '0.93em', color: '#666', marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: '0.5em'}}>
                          {s?.academicInfo?.grade && <span>Grade: {s.academicInfo.grade}</span>}
                          {s?.academicInfo?.school && <span>School: {s.academicInfo.school}</span>}
                          {s?.academicInfo?.currentGPA && <span>GPA: {s.academicInfo.currentGPA}</span>}
                          {s?.academicInfo?.highestQualification && <span>Qualification: {s.academicInfo.highestQualification}</span>}
                          {s?.academicInfo?.institution && <span>Institution: {s.academicInfo.institution}</span>}
                          {s?.academicInfo?.graduationYear && <span>Graduation: {s.academicInfo.graduationYear}</span>}
                          {s?.academicInfo?.specialization && <span>Specialization: {s.academicInfo.specialization}</span>}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
      <div className="educator-dashboard-section upcoming-sessions">
        <h3 className="section-title purple">Upcoming Sessions</h3>
        <ul className="section-list" style={{minHeight: '3em'}}>
          {sessions.length === 0 ? (
            <li>No upcoming sessions scheduled.</li>
          ) : (
            sessions.map((session) => {
              const s = session.student;
              const sessionDate = new Date(session.scheduledDate);
              return (
                <li key={session._id} style={{marginBottom: '1.5em', padding: '0.75em 0', borderBottom: '1px solid #e5e7eb'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1em'}}>
                    {s?.personalInfo?.profilePicture && (
                      <img src={s.personalInfo.profilePicture} alt={s.name} style={{width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1px solid #ddd'}} />
                    )}
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: 600, fontSize: '1.08em'}}>{s?.name} <span style={{color: '#888', fontWeight: 400, fontSize: '0.97em'}}>&lt;{s?.email}&gt;</span></div>
                      <div style={{fontSize: '0.93em', color: '#666', marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: '0.5em'}}>
                        <span><strong>Subject:</strong> {session.subject || '-'}</span>
                        <span><strong>Date:</strong> {sessionDate.toLocaleDateString()}</span>
                        <span><strong>Time:</strong> {sessionDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        {session.duration && <span><strong>Duration:</strong> {session.duration} minutes</span>}
                      </div>
                      {session.note && (
                        <div style={{fontSize: '0.9em', color: '#555', marginTop: 4, fontStyle: 'italic'}}>
                          Note: {session.note}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default EducatorDashboard; 
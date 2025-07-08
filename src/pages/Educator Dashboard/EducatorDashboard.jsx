import React from 'react';
import { Link } from 'react-router-dom';
import './EducatorDashboard.css';

const EducatorDashboard = () => {
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
          <span className="card-value green">&nbsp;</span>
          <p className="card-desc">Students you are mentoring</p>
        </div>
        <div className="educator-dashboard-card sessions">
          <h2 className="card-title">Sessions</h2>
          <span className="card-value purple">&nbsp;</span>
          <p className="card-desc">Upcoming or past mentorship sessions</p>
        </div>
      </div>
      {/* Details Section */}
      <div className="educator-dashboard-details">
        <div className="educator-dashboard-section recent-content">
          <h3 className="section-title blue">Recent Content</h3>
          <ul className="section-list" style={{minHeight: '4.5em'}}>

            
          </ul>
        </div>
        <div className="educator-dashboard-section mentees-list">
          <h3 className="section-title green">Your Mentees</h3>
          <ul className="section-list" style={{minHeight: '6em'}}>


          </ul>
        </div>
      </div>
      <div className="educator-dashboard-section upcoming-sessions">
        <h3 className="section-title purple">Upcoming Sessions</h3>
        <ul className="section-list" style={{minHeight: '3em'}}>


        </ul>
      </div>
    </div>
  );
};

export default EducatorDashboard; 
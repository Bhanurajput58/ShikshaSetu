import React from 'react';

const EducatorDashboardHome = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Educator Dashboard - Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Overview Cards */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Content Contributed</h2>
          <span className="text-4xl font-bold text-blue-600">12</span>
          <p className="text-gray-500 mt-2">Total articles, videos, or resources shared</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Mentees</h2>
          <span className="text-4xl font-bold text-green-600">8</span>
          <p className="text-gray-500 mt-2">Students you are mentoring</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Sessions</h2>
          <span className="text-4xl font-bold text-purple-600">5</span>
          <p className="text-gray-500 mt-2">Upcoming or past mentorship sessions</p>
        </div>
      </div>
      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Recent Content</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Article: "Effective Study Techniques"</li>
            <li>Video: "Time Management for Students"</li>
            <li>Resource: "Exam Preparation Checklist"</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-700">Your Mentees</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Priya Sharma</li>
            <li>Rahul Verma</li>
            <li>Anjali Singh</li>
            <li>+5 more</li>
          </ul>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-purple-700">Upcoming Sessions</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Session with Priya Sharma - 10th June, 4:00 PM</li>
          <li>Session with Rahul Verma - 12th June, 6:00 PM</li>
        </ul>
      </div>
    </div>
  );
};

export default EducatorDashboardHome; 
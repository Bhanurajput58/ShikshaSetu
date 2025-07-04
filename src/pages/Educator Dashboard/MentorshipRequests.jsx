import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockRequests = [
  {
    id: 1,
    studentName: 'Bhanu',
    topic: 'React Basics',
    requestedDate: '2024-06-10',
    status: 'pending',
  },
  {
    id: 2,
    studentName: 'Kavya',
    topic: 'Node.js',
    requestedDate: '2024-06-12',
    status: 'pending',
  },
];

export default function MentorshipRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [sessionDate, setSessionDate] = useState({});

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
  };

  const handleSchedule = (id) => {
    if (!sessionDate[id]) return;
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: 'scheduled', scheduledDate: sessionDate[id] } : req
      )
    );
    setSessionDate((prev) => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Mentorship Requests</h1>
      <nav className="mb-8 flex flex-wrap gap-4">
        <Link to="/educator-dashboard" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Home</Link>
        <Link to="/educator-dashboard/upload" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Upload Resource</Link>
        <Link to="/educator-dashboard/manage" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Manage Courses</Link>
        <Link to="/educator-dashboard/mentorship-requests" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Mentorship Requests</Link>
        <Link to="/educator-dashboard/forum" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Forum Participation</Link>
      </nav>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Student</th>
            <th className="py-2 px-4 border">Topic</th>
            <th className="py-2 px-4 border">Requested Date</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="py-2 px-4 border">{req.studentName}</td>
              <td className="py-2 px-4 border">{req.topic}</td>
              <td className="py-2 px-4 border">{req.requestedDate}</td>
              <td className="py-2 px-4 border">{req.status}{req.status === 'scheduled' && req.scheduledDate ? ` (on ${req.scheduledDate})` : ''}</td>
              <td className="py-2 px-4 border">
                {req.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleAction(req.id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleAction(req.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {req.status === 'accepted' && (
                  <div className="flex items-center">
                    <input
                      type="date"
                      className="border px-2 py-1 mr-2"
                      value={sessionDate[req.id] || ''}
                      onChange={(e) => setSessionDate({ ...sessionDate, [req.id]: e.target.value })}
                    />
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSchedule(req.id)}
                    >
                      Schedule
                    </button>
                  </div>
                )}
                {(req.status === 'rejected' || req.status === 'scheduled') && <span>-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
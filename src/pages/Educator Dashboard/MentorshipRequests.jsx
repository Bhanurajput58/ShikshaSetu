import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000';

export default function MentorshipRequests() {
  const [requests, setRequests] = useState([]);
  const [sessionDate, setSessionDate] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      // Optionally, you can use the returned updated request
      // const updated = await res.json();
      // setRequests((prev) => prev.map((req) => req._id === id ? updated : req));
      // But to keep things in sync, just refetch all requests:
      await fetchRequests();
    } catch (err) {
      setError(err.message || 'Error updating request');
    }
  };

  const handleSchedule = (id) => {
    if (!sessionDate[id]) return;
    setRequests((prev) =>
      prev.map((req) =>
        req._id === id ? { ...req, status: 'scheduled', scheduledDate: sessionDate[id] } : req
      )
    );
    setSessionDate((prev) => ({ ...prev, [id]: '' }));
  };

  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Mentorship Requests</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Student</th>
            <th className="py-2 px-4 border">Subject</th>
            <th className="py-2 px-4 border">Requested Date</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="py-4 text-center">Loading requests...</td>
            </tr>
          ) : requests.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center">No mentorship requests found.</td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req._id}>
                <td className="py-2 px-4 border">{req.student?.name || req.student?.email || 'Unknown'}</td>
                <td className="py-2 px-4 border">{req.subject || '-'}</td>
                <td className="py-2 px-4 border">{req.createdAt ? new Date(req.createdAt).toLocaleDateString() : '-'}</td>
                <td className="py-2 px-4 border">{req.status}{req.status === 'scheduled' && req.scheduledDate ? ` (on ${req.scheduledDate})` : ''}</td>
                <td className="py-2 px-4 border">
                  {req.status === 'pending' && (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleAction(req._id, 'accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleAction(req._id, 'rejected')}
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
                        value={sessionDate[req._id] || ''}
                        onChange={(e) => setSessionDate({ ...sessionDate, [req._id]: e.target.value })}
                      />
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleSchedule(req._id)}
                      >
                        Schedule
                      </button>
                    </div>
                  )}
                  {(req.status === 'rejected' || req.status === 'scheduled') && <span>-</span>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 
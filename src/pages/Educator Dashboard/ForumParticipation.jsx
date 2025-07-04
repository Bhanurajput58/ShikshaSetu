import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialQuestions = [
  {
    id: 1,
    title: 'How to implement authentication in React?',
    content: 'I\'m building a React app and need help with user authentication. What\'s the best approach for implementing login/signup functionality?',
    author: 'Aman Jain',
    timestamp: '2 hours ago',
    replies: [
      {
        id: 1,
        content: 'I recommend using Firebase Authentication or Auth0. They provide easy-to-use SDKs for React.',
        author: 'Dr. Amit',
        timestamp: '1 hour ago',
      },
    ],
    isResolved: false,
  },
  {
    id: 2,
    title: 'Understanding Python decorators',
    content: 'Can someone explain Python decorators with a simple example? I\'m having trouble grasping the concept.',
    author: 'Ayush',
    timestamp: '1 day ago',
    replies: [],
    isResolved: false,
  },
];

export default function ForumParticipation() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [replyContent, setReplyContent] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Answer a question
  const handleReply = (questionId) => {
    if (!replyContent.trim()) return;
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              replies: [
                ...q.replies,
                {
                  id: Date.now(),
                  content: replyContent,
                  author: 'Educator',
                  timestamp: 'Just now',
                },
              ],
            }
          : q
      )
    );
    setReplyContent('');
    setSelectedQuestion(null);
  };

  // Mark as resolved
  const handleResolve = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, isResolved: true } : q))
    );
  };

  // Delete question
  const handleDeleteQuestion = (questionId) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  // Delete reply
  const handleDeleteReply = (questionId, replyId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, replies: q.replies.filter((r) => r.id !== replyId) }
          : q
      )
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Forum Participation</h1>
      <nav className="mb-8 flex flex-wrap gap-4">
        <Link to="/educator-dashboard" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Home</Link>
        <Link to="/educator-dashboard/upload" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Upload Resource</Link>
        <Link to="/educator-dashboard/manage" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Manage Courses</Link>
        <Link to="/educator-dashboard/mentorship-requests" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Mentorship Requests</Link>
        <Link to="/educator-dashboard/forum" className="px-4 py-2 bg-blue-200 rounded font-semibold">Forum Participation</Link>
      </nav>
      <div className="space-y-8">
        {questions.length === 0 && (
          <div className="text-gray-500">No questions yet.</div>
        )}
        {questions.map((q) => (
          <div key={q.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-blue-700">{q.title}</h2>
              <div className="flex gap-2">
                {!q.isResolved && (
                  <button
                    className="text-green-600 border border-green-600 px-2 py-1 rounded hover:bg-green-50"
                    onClick={() => handleResolve(q.id)}
                  >
                    Mark as Resolved
                  </button>
                )}
                <button
                  className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50"
                  onClick={() => handleDeleteQuestion(q.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mb-2 text-gray-700">{q.content}</div>
            <div className="mb-2 text-sm text-gray-500">Asked by {q.author} • {q.timestamp}</div>
            {q.isResolved && <div className="text-green-700 font-semibold mb-2">[Resolved]</div>}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Replies</h3>
              {q.replies.length === 0 && <div className="text-gray-400 mb-2">No replies yet.</div>}
              <ul className="space-y-2">
                {q.replies.map((r) => (
                  <li key={r.id} className="flex justify-between items-center bg-gray-50 rounded p-2">
                    <div>
                      <span className="font-semibold text-blue-800">{r.author}:</span> {r.content}
                      <span className="ml-2 text-xs text-gray-400">{r.timestamp}</span>
                    </div>
                    <button
                      className="text-red-400 hover:text-red-700 text-xs"
                      onClick={() => handleDeleteReply(q.id, r.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              {!q.isResolved && (
                <div className="mt-4">
                  {selectedQuestion === q.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 flex-1"
                        placeholder="Type your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => handleReply(q.id)}
                      >
                        Post
                      </button>
                      <button
                        className="text-gray-500 px-2 py-1"
                        onClick={() => { setSelectedQuestion(null); setReplyContent(''); }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="text-blue-600 hover:underline text-sm mt-2"
                      onClick={() => setSelectedQuestion(q.id)}
                    >
                      Reply
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
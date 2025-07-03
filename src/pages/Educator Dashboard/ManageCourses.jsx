import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockCourses = [
  {
    id: 1,
    title: 'Algebra Basics',
    type: 'Video',
    tags: ['math', 'algebra', 'class 10'],
    feedback: [
      { user: 'Student A', comment: 'Very helpful!' },
      { user: 'Student B', comment: 'Great explanations.' },
    ],
  },
  {
    id: 2,
    title: 'Exam Preparation Checklist',
    type: 'PDF',
    tags: ['exam', 'checklist'],
    feedback: [
      { user: 'Student C', comment: 'Loved the checklist.' },
    ],
  },
];

const ManageCourses = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditTitle(course.title);
  };

  const handleEditSave = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, title: editTitle } : course
      )
    );
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Manage Courses</h1>
      <nav className="mb-8 flex flex-wrap gap-4">
        <Link to="/educator-dashboard" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Home</Link>
        <Link to="/educator-dashboard/upload" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Upload Resource</Link>
        <Link to="/educator-dashboard/manage" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Manage Courses</Link>
        <Link to="/educator-dashboard/mentorship-requests" className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200">Mentorship Requests</Link>
      </nav>
      <div className="bg-white shadow rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Uploaded Content</h2>
        <ul className="divide-y divide-gray-200">
          {courses.map((course) => (
            <li key={course.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                {editingId === course.id ? (
                  <input
                    className="border rounded px-2 py-1 mr-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  <span className="font-semibold text-lg">{course.title}</span>
                )}
                <span className="ml-2 text-sm text-gray-500">[{course.type}]</span>
                <div className="text-xs text-gray-400 mt-1">Tags: {course.tags.join(', ')}</div>
              </div>
              <div className="flex gap-2">
                {editingId === course.id ? (
                  <button
                    onClick={() => handleEditSave(course.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-700">Learner Feedback</h2>
        <ul className="divide-y divide-gray-200">
          {courses.map((course) => (
            <li key={course.id} className="py-2">
              <div className="font-semibold text-blue-600">{course.title}</div>
              <ul className="ml-4 list-disc text-gray-700">
                {course.feedback.map((fb, idx) => (
                  <li key={idx}>
                    <span className="font-medium">{fb.user}:</span> {fb.comment}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCourses; 
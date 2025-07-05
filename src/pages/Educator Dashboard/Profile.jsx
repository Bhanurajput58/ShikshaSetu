import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EducatorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      dateOfBirth: '1985-06-15',
      gender: 'Female',
      address: '456 Education Lane, Delhi, India',
      profilePicture: null,
      bio: 'Experienced educator with 15+ years of teaching experience in Mathematics and Science. Passionate about making learning accessible and engaging for all students.'
    },
    academicInfo: {
      highestQualification: 'Ph.D. in Mathematics',
      institution: 'Delhi University',
      graduationYear: '2010',
      specialization: 'Applied Mathematics',
      teachingExperience: '15 years',
      subjects: ['Mathematics', 'Physics', 'Statistics'],
      certifications: [
        'Certified Mathematics Teacher (CBSE)',
        'Advanced Teaching Methodology',
        'Digital Learning Specialist'
      ]
    },
    professionalInfo: {
      currentPosition: 'Senior Mathematics Teacher',
      school: 'Delhi Public School',
      department: 'Mathematics Department',
      joiningDate: '2015-06-01',
      achievements: [
        'Best Teacher Award 2023',
        'Published 5 research papers',
        'Led 3 successful student projects'
      ],
      skills: [
        'Advanced Mathematics',
        'Curriculum Development',
        'Student Assessment',
        'Online Teaching',
        'Mentoring'
      ]
    }
  });

  const [editData, setEditData] = useState({});

  useEffect(() => {
    setEditData(JSON.parse(JSON.stringify(profileData)));
  }, [profileData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditData(JSON.parse(JSON.stringify(profileData)));
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value.split(',').map(item => item.trim())
      }
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('personalInfo', 'profilePicture', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Educator Profile</h1>
        <div className="flex gap-4">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Profile updated successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'personal'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'academic'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Academic Details
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'professional'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Professional Information
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
            
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  {editData.personalInfo?.profilePicture ? (
                    <img
                      src={editData.personalInfo.profilePicture}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-gray-400">👤</span>
                  )}
                </div>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{editData.personalInfo?.name}</h3>
                <p className="text-gray-600">{editData.personalInfo?.email}</p>
              </div>
            </div>

            {/* Personal Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.personalInfo?.name || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.personalInfo?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.personalInfo?.email || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.personalInfo?.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.personalInfo?.phone || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.personalInfo?.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.personalInfo?.dateOfBirth || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.personalInfo?.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    value={editData.personalInfo?.gender || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.personalInfo?.gender}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={editData.personalInfo?.address || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.personalInfo?.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editData.personalInfo?.bio || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.personalInfo?.bio}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Academic Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.academicInfo?.highestQualification || ''}
                    onChange={(e) => handleInputChange('academicInfo', 'highestQualification', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.academicInfo?.highestQualification}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.academicInfo?.institution || ''}
                    onChange={(e) => handleInputChange('academicInfo', 'institution', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.academicInfo?.institution}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editData.academicInfo?.graduationYear || ''}
                    onChange={(e) => handleInputChange('academicInfo', 'graduationYear', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.academicInfo?.graduationYear}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.academicInfo?.specialization || ''}
                    onChange={(e) => handleInputChange('academicInfo', 'specialization', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.academicInfo?.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.academicInfo?.teachingExperience || ''}
                    onChange={(e) => handleInputChange('academicInfo', 'teachingExperience', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.academicInfo?.teachingExperience}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Taught (comma-separated)</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.academicInfo?.subjects?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('academicInfo', 'subjects', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mathematics, Physics, Statistics"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {editData.academicInfo?.subjects?.map((subject, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2">
                        {subject}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                {isEditing ? (
                  <textarea
                    value={editData.academicInfo?.certifications?.join('\n') || ''}
                    onChange={(e) => handleInputChange('academicInfo', 'certifications', e.target.value.split('\n').filter(item => item.trim()))}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter each certification on a new line"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {editData.academicInfo?.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="text-green-600 mr-2">✓</span>
                        {cert}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'professional' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Professional Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.professionalInfo?.currentPosition || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'currentPosition', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.professionalInfo?.currentPosition}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School/Institution</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.professionalInfo?.school || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'school', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.professionalInfo?.school}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.professionalInfo?.department || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.professionalInfo?.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.professionalInfo?.joiningDate || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'joiningDate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{editData.professionalInfo?.joiningDate}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.professionalInfo?.skills?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('professionalInfo', 'skills', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Advanced Mathematics, Curriculum Development, Student Assessment"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {editData.professionalInfo?.skills?.map((skill, index) => (
                      <span key={index} className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded mr-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                {isEditing ? (
                  <textarea
                    value={editData.professionalInfo?.achievements?.join('\n') || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'achievements', e.target.value.split('\n').filter(item => item.trim()))}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter each achievement on a new line"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {editData.professionalInfo?.achievements?.map((achievement, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="text-yellow-600 mr-2">🏆</span>
                        {achievement}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorProfile; 
import User from '../models/User.js';

// Get student profile with enrolled courses and other data
export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id)
      .select('-password')
      .populate('enrolledCourses');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return real enrolled courses
    const studentData = {
      ...student.toObject(),
      enrolledCourses: student.enrolledCourses,
      suggestedResources: [
        {
          id: 1,
          title: "JavaScript Tutorial for Beginners",
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
        },
        {
          id: 2,
          title: "React Documentation",
          link: "https://react.dev/learn"
        },
        {
          id: 4,
          title: "Python Programming Basics",
          link: "https://docs.python.org/3/tutorial/"
        },
        {
          id: 5,
          title: "CSS Grid Layout Guide",
          link: "https://css-tricks.com/snippets/css/complete-guide-grid/"
        },
        {
          id: 6,
          title: "Node.js Fundamentals",
          link: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs"
        },
      ]
    };

    res.json(studentData);
  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.personalInfo = req.body.personalInfo || student.personalInfo;
    student.academicInfo = req.body.academicInfo || student.academicInfo;
    student.interestAreas = req.body.interestAreas || student.interestAreas;
    student.achievements = req.body.achievements || student.achievements;

    await student.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating student profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Enroll student in a course
export const enrollInCourse = async (req, res) => {
  try {
    const { course } = req.body;
    // Use req.user.id for student lookup
    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Prevent duplicate enrollment by id
    if (student.enrolledCourses && student.enrolledCourses.includes(course.id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    // Add the course id
    student.enrolledCourses.push(course.id);
    await student.save();
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error('Error enrolling in course:', err);
    res.status(500).json({ message: 'Server error' });
  }
}; 
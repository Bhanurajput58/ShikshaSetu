import Course from '../models/Course.js';

// Fetch all available courses with educator info
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('educator', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new course entry
export const createCourse = async (req, res) => {
  try {
    const { title, description, educator } = req.body;

    const course = new Course({
      title,
      description,
      educator
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

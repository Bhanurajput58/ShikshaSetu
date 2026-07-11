import mongoose from 'mongoose';

const interestAreaSchema = new mongoose.Schema({
  id: Number,
  name: String,
  level: String,
  description: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'educator', 'volunteer', 'admin'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  personalInfo: {
    name: String,
    email: String,
    phone: String,
    dateOfBirth: String,
    gender: String,
    address: String,
    profilePicture: String,
    bio: String,
    socialLinks: {
      github: String,
      linkedin: String,
      portfolio: String
    }
  },
  academicInfo: {
    grade: String,
    school: String,
    rollNumber: String,
    admissionDate: String,
    currentGPA: String,
    subjects: [String],
    highestQualification: String,
    institution: String,
    graduationYear: String,
    specialization: String,
    teachingExperience: String,
    certifications: [String]
  },
  professionalInfo: {
    currentPosition: String,
    school: String,
    department: String,
    joiningDate: String,
    achievements: [String],
    skills: [String]
  },
  interestAreas: [interestAreaSchema],
  achievements: [String],
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
});

export default mongoose.model('User', userSchema);

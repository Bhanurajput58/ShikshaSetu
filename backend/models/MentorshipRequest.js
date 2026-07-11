import mongoose from 'mongoose';

const mentorshipRequestSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentName: { type: String },
  studentEmail: { type: String },
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // Not required at application time
  },
  subject: String,
  goals: String,
  experience: String,
  availability: String,
  preferredMentor: String,
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'scheduled', 'cancelled', 'completed'],
    default: 'pending',
  },
  scheduledDate: {
    type: Date,
  },
  duration: {
    type: Number,
    default: 60, // Default 60 minutes
  },
  note: {
    type: String,
    trim: true,
  },
  timezone: {
    type: String,
  },
  cancelReason: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('MentorshipRequest', mentorshipRequestSchema);

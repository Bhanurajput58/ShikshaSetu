import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resources: [
    {
      type: String,
      trim: true,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Course', courseSchema);

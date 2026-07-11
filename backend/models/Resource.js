import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['pdf', 'doc', 'link'], required: true },
  fileUrl: String,   // For uploaded files (pdf/doc)
  linkUrl: String,   // For links (YouTube, Google Drive, etc.)
  tags: [String],
  educator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  // Analytics fields
  viewCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 },
  lastAccessed: { type: Date }
});

export default mongoose.model('Resource', resourceSchema); 
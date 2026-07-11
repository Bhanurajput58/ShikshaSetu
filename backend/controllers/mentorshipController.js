import MentorshipRequest from '../models/MentorshipRequest.js';
import User from '../models/User.js';

//Nayi mentorship request bhejo
export const createMentorshipRequest = async (req, res) => {
  try {
    // Prevent duplicate requests from the same student (only if active)
    const existing = await MentorshipRequest.findOne({ 
      student: req.user._id, 
      status: { $in: ['pending', 'accepted', 'scheduled'] }
    });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied for a mentor.' });
    }
    const {
      student,
      educator,
      subject,
      goals,
      experience,
      availability,
      preferredMentor,
      message
    } = req.body;

    // Fetch student details
    const studentUser = await User.findById(student || req.user._id);

    const request = new MentorshipRequest({
      student,
      educator,
      subject,
      goals,
      experience,
      availability,
      preferredMentor,
      message,
      studentName: studentUser ? studentUser.name : '',
      studentEmail: studentUser ? studentUser.email : ''
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get the current student's mentorship request
export const getMyMentorshipRequest = async (req, res) => {
  try {
    const request = await MentorshipRequest.findOne({ student: req.user._id })
      .populate('educator', 'name email personalInfo professionalInfo');
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the current student's mentorship request
export const updateMyMentorshipRequest = async (req, res) => {
  try {
    const updated = await MentorshipRequest.findOneAndUpdate(
      { student: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete (cancel) the current student's mentorship request
export const deleteMyMentorshipRequest = async (req, res) => {
  try {
    const deleted = await MentorshipRequest.findOneAndDelete({ student: req.user._id });
    if (!deleted) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllMentorshipRequests = async (req, res) => {
  try {
    const requests = await MentorshipRequest.find()
      .populate('student', 'name email')
      .populate('educator', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMentorshipRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, scheduledDate, duration, note, timezone } = req.body;
    
    if (!['pending', 'accepted', 'rejected', 'scheduled', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // If accepting, set educator as well
    const updateData = { status };
    if (status === 'accepted') {
      updateData.educator = req.user._id; // Set educator to currently logged-in educator
    }
    
    // If scheduling, set the scheduled date and related fields
    if (status === 'scheduled' && scheduledDate) {
      updateData.scheduledDate = new Date(scheduledDate);
      if (duration) updateData.duration = duration;
      if (note) updateData.note = note;
      if (timezone) updateData.timezone = timezone;
    }

    const updated = await MentorshipRequest.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel mentorship with reason
export const cancelMentorship = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    if (!reason || reason.trim() === '') {
      return res.status(400).json({ message: 'Reason is required for cancellation' });
    }

    const updated = await MentorshipRequest.findByIdAndUpdate(
      id,
      { 
        status: 'cancelled',
        cancelReason: reason.trim()
      },
      { new: true }
    );
    
    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all mentees (students) for the currently logged-in educator
export const getMyMentees = async (req, res) => {
  try {
    const mentees = await MentorshipRequest.find({
      educator: req.user._id,
      status: { $in: ['accepted', 'scheduled'] }
    }).populate('student', 'name email personalInfo academicInfo');
    res.json(mentees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get scheduled sessions for the currently logged-in educator
export const getMyScheduledSessions = async (req, res) => {
  try {
    const sessions = await MentorshipRequest.find({
      educator: req.user._id,
      status: 'scheduled',
      scheduledDate: { $exists: true, $ne: null }
    }).populate('student', 'name email personalInfo academicInfo');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

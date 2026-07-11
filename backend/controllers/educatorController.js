import User from '../models/User.js';

// GET /api/educator/profile
export const getEducatorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Educator not found' });
    
    // Always include the main email in personalInfo.email
    const educatorProfile = {
      personalInfo: {
        ...user.personalInfo,
        email: user.personalInfo?.email || user.email
      },
      academicInfo: user.academicInfo || {},
      professionalInfo: user.professionalInfo || {}
    };
    
    res.json(educatorProfile);
  } catch (err) {
    console.error('Error fetching educator profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/educator/profile
export const updateEducatorProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Educator not found' });

    // Update the fields directly
    if (req.body.personalInfo) user.personalInfo = req.body.personalInfo;
    if (req.body.academicInfo) user.academicInfo = req.body.academicInfo;
    if (req.body.professionalInfo) user.professionalInfo = req.body.professionalInfo;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating educator profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
}; 
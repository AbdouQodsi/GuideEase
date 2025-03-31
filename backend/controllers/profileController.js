const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  const { email, firstname, lastname, userType } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { firstname, lastname, userType },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated', updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

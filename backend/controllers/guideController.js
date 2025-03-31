;const User = require('../models/User');

exports.registerOrUpdateGuide = async (req, res) => {
  const { firstname, lastname, phone, email, password, userType, introduction } = req.body;
  const licensePath = req.file ? req.file.path : null;

  try {
    let user = await User.findOne({ email });

    if (user) {
      user.firstname = firstname;
      user.lastname = lastname;
      user.phone = phone;
      user.password = password;
      user.userType = userType;
      user.introduction = introduction;
      if (licensePath) user.license = licensePath;

      const updatedUser = await user.save();
      return res.status(200).json({ message: 'Guide profile updated', updatedUser });
    } else {
      const newUser = new User({
        firstname,
        lastname,
        phone,
        email,
        password,
        userType,
        introduction,
        license: licensePath
      });
      await newUser.save();
      return res.status(201).json({ message: 'Guide registered successfully', newUser });
    }
  } catch (err) {
    console.error('Guide registration/update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

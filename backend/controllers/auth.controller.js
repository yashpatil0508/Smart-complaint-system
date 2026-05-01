const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, role, ...otherData } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      role: role || 'citizen',
      ...otherData
    });

    await user.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Create payload
    const payload = {
      id: user.id,
      role: user.role
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecret_jwt_key_you_should_change',
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, role: user.role, name: user.name });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAuthorities = async (req, res) => {
  try {
    const authorities = await User.find({ role: 'authority' }).select('-password');
    res.json(authorities);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

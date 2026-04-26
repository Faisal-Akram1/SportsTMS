const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (user) => {
  const payload = {
    user: {
      id: user.id,
      role: user.role
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        msg: 'User already exists'
      });
    }

    user = new User({
      username,
      email,
      password,
      role
    });

    await user.save();

    const token = createToken(user);

    res.status(201).json({
      success: true,
      msg: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid credentials'
      });
    }

    const token = createToken(user);

    res.json({
      success: true,
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};
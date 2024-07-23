const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const saltRounds = 10;
const JWT_SECRET = 'your_jwt_secret';

exports.registerUser = async (req, res) => {
  const { username, password, accessLevel } = req.body;

  if (!username || !password || !accessLevel) {
    return res.status(400).json({ error: 'Please provide username, password, and access level' });
  }

  try {
    const existingUser = await User.findOne({ where: { Username: username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      Username: username,
      Password: hashedPassword,
      AccessLevel: accessLevel,
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.ID });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide username and password' });
  }

  try {
    const user = await User.findOne({ where: { Username: username } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.Password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.ID, username: user.Username, accessLevel: user.AccessLevel },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, accessLevel: user.AccessLevel, username: user.Username });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

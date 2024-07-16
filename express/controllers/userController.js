const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const saltRounds = 10;
const JWT_SECRET = 'your_jwt_secret';

exports.registerUser = async (req, res) => {
  const { username, password, accessLevel } = req.body;

  if (!username || !password || !accessLevel) {
    return res.status(400).json({ error: 'Please provide username, password, and access level' });
  }

  try {
    const [existingUser] = await db.query('SELECT * FROM Users WHERE Username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = 'INSERT INTO Users (Username, Password, AccessLevel) VALUES (?, ?, ?)';
    await db.query(sql, [username, hashedPassword, accessLevel]);

    res.status(201).json({ message: 'User registered successfully' });
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
    const [user] = await db.query('SELECT * FROM Users WHERE Username = ?', [username]);
    if (user.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user[0].Password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user[0].ID, username: user[0].Username, accessLevel: user[0].AccessLevel },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, accessLevel: user[0].AccessLevel, username: user[0].Username });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

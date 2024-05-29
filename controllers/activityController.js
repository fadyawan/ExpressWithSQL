const db = require('../config/db');

exports.createActivity = async (req, res) => {
  try {
    const newActivity = req.body;
    const sql = 'INSERT INTO Activity SET ?';
    const [result] = await db.query(sql, newActivity);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating activity:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Activity';
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM Activity WHERE ID = ?';
    const [result] = await db.query(sql, [id]);
    res.json(result);
  } catch (err) {
    console.error('Error deleting activity:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

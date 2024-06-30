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

exports.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM Activity WHERE ID = ?';
    const [results] = await db.query(sql, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (err) {
    console.error('Error fetching activity by ID:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedActivity = req.body;
    const sql = 'UPDATE Activity SET ? WHERE ID = ?';
    const [result] = await db.query(sql, [updatedActivity, id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Activity updated successfully' });
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (err) {
    console.error('Error updating activity:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

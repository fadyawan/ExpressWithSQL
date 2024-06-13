const db = require('../config/db');

exports.createLocation = async (req, res) => {
  try {
    const newLocation = req.body;
    const sql = 'INSERT INTO Location SET ?';
    const [result] = await db.query(sql, newLocation);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating location:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Location';
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching locations:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM Location WHERE ID = ?';
    const [result] = await db.query(sql, [id]);
    res.json(result);
  } catch (err) {
    console.error('Error deleting location:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

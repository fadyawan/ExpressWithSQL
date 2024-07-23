const db = require('../../config/db');

exports.createLocationType = async (req, res) => {
  try {
    const newLocationType = req.body;
    const sql = 'INSERT INTO Location_Type SET ?';
    const [result] = await db.query(sql, newLocationType);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating location type:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllLocationTypes = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Location_Type';
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching location types:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteLocationType = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM Location_Type WHERE ID = ?';
    const [result] = await db.query(sql, [id]);
    res.json(result);
  } catch (err) {
    console.error('Error deleting location type:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

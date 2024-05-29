const db = require('../config/db');

exports.createHotel = async (req, res) => {
  try {
    const newHotel = req.body;
    const sql = 'INSERT INTO Hotel SET ?';
    const [result] = await db.query(sql, newHotel);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating hotel:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Hotel';
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM Hotel WHERE ID = ?';
    const [result] = await db.query(sql, [id]);
    res.json(result);
  } catch (err) {
    console.error('Error deleting hotel:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

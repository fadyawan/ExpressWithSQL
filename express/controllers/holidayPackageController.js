const db = require('../config/db');

exports.createHolidayPackage = async (req, res) => {
  try {
    const newPackage = req.body;
    const sql = 'INSERT INTO Holiday_Package SET ?';
    const [result] = await db.query(sql, newPackage);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating holiday package:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllHolidayPackages = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Holiday_Package';
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching holiday packages:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteHolidayPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM Holiday_Package WHERE ID = ?';
    const [result] = await db.query(sql, [id]);
    res.json(result);
  } catch (err) {
    console.error('Error deleting holiday package:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

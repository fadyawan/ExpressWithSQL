const db = require('../config/db');

exports.createHotel = async (req, res) => {
  const { Hotel_Name, Location_Name, Country, Location_Type, Price_Per_Night } = req.body;

  try {
    const [locationTypeResult] = await db.query('SELECT ID FROM Location_Type WHERE Type = ?', [Location_Type]);
    if (locationTypeResult.length === 0) {
      return res.status(400).json({ message: 'Location type does not exist' });
    }
    const Location_Type_ID = locationTypeResult[0].ID;

    let [locationResult] = await db.query('SELECT ID FROM Location WHERE Name = ? AND Country = ?', [Location_Name, Country]);
    if (locationResult.length === 0) {
      const [insertLocationResult] = await db.query(
        'INSERT INTO Location (Name, Country, Location_Type_ID) VALUES (?, ?, ?)',
        [Location_Name, Country, Location_Type_ID]
      );
      locationResult = [{ ID: insertLocationResult.insertId }];
    }
    const Location_ID = locationResult[0].ID;

    await db.query(
      'INSERT INTO Hotel (Name, Location_ID, Price_Per_Night) VALUES (?, ?, ?)',
      [Hotel_Name, Location_ID, Price_Per_Night]
    );

    res.status(201).json({ message: 'Hotel created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the hotel' });
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

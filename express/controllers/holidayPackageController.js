const db = require('../models');

exports.createHolidayPackage = async (req, res) => {
  try {
    const newPackage = await db.HolidayPackage.create(req.body);
    res.status(201).json(newPackage);
  } catch (err) {
    console.error('Error creating holiday package:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllHolidayPackages = async (req, res) => {
  try {
    const packages = await db.HolidayPackage.findAll();
    res.json(packages);
  } catch (err) {
    console.error('Error fetching holiday packages:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteHolidayPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.HolidayPackage.destroy({ where: { ID: id } });
    if (result) {
      res.json({ message: 'Holiday package deleted successfully' });
    } else {
      res.status(404).json({ error: 'Holiday package not found' });
    }
  } catch (err) {
    console.error('Error deleting holiday package:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getHolidayPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const holidayPackage = await db.HolidayPackage.findByPk(id);
    if (holidayPackage) {
      res.json(holidayPackage);
    } else {
      res.status(404).json({ error: 'Holiday package not found' });
    }
  } catch (err) {
    console.error('Error fetching holiday package by ID:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateHolidayPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.HolidayPackage.update(req.body, {
      where: { ID: id }
    });
    if (updated) {
      const updatedHolidayPackage = await db.HolidayPackage.findByPk(id);
      res.json(updatedHolidayPackage);
    } else {
      res.status(404).json({ error: 'Holiday package not found' });
    }
  } catch (err) {
    console.error('Error updating holiday package:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

const db = require('../models');

exports.createActivity = async (req, res) => {
  try {
    const newActivity = await db.Activity.create(req.body);
    res.status(201).json(newActivity);
  } catch (err) {
    console.error('Error creating activity:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await db.Activity.findAll();
    res.json(activities);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Activity.destroy({ where: { ID: id } });
    if (result) {
      res.json({ message: 'Activity deleted successfully' });
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (err) {
    console.error('Error deleting activity:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await db.Activity.findByPk(id);
    if (activity) {
      res.json(activity);
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
    const [updated] = await db.Activity.update(req.body, {
      where: { ID: id }
    });
    if (updated) {
      const updatedActivity = await db.Activity.findByPk(id);
      res.json({ message: 'Activity updated successfully', activity: updatedActivity });
    } else {
      res.status(404).json({ error: 'Activity not found' });
    }
  } catch (err) {
    console.error('Error updating activity:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

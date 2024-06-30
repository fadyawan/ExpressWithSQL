const db = require('../config/db');

exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    const sql = 'INSERT INTO Customer SET ?';
    const [result] = await db.query(sql, newCustomer);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM Customer WHERE ID = ?';
    const [result] = await db.query(sql, [id]);
    res.json(result);
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const sql = 'SELECT * FROM Customer';
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM Customer WHERE ID = ?';
    const [results] = await db.query(sql, [id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('Error fetching customer by ID:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = req.body;
    const sql = 'UPDATE Customer SET ? WHERE ID = ?';
    const [result] = await db.query(sql, [updatedCustomer, id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Customer updated successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Database error' });
  }
};


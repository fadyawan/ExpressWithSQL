const db = require('../models');

exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = await db.Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.Customer.destroy({ where: { ID: id } });
    if (result) {
      res.json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await db.Customer.findAll();
    res.json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await db.Customer.findByPk(id);
    if (customer) {
      res.json(customer);
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
    const [updated] = await db.Customer.update(req.body, {
      where: { ID: id }
    });
    if (updated) {
      const updatedCustomer = await db.Customer.findByPk(id);
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

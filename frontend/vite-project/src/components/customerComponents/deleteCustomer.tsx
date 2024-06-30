import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { deleteData } from '../../services/dataService';

function DeleteCustomer() {
  const [customerId, setCustomerId] = useState('');

  const handleDeleteCustomer = async () => {
    try {
      if (!customerId.trim()) {
        alert('Please enter a valid Customer ID.');
        return;
      }

      await deleteData(`customers/${customerId}`);

      alert(`Customer with ID ${customerId} has been deleted successfully!`);
      setCustomerId('');
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('An error occurred while deleting the customer.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Delete Customer</h2>
      <TextField
        label="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeleteCustomer}
        style={{ marginTop: '20px' }}
      >
        Delete Customer
      </Button>
    </div>
  );
}

export default DeleteCustomer;

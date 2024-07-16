import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { deleteData } from '../../services/dataService';

const DeleteHolidayPackage = () => {
  const [packageIdentifier, setPackageIdentifier] = useState('');
  const [notification, setNotification] = useState('');

  const handleDeleteHolidayPackage = async () => {
    try {
      if (!packageIdentifier.trim()) {
        setNotification('Please enter a valid holiday package name or ID.');
        return;
      }

      const response = await deleteData(`holidayPackages/${packageIdentifier}`);
      
      if (response.message === 'Holiday package deleted successfully') {
        setNotification(`Holiday package with identifier ${packageIdentifier} deleted successfully!`);
        setPackageIdentifier('');
      } else {
        setNotification(`Failed to delete holiday package with identifier ${packageIdentifier}`);
      }
    } catch (error) {
      console.error('Error deleting holiday package:', error);
      setNotification('An error occurred while deleting the holiday package.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Delete Holiday Package</h2>
      <TextField
        label="Enter Holiday Package Name or ID"
        value={packageIdentifier}
        onChange={(e) => setPackageIdentifier(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeleteHolidayPackage}
        style={{ marginTop: '20px' }}
      >
        Delete Holiday Package
      </Button>
      {notification && <p style={{ marginTop: '10px', color: 'red' }}>{notification}</p>}
    </div>
  );
};

export default DeleteHolidayPackage;

import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { deleteData } from '../../services/dataService';

function DeleteHotel() {
  const [hotelIdentifier, setHotelIdentifier] = useState('');
  const [notification, setNotification] = useState('');

  const handleDeleteHotel = async () => {
    try {
      if (!hotelIdentifier.trim()) {
        setNotification('Please enter a valid hotel name or ID.');
        return;
      }

      const response = await deleteData(`hotels/${hotelIdentifier}`);
      
      if (response.message === 'Hotel deleted successfully') {
        setNotification(`Hotel with identifier ${hotelIdentifier} deleted successfully!`);
        setHotelIdentifier('');
      } else {
        setNotification(`Failed to delete hotel with identifier ${hotelIdentifier}`);
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setNotification('An error occurred while deleting the hotel.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Delete Hotel</h2>
      <TextField
        label="Enter Hotel Name or ID"
        value={hotelIdentifier}
        onChange={(e) => setHotelIdentifier(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeleteHotel}
        style={{ marginTop: '20px' }}
      >
        Delete Hotel
      </Button>
      {notification && <p style={{ marginTop: '10px', color: 'red' }}>{notification}</p>}
    </div>
  );
}

export default DeleteHotel;

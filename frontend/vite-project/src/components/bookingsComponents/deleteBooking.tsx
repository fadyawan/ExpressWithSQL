import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { deleteData } from '../../services/dataService';

function DeleteBooking() {
  const [bookingId, setBookingId] = useState('');

  const handleDeleteBooking = async () => {
    try {
      if (!bookingId.trim()) {
        alert('Please enter a valid Booking ID.');
        return;
      }

      await deleteData(`bookings/${bookingId}`);

      alert(`Booking with ID ${bookingId} has been deleted successfully!`);
      setBookingId('');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('An error occurred while deleting the booking.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Delete Booking</h2>
      <TextField
        label="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeleteBooking}
        style={{ marginTop: '20px' }}
      >
        Delete Booking
      </Button>
    </div>
  );
}

export default DeleteBooking;

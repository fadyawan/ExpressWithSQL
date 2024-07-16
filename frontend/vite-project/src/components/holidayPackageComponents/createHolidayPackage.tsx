import React, { useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';

const CreateHolidayPackage = () => {
  const [name, setName] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [numberOfNights, setNumberOfNights] = useState('');
  const [discount, setDiscount] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const holidayPackageData = {
      name: name,
      hotelId: hotelId,
      numberOfNights: parseInt(numberOfNights, 10),
      discount: parseFloat(discount),
    };

    try {
      const response = await fetch('http://localhost:3001/holidayPackages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(holidayPackageData),
      });

      if (response.ok) {
        alert('Holiday package created successfully!');
        setName('');
        setHotelId('');
        setNumberOfNights('');
        setDiscount('');
      } else {
        alert('Failed to create holiday package.');
      }
    } catch (error) {
      console.error('Error creating holiday package:', error);
      alert('An error occurred while creating the holiday package.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create Holiday Package</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Package Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Hotel ID"
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Number of Nights"
          type="number"
          value={numberOfNights}
          onChange={(e) => setNumberOfNights(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Discount (%)"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Create Holiday Package
        </Button>
      </form>
    </div>
  );
};

export default CreateHolidayPackage;

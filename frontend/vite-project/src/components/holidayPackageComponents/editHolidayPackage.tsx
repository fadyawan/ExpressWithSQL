import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { fetchData } from '../../services/dataService';

interface HolidayPackage {
  id: number;
  name: string;
  hotelId: string;
  numberOfNights: number;
  discount: number;
}

const EditHolidayPackage = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [holidayPackage, setHolidayPackage] = useState<HolidayPackage | null>(null);
  const [name, setName] = useState<string>('');
  const [hotelId, setHotelId] = useState<string>('');
  const [numberOfNights, setNumberOfNights] = useState<string>('');
  const [discount, setDiscount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSearchByName = async () => {
    try {
      const fetchedPackage = await fetchData(`holidayPackages/name/${searchName}`);
      setHolidayPackage(fetchedPackage);
      setName(fetchedPackage.name);
      setHotelId(fetchedPackage.hotelId);
      setNumberOfNights(fetchedPackage.numberOfNights.toString());
      setDiscount(fetchedPackage.discount.toString());
      setError(null);
    } catch (err) {
      console.error('Error fetching holiday package:', err);
      setError('Holiday package not found');
      setHolidayPackage(null);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !hotelId.trim() || !numberOfNights.trim() || !discount.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!holidayPackage) {
      alert('No holiday package selected.');
      return;
    }

    const updatedPackage = {
      name: name,
      hotelId: hotelId,
      numberOfNights: parseInt(numberOfNights, 10),
      discount: parseFloat(discount),
    };

    try {
      alert('Holiday package updated successfully!');
    } catch (error) {
      console.error('Error updating holiday package:', error);
      alert('An error occurred while updating the holiday package.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Holiday Package</h2>
      <TextField
        label="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearchByName} style={{ marginBottom: '20px' }}>
        Search
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {holidayPackage && (
        <>
          <TextField
            label="Package Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Hotel ID"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Number of Nights"
            type="number"
            value={numberOfNights}
            onChange={(e) => setNumberOfNights(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Discount (%)"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: '20px' }}>
            Update Holiday Package
          </Button>
        </>
      )}
    </div>
  );
};

export default EditHolidayPackage;

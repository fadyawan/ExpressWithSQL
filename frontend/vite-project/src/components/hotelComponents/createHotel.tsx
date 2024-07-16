import React, { useState, useEffect } from 'react';
import { Button, TextField, Autocomplete } from '@mui/material';
import { fetchData } from '../../services/dataService';

interface LocationType {
  ID: number;
  Type: string;
}

function CreateHotel() {
  const [name, setName] = useState('');
  const [locationType, setLocationType] = useState<LocationType | null>(null);
  const [pricePerNight, setPricePerNight] = useState<number | ''>('');
  const [availableLocationTypes, setAvailableLocationTypes] = useState<LocationType[]>([]);

  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const locationTypes = await fetchData('locationTypes');
        setAvailableLocationTypes(locationTypes);
      } catch (error) {
        console.error('Error fetching location types:', error);
      }
    };

    fetchLocationTypes();
  }, []);

  const handleCreateHotel = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name.trim() || !locationType || pricePerNight === '' || isNaN(parseInt(pricePerNight.toString()))) {
    alert('Please fill in all fields with valid values.');
    return;
  }

  const hotelData = {
    Name: name,
    Location_Type: locationType.ID,
    Price_Per_Night: parseInt(pricePerNight.toString(), 10),
  };

  try {
    const response = await fetch('http://localhost:3001/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotelData),
    });

    if (response.ok) {
      alert('Hotel created successfully!');
      setName('');
      setLocationType(null);
      setPricePerNight('');
    } else {
      alert('Failed to create hotel.');
    }
  } catch (error) {
    console.error('Error creating hotel:', error);
    alert('An error occurred while creating the hotel.');
  }
};


  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Hotel</h2>
      <form onSubmit={handleCreateHotel}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Autocomplete
          options={availableLocationTypes}
          getOptionLabel={(option) => option.Type}
          onChange={(e, value) => setLocationType(value)}
          renderInput={(params) => (
            <TextField {...params} label="Location Type" fullWidth margin="normal" required />
          )}
        />
        <TextField
          label="Price per Night"
          type="number"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(parseInt(e.target.value))}
          fullWidth
          margin="normal"
          required
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Create Hotel
        </Button>
      </form>
    </div>
  );
}

export default CreateHotel;

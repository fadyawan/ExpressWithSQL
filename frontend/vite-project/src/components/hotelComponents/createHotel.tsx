import React, { useState, useEffect } from 'react';
import { Button, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';

interface LocationType {
  ID: number;
  Type: string;
}

function CreateHotel() {
  const [name, setName] = useState('');
  const [locationType, setLocationType] = useState<LocationType | null>(null);
  const [locationName, setLocationName] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [pricePerNight, setPricePerNight] = useState<number | ''>('');
  const [availableLocationTypes, setAvailableLocationTypes] = useState<LocationType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/locationTypes');
        setAvailableLocationTypes(response.data);
      } catch (error) {
        console.error('Error fetching location types:', error);
      }
    };

    fetchLocationTypes();
  }, []);

  const handleCreateHotel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !locationType || !locationName.trim() || !locationCountry.trim() || pricePerNight === '' || isNaN(Number(pricePerNight))) {
      setError('Please fill in all fields with valid values.');
      return;
    }

    const hotelData = {
      Hotel_Name: name,
      Location_Name: locationName,
      Country: locationCountry,
      Location_Type: locationType.Type,
      Price_Per_Night: parseFloat(pricePerNight.toString()),
    };

    try {
      const response = await axios.post('http://localhost:3001/hotels', hotelData);

      if (response.status === 201) {
        alert('Hotel created successfully!');
        setName('');
        setLocationType(null);
        setLocationName('');
        setLocationCountry('');
        setPricePerNight('');
        setError(null);
      } else {
        alert('Failed to create hotel.');
      }
    } catch (error) {
      console.error('Error creating hotel:', error);
      setError('An error occurred while creating the hotel.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Hotel</h2>
      <form onSubmit={handleCreateHotel}>
        <TextField
          label="Hotel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location Name"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location Country"
          value={locationCountry}
          onChange={(e) => setLocationCountry(e.target.value)}
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
          onChange={(e) => setPricePerNight(e.target.value === '' ? '' : parseFloat(e.target.value))}
          fullWidth
          margin="normal"
          required
          InputProps={{ inputProps: { min: 0 } }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
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

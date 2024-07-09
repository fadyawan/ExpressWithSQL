import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import { fetchData, updateData } from '../../services/dataService';

interface Hotel {
  ID: number;
  Name: string;
  Location_Type: number;
  Price_Per_Night: number;
}

interface LocationType {
  ID: number;
  Type: string;
}

const EditHotel = () => {
  const [searchName, setSearchName] = useState('');
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [name, setName] = useState('');
  const [locationType, setLocationType] = useState<number | null>(null);
  const [pricePerNight, setPricePerNight] = useState('');
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const data = await fetchData('locationTypes');
        setLocationTypes(data);
      } catch (err) {
        console.error('Error fetching location types:', err);
      }
    };

    fetchLocationTypes();
  }, []);

  const handleSearchByName = async () => {
    try {
      const fetchedHotel = await fetchData(`hotels/name/${searchName}`);
      setHotel(fetchedHotel);
      setName(fetchedHotel.Name);
      setLocationType(fetchedHotel.Location_Type);
      setPricePerNight(fetchedHotel.Price_Per_Night.toString());
      setError(null);
    } catch (err) {
      console.error('Error fetching hotel:', err);
      setError('Hotel not found');
      setHotel(null);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !locationType || !pricePerNight.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!hotel) {
      alert('No hotel selected.');
      return;
    }

    const updatedHotel = {
      Name: name,
      Location_Type: locationType,
      Price_Per_Night: parseFloat(pricePerNight),
    };

    try {
      await updateData(`hotels/${hotel.ID}`, updatedHotel);
      alert('Hotel updated successfully!');
    } catch (error) {
      console.error('Error updating hotel:', error);
      alert('An error occurred while updating the hotel.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Hotel</h2>
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
      {hotel && (
        <>
          <TextField
            label="Hotel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Location Type"
            value={locationType ?? ''}
            onChange={(e) => setLocationType(Number(e.target.value))}
            fullWidth
            margin="normal"
            required
          >
            {locationTypes.map((type) => (
              <MenuItem key={type.ID} value={type.ID}>
                {type.Type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Price per Night"
            type="number"
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: '20px' }}>
            Update Hotel
          </Button>
        </>
      )}
    </div>
  );
};

export default EditHotel;

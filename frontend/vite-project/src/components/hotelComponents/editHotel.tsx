import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { fetchData } from '../../services/dataService';

interface Hotel {
  ID: number;
  Name: string;
  Location_Type: number;
  Price_Per_Night: number;
  Location_Name?: string;
  Country?: string;
}

interface LocationType {
  ID: number;
  Type: string;
}

const API_BASE_URL = 'http://localhost:3001';

const EditHotel = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [name, setName] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [locationType, setLocationType] = useState<number | null>(null);
  const [pricePerNight, setPricePerNight] = useState<string>('');
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const data: LocationType[] = await fetchData('locationTypes');
        setLocationTypes(data);
      } catch (err) {
        console.error('Error fetching location types:', err);
      }
    };

    fetchLocationTypes();
  }, []);

  const handleSearchByName = async () => {
    try {
      const fetchedHotel: Hotel[] = await fetchData(`hotels?name=${searchName}`);
      console.log(fetchedHotel)
      if (fetchedHotel.length === 0) {
        setError('Hotel not found');
        setHotel(null);
        return;
      }
      const hotelData: Hotel = fetchedHotel[0];
      setHotel(hotelData);
      setName(hotelData.Name);
      setLocationName(hotelData.Location_Name ?? '');
      setCountry(hotelData.Country ?? '');
      setLocationType(hotelData.Location_Type);
      setPricePerNight(hotelData.Price_Per_Night.toString());
      setError(null);
    } catch (err) {
      console.error('Error fetching hotel:', err);
      setError('Error fetching hotel');
      setHotel(null);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || !locationName.trim() || !country.trim() || locationType === null || !pricePerNight.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!hotel) {
      alert('No hotel selected.');
      return;
    }

    const updatedHotel = {
      Hotel_Name: name,
      Location_Name: locationName,
      Country: country,
      Location_Type: locationType,
      Price_Per_Night: parseFloat(pricePerNight),
    };

    try {
      await axios.put(`${API_BASE_URL}/hotels/${hotel.ID}`, updatedHotel);
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
            label="Location Name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
            {locationTypes.map((type: LocationType) => (
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

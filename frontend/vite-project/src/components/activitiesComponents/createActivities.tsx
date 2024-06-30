import React, { useState, useEffect } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import { fetchData } from '../../services/dataService';

interface Hotel {
  ID: number;
  Name: string;
}

function CreateActivity() {
  const [activityType, setActivityType] = useState('');
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isForKids, setIsForKids] = useState(false);
  const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotels = await fetchData('hotels');
        setAvailableHotels(hotels);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleCreateActivity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activityType.trim() || !hotel) {
      alert('Please fill in all fields.');
      return;
    }

    const activityData = {
      Activity_Type: activityType,
      Hotel_ID: hotel.ID,
      For_Kids: isForKids,
    };

    try {
      const response = await fetch('http://localhost:3001/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        alert('Activity created successfully!');
        setActivityType('');
        setHotel(null);
        setIsForKids(false);
      } else {
        alert('Failed to create activity.');
      }
    } catch (error) {
      console.error('Error creating activity:', error);
      alert('An error occurred while creating the activity.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Activity</h2>
      <form onSubmit={handleCreateActivity}>
        <TextField
          label="Activity Type"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Autocomplete
          options={availableHotels}
          getOptionLabel={(option) => `${option.Name} (ID: ${option.ID})`}
          onChange={(e, value) => setHotel(value)}
          renderInput={(params) => (
            <TextField {...params} label="Hotel" fullWidth margin="normal" required />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isForKids}
              onChange={(e) => setIsForKids(e.target.checked)}
            />
          }
          label="Is for Kids"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Create Activity
        </Button>
      </form>
    </div>
  );
}

export default CreateActivity;

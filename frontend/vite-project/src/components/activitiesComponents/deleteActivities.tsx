import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { fetchData, updateData } from '../../services/dataService';

interface Activity {
  ID: number;
  Name: string;
  Hotel_ID: number;
  For_Kids: boolean;
}

const EditActivity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activity, setActivity] = useState<Activity | null>(null);
  const [name, setName] = useState('');
  const [hotelId, setHotelId] = useState<number | null>(null);
  const [forKids, setForKids] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const fetchedActivity = await fetchData(`activities/name/${searchTerm}`);
      setActivity(fetchedActivity);
      setName(fetchedActivity.Name);
      setHotelId(fetchedActivity.Hotel_ID);
      setForKids(fetchedActivity.For_Kids);
      setError(null);
    } catch (err) {
      console.error('Error fetching activity:', err);
      setError('Activity not found');
      setActivity(null);
    }
  };

  const handleUpdate = async () => {
    if (!name.trim() || hotelId === null) {
      alert('Please fill in all fields.');
      return;
    }

    if (!activity) {
      alert('No activity selected.');
      return;
    }

    const updatedActivity = {
      Name: name,
      Hotel_ID: hotelId,
      For_Kids: forKids,
    };

    try {
      await updateData(`activities/${activity.ID}`, updatedActivity);
      alert('Activity updated successfully!');
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('An error occurred while updating the activity.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Activity</h2>
      <TextField
        label="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginBottom: '20px' }}>
        Search
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {activity && (
        <>
          <TextField
            label="Activity Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Hotel ID"
            type="number"
            value={hotelId ?? ''}
            onChange={(e) => setHotelId(Number(e.target.value))}
            fullWidth
            margin="normal"
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={forKids}
                onChange={(e) => setForKids(e.target.checked)}
              />
            }
            label="For Kids"
          />
          <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: '20px' }}>
            Update Activity
          </Button>
        </>
      )}
    </div>
  );
};

export default EditActivity;

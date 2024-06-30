import React, { useState, useEffect } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import { fetchData, updateData } from '../../services/dataService';

interface Hotel {
  ID: number;
  Name: string;
}

interface Activity {
  ID: number;
  Activity_Type: string;
  Hotel_ID: number;
  Is_For_Kids: boolean;
}

function EditActivity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activity, setActivity] = useState<Activity | null>(null);
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

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term.');
      return;
    }

    try {
      const activities = await fetchData(`activities?search=${searchTerm}`);
      if (activities.length > 0) {
        const foundActivity = activities[0];
        setActivity(foundActivity);
        setActivityType(foundActivity.Activity_Type);
        const associatedHotel = availableHotels.find(hotel => hotel.ID === foundActivity.Hotel_ID);
        setHotel(associatedHotel || null);
        setIsForKids(foundActivity.Is_For_Kids);
      } else {
        alert('No activity found with the given search term.');
      }
    } catch (error) {
      console.error('Error searching for activity:', error);
      alert('An error occurred while searching for the activity.');
    }
  };

  const handleUpdateActivity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activity || !activityType.trim() || !hotel) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedActivityData = {
      Activity_Type: activityType,
      Hotel_ID: hotel.ID,
      Is_For_Kids: isForKids,
    };

    try {
      const response = await updateData(`activities/${activity.ID}`, updatedActivityData);

      if (response) {
        alert('Activity updated successfully!');
        setActivity(null);
        setSearchTerm('');
        setActivityType('');
        setHotel(null);
        setIsForKids(false);
      } else {
        alert('Failed to update activity.');
      }
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('An error occurred while updating the activity.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Activity</h2>
      <TextField
        label="Search Activity"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginTop: '20px' }}
      >
        Search
      </Button>
      {activity && (
        <form onSubmit={handleUpdateActivity} style={{ marginTop: '20px' }}>
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
            value={hotel}
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
            Update Activity
          </Button>
        </form>
      )}
    </div>
  );
}

export default EditActivity;

import { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import { fetchData } from '../../services/dataService';

interface Hotel {
  ID: number;
  Name: string;
}

interface Activity {
  ID: number;
  Activity_Type: string;
  Hotel_ID: number;
  For_Kids: boolean;
}

interface Package {
  ID: number;
  Name: string;
  Hotel_ID: number;
  Number_Of_Nights: number;
  Discount: string;
}

function createBooking() {
  const [customerID, setCustomerID] = useState('');
  const [packageID, setPackageID] = useState<Package | null>(null);
  const [dateStart, setDateStart] = useState('');
  const [allInclusive, setAllInclusive] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [availableHotels, setAvailableHotels] = useState<Hotel[]>([]);
  const [availableActivities, setAvailableActivities] = useState<Activity[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [availablePackages, setAvailablePackages] = useState<Package[]>([]);

  const handleSearchHotels = async () => {
    try {
      const hotels = await fetchData('hotels');
      setAvailableHotels(hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleSearchActivities = async () => {
    try {
      const activities = await fetchData('activities');
      setAvailableActivities(activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleSearchPackages = async () => {
    try {
      const packages = await fetchData('holidayPackages');
      setAvailablePackages(packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleCreateBooking = async () => {
    if (!selectedHotel || selectedActivities.length === 0 || !packageID) {
      alert('Please select a valid hotel, package, and at least one activity');
      return;
    }

    const hotelExists = availableHotels.some(hotel => hotel.ID === selectedHotel.ID);
    const activitiesExist = selectedActivities.every(activity =>
      availableActivities.some(a => a.ID === activity.ID)
    );

    if (!hotelExists || !activitiesExist) {
      alert('Selected hotel or activities do not exist.');
      return;
    }

    const bookingData = {
      Customer_ID: customerID,
      Package_ID: packageID.ID,
      Date_Start: dateStart,
      All_Inclusive: allInclusive,
      Activities: selectedActivities.map(activity => ({ Activity_Type: activity.Activity_Type, For_Kids: activity.For_Kids })),
    };

    try {
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert('Booking created successfully!');
        setCustomerID('');
        setPackageID(null);
        setDateStart('');
        setAllInclusive(false);
        setSelectedHotel(null);
        setSelectedActivities([]);
      } else {
        alert('Failed to create booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred while creating the booking.');
    }
  };

  useEffect(() => {
    handleSearchHotels();
    handleSearchActivities();
    handleSearchPackages();
  }, []);

  return (
    <div>
      <h1>Create Booking</h1>
      <form>
        <TextField
          label="Customer ID"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Autocomplete
          options={availablePackages}
          getOptionLabel={(option) => option.Name}
          onChange={(e, value) => setPackageID(value)}
          renderOption={(props, option) => (
            <li {...props} key={option.ID}>
              {option.Name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Package" margin="normal" fullWidth />
          )}
        />
        <TextField
          label="Start Date"
          type="date"
          value={dateStart}
          onChange={(e) => setDateStart(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={allInclusive}
              onChange={(e) => setAllInclusive(e.target.checked)}
            />
          }
          label="All Inclusive"
        />
        <Autocomplete
          options={availableHotels}
          getOptionLabel={(option) => option.Name}
          onChange={(e, value) => setSelectedHotel(value)}
          renderOption={(props, option) => (
            <li {...props} key={option.ID}>
              {option.Name}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Hotel" margin="normal" fullWidth />
          )}
        />
        <Autocomplete
          multiple
          options={availableActivities}
          getOptionLabel={(option) => option.Activity_Type}
          onChange={(e, value) => setSelectedActivities(value)}
          renderOption={(props, option) => (
            <li {...props} key={option.ID}>
              {option.Activity_Type}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Activities" margin="normal" fullWidth />
          )}
        />
        <Button variant="contained" color="primary" onClick={handleCreateBooking} style={{ marginTop: '20px' }}>
          Create Booking
        </Button>
      </form>
    </div>
  );
}

export default createBooking;

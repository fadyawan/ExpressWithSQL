import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

const genders = ['Male', 'Female', 'Other'];

const CreateCustomer: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleGenderChange = (e: SelectChangeEvent<string>) => {
    setGender(e.target.value as string);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleCreateCustomer = async () => {
    const newCustomer = {
      First_Name: firstName,
      Surname: surname,
      Gender: gender,
      Country: country,
    };

    try {
      const response = await fetch('http://localhost:3001/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        alert('Customer created successfully!');
        setFirstName('');
        setSurname('');
        setGender('');
        setCountry('');
      } else {
        alert('Failed to create customer.');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('An error occurred while creating the customer.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Create Customer</h1>
      <form>
        <TextField
          label="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Surname"
          value={surname}
          onChange={handleSurnameChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={handleGenderChange}
            fullWidth
          >
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Country"
          value={country}
          onChange={handleCountryChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateCustomer} style={{ marginTop: '20px' }}>
          Create Customer
        </Button>
      </form>
    </div>
  );
}

export default CreateCustomer;

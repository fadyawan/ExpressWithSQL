import React, { useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import { fetchData, updateData } from '../../services/dataService';

interface Customer {
  ID: number;
  FirstName: string;
  Surname: string;
  Gender: string;
  Country: string;
}

const EditCustomer = () => {
  const [searchName, setSearchName] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  const handleSearchByName = async () => {
    try {
      const fetchedCustomer = await fetchData(`customers/name/${searchName}`);
      const customerId = fetchedCustomer.ID;
      const customerDetails = await fetchData(`customers/${customerId}`);
      setCustomer(customerDetails);
      setFirstName(customerDetails.FirstName);
      setSurname(customerDetails.Surname);
      setGender(customerDetails.Gender);
      setCountry(customerDetails.Country);
    } catch (error) {
      console.error('Error fetching customer:', error);
      alert('Customer not found');
    }
  };

  const handleUpdate = async () => {
    if (!firstName.trim() || !surname.trim() || !country.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    if (!customer) {
      alert('No customer selected.');
      return;
    }

    const updatedCustomer = {
      FirstName: firstName,
      Surname: surname,
      Gender: gender,
      Country: country,
    };

    try {
      await updateData(`customers/${customer.ID}`, updatedCustomer);
      alert('Customer updated successfully!');
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('An error occurred while updating the customer.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Customer</h2>
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
      {customer && (
        <>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: '20px' }}>
            Update Customer
          </Button>
        </>
      )}
    </div>
  );
};

export default EditCustomer;

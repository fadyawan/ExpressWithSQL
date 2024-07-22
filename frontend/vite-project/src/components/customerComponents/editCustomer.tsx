import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { fetchData } from '../../services/dataService';

interface Customer {
  ID: number;
  FirstName: string;
  Surname: string;
  Gender: string;
  Country: string;
}

const API_BASE_URL = 'http://localhost:3001';

const EditCustomer = () => {
  const [firstNameSearch, setFirstNameSearch] = useState('');
  const [surnameSearch, setSurnameSearch] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const customerList = await fetchData('customers');
        setCustomers(customerList);
      } catch (error) {
        console.error('Error fetching customers:', error);
        alert('An error occurred while fetching customers.');
      }
    };

    fetchAllCustomers();
  }, []);

  const handleSearchByName = async () => {
    try {
      if (!firstNameSearch.trim() || !surnameSearch.trim()) {
        alert('Please enter both first name and surname.');
        return;
      }

      const searchedCustomer = customers.find(
        (cust) =>
          cust.FirstName.toLowerCase() === firstNameSearch.toLowerCase() &&
          cust.Surname.toLowerCase() === surnameSearch.toLowerCase()
      );

      if (searchedCustomer) {
        const customerDetails = await fetchData(`customers/${searchedCustomer.ID}`);
        setCustomer(customerDetails);
        setFirstName(customerDetails.FirstName);
        setSurname(customerDetails.Surname);
        setGender(customerDetails.Gender);
        setCountry(customerDetails.Country);
      } else {
        alert('Customer not found');
      }
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
      await axios.put(`${API_BASE_URL}/customers/${customer.ID}`, updatedCustomer);
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
        label="First Name"
        value={firstNameSearch}
        onChange={(e) => setFirstNameSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Surname"
        value={surnameSearch}
        onChange={(e) => setSurnameSearch(e.target.value)}
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

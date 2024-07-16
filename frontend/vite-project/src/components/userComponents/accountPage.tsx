import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem('username');
  const accessLevel = localStorage.getItem('accessLevel');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('accessLevel');

    navigate('/login');
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4">Account Information</Typography>
      <Typography variant="h6">Username: {username}</Typography>
      <Typography variant="h6">Access Level: {accessLevel}</Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout} 
        style={{ marginTop: '20px' }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default AccountPage;

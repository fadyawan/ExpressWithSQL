import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hotel Service
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        
        {isLoggedIn && (
          <>
            <Button color="inherit" onClick={() => navigate('/hotels')}>Hotels</Button>
            <Button color="inherit" onClick={() => navigate('/bookings')}>Bookings</Button>
            <Button color="inherit" onClick={() => navigate('/customers')}>Customers</Button>
            <Button color="inherit" onClick={() => navigate('/activities')}>Activities</Button>
            <Button color="inherit" onClick={() => navigate('/holiday-packages')}>Holiday Packages</Button>
          </>
        )}
        
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleAccountClick}>Account</Button>
        ) : (
          <Button color="inherit" onClick={handleLoginClick}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

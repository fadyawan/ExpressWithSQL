import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('accessLevel', response.data.accessLevel);
        setAccessLevelExpiration();

        navigate('/');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('An error occurred during login.');
    }
  };

  const setAccessLevelExpiration = () => {
    const expirationTime = Date.now() + 3600000;
    localStorage.setItem('accessLevelExpiration', expirationTime.toString());
  };

  const isAccessLevelValid = () => {
    const expirationTime = localStorage.getItem('accessLevelExpiration');
    return expirationTime && Date.now() < parseInt(expirationTime);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Typography variant="h4">Login</Typography>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ maxWidth: '400px', width: '100%' }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Login
        </Button>
      </form>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={() => navigate('/register')} 
        style={{ marginTop: '20px' }}
      >
        Register
      </Button>
    </div>
  );
};

export default LoginPage;

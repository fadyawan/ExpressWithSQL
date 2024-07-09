import React, { useState } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';
import { fetchData } from './services/dataService';
import { Route, BrowserRouter as Router, Routes, redirect } from 'react-router-dom';
import homePage from './components/homePage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await fetchData('auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username,
          password,
        },
      });

      if (response.error) {
        setError(response.error);
      } else {
        console.log('Login successful:', response);
        setLoggedIn(true);
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred while logging in.');
    }
  };

  if (loggedIn) {
    return <redirect to="/homepage" />;
  }

  return (
    <Router>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ marginTop: '20px' }}
          >
            Login
          </Button>
          {error && <p>{error}</p>}
        </Box>
      </Container>
      <Routes>
            <Route path="/homepage" element={<homePage />} />
      </Routes>
    </Router>
  );
};

export default Login;

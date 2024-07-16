import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h2" gutterBottom>
          Welcome to Hotel Service Management
        </Typography>
        <Typography variant="h5" paragraph>
          Our application helps manage all aspects of a hotel business, including:
        </Typography>
        <Typography variant="body1" paragraph>
            Hotels: Manage hotel details, add new hotels, edit existing ones, and delete hotels.
        </Typography>
        <Typography variant="body1" paragraph>
            Customers: Manage customer information, register new customers, and edit or delete customer details.
        </Typography>
        <Typography variant="body1" paragraph>
            Activities: Manage activities offered by the hotel, create new activities, and edit or delete existing activities.
        </Typography>
        <Typography variant="body1" paragraph>
            Holiday Packages: Create and manage holiday packages that include hotel stays, activities, and special discounts.
        </Typography>
        <Typography variant="body1" paragraph>
            Bookings: Handle room bookings, manage existing bookings, and ensure seamless booking experiences for customers.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Start managing your hotel services efficiently and effectively with our comprehensive tool.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;

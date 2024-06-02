const express = require('express');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customers');
const hotelRoutes = require('./routes/hotels');
const locationRoutes = require('./routes/locations');
const locationTypeRoutes = require('./routes/locationTypes');
const activityRoutes = require('./routes/activities');
const holidayPackageRoutes = require('./routes/holidayPackages');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Hotel Service API');
});

app.use('/customers', customerRoutes);
app.use('/hotels', hotelRoutes);
app.use('/locations', locationRoutes);
app.use('/locationTypes', locationTypeRoutes);
app.use('/activities', activityRoutes);
app.use('/holidayPackages', holidayPackageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// create a service, createBooking, configureHotels, with error handling
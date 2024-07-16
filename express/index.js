const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const customerRoutes = require('./routes/customers');
const hotelRoutes = require('./routes/hotels');
const locationRoutes = require('./routes/locations');
const locationTypeRoutes = require('./routes/locationTypes');
const activityRoutes = require('./routes/activities');
const holidayPackageRoutes = require('./routes/holidayPackages');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/userRoutes')

const app = express();
const allowedOrigins = ['https://localhost:3001/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Hotel Service API');
});

app.use('/customers', customerRoutes);
app.use('/hotels', hotelRoutes);
app.use('/locations', locationRoutes);
app.use('/locationTypes', locationTypeRoutes);
app.use('/activities', activityRoutes);
app.use('/holidayPackages', holidayPackageRoutes);
app.use('/bookings', bookingRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
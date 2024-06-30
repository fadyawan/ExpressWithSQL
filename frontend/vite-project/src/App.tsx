import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookingsList from './components/bookingsComponents/bookingsList';
import CreateBooking from './components/bookingsComponents/createBooking';
import DeleteBooking from './components/bookingsComponents/deleteBooking';
import EditBooking from './components/bookingsComponents/editBooking';
import CustomerList from './components/customerComponents/customerList';
import CreateCustomer from './components/customerComponents/createCustomer';
import DeleteCustomer from './components/customerComponents/deleteCustomer';
import EditCustomer from './components/customerComponents/editCustomer';
import HotelList from './components/hotelComponents/hotelList';
import CreateHotel from './components/hotelComponents/createHotel';
import DeleteHotel from './components/hotelComponents/deleteHotel';
import ActivityList from './components/activitiesComponents/activityList';
import CreateActivity from './components/activitiesComponents/createActivities';
import EditActivity from './components/activitiesComponents/editActivities';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/bookings">Bookings</Link>
              </li>
              <li>
                <Link to="/create-bookings">Create Boooking</Link>
              </li>
              <li>
                <Link to="/delete-bookings">Delete Boooking</Link>
              </li>
              <li>
                <Link to="/edit-bookings">Edit Boooking</Link>
              </li>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
              <li>
                <Link to="/create-customer">Create Customer</Link>
              </li>
              <li>
                <Link to="/delete-customer">Delete Customer</Link>
              </li>
              <li>
                <Link to="/edit-customer">Edit Customer</Link>
              </li>
              <li>
                <Link to="/hotels">Hotels</Link>
              </li>
              <li>
                <Link to="/create-hotel">Create Hotel</Link>
              </li>
              <li>
                <Link to="/delete-hotel">Delete Hotel</Link>
              </li>
              <li>
                <Link to="/edit-hotel">Edit Hotel</Link>
              </li>
              <li>
                <Link to="/activities">Activities</Link>
              </li>
              <li>
                <Link to="/create-activity">Create Activity</Link>
              </li>
              <li>
                <Link to="/delete-activity">Delete Activity</Link>
              </li>
              <li>
                <Link to="/edit-activity">Edit Activity</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/bookings" element={<BookingsList />} />
            <Route path="/create-bookings" element={<CreateBooking />} />
            <Route path="/delete-bookings" element={<DeleteBooking />} />
            <Route path="/edit-bookings" element={<EditBooking />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/create-customer" element={<CreateCustomer />} />
            <Route path="/delete-customer" element={<DeleteCustomer />} />
            <Route path="/edit-customer" element={<EditCustomer />} />
            <Route path="/hotels" element={<CustomerList />} />
            <Route path="/create-hotel" element={<CreateHotel />} />
            <Route path="/delete-hotel" element={<DeleteHotel />} />
            {/* <Route path="/edit-hotel" element={< />} /> */}
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/create-activity" element={<CreateActivity />} />
            <Route path="/delete-activity" element={<DeleteHotel />} />
            <Route path="/edit-activity" element={<EditActivity />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

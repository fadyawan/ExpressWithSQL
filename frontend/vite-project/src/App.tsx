import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HotelList from './components/hotelList';
import ActivityList from './components/activityList';
import BookingsList from './components/bookingsList';
import CreateBooking from './components/createBooking';
import DeleteBooking from './components/deleteBooking';
import EditBooking from './components/editBooking';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/hotels">Hotels</Link>
              </li>
              <li>
                <Link to="/activities">Activities</Link>
              </li>
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
            </ul>
          </nav>
          <Routes>
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/bookings" element={<BookingsList />} />
            <Route path="/create-bookings" element={<CreateBooking />} />
            <Route path="/delete-bookings" element={<DeleteBooking />} />
            <Route path="/edit-bookings" element={<EditBooking />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HotelList from './components/hotelList';
import LocationList from './components/locationList';
import LocationTypeList from './components/locationTypeList';
import ActivityList from './components/activityList';
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
              <Link to="/locations">Locations</Link>
            </li>
            <li>
              <Link to="/locationTypes">Location Types</Link>
            </li>
            <li>
              <Link to="/activities">Activities</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/locationTypes" element={<LocationTypeList />} />
          <Route path="/activities" element={<ActivityList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

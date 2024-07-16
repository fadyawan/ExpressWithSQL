import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Navbar from './components/navBar';
import HomePage from './components/homePage';
import LoginPage from './components/userComponents/loginPage';
import RegisterPage from './components/userComponents/registerPage';
import AccountPage from './components/userComponents/accountPage';
import HolidayPackage from './components/holidayPackageComponents/HolidayPackageHome';
import CreateHolidayPackage from './components/holidayPackageComponents/createHolidayPackage';
import EditHolidayPackage from './components/holidayPackageComponents/editHolidayPackage';
import DeleteHolidayPackage from './components/holidayPackageComponents/deleteHolidayPackage';
import HotelList from './components/hotelComponents/hotelHome';
import CreateHotel from './components/hotelComponents/createHotel';
import EditHotel from './components/hotelComponents/editHotel';
import DeleteHotel from './components/hotelComponents/deleteHotel';
import CreateCustomer from './components/customerComponents/createCustomer';
import CustomerList from './components/customerComponents/customerHome';
import EditCustomer from './components/customerComponents/editCustomer';
import DeleteCustomer from './components/customerComponents/deleteCustomer';
import CreateActivity from './components/activitiesComponents/createActivities';
import ActivityList from './components/activitiesComponents/activityHome';
import EditActivity from './components/activitiesComponents/editActivities';
import DeleteActivity from './components/activitiesComponents/deleteActivities';
import CreateBooking from './components/bookingsComponents/createBooking';
import BookingList from './components/bookingsComponents/bookingsHome';
import EditBooking from './components/bookingsComponents/editBooking';
import DeleteBooking from './components/bookingsComponents/deleteBooking';

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/create" element={<CreateHotel />} />
        <Route path="/hotels/edit/:id" element={<EditHotel />} />
        <Route path="/hotels/delete/:id" element={<DeleteHotel />} />
        
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CreateCustomer />} />
        <Route path="/customers/edit/:id" element={<EditCustomer />} />
        <Route path="/customers/delete/:id" element={<DeleteCustomer />} />
        
        <Route path="/activities" element={<ActivityList />} />
        <Route path="/activities/create" element={<CreateActivity />} />
        <Route path="/activities/edit/:id" element={<EditActivity />} />
        <Route path="/activities/delete/:id" element={<DeleteActivity />} />
        
        <Route path="/holiday-packages" element={<HolidayPackage />} />
        <Route path="/holiday-packages/create" element={<CreateHolidayPackage />} />
        <Route path="/holiday-packages/edit/:id" element={<EditHolidayPackage />} />
        <Route path="/holiday-packages/delete/:id" element={<DeleteHolidayPackage />} />
        
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/create" element={<CreateBooking />} />
        <Route path="/bookings/edit/:id" element={<EditBooking />} />
        <Route path="/bookings/delete/:id" element={<DeleteBooking />} />
      </Routes>
    </div>
  );
};

const MainApp: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MainApp;

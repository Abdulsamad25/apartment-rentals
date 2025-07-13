import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SavedApartmentsProvider } from './context/SavedApartmentContext';
import Home from './pages/Home';
import Apartments from './pages/Apartments';
import ApartmentDetails from './pages/ApartmentDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import SavedApartments from './pages/SavedApartments';
import YourRentals from './pages/YourRentals';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ContactUsPage from './pages/ContactUsPage';
import BookingSuccess from './pages/BookingSuccess';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);
  return (
    <SavedApartmentsProvider>
      <div className="flex flex-col min-h-screen App">
        <Navbar />

        <div className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/apartments" element={<Apartments />} />
             <Route path="/apartments/:id" element={<ApartmentDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-booking" element={<ContactUsPage />} />
            <Route path="/booking-success" element={<BookingSuccess />} />

            {/* User Dashboard Routes */}
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/saved-apartments" element={<SavedApartments />} />
            <Route path="/rentals" element={<YourRentals />} />
            <Route path="/profile-settings" element={<ProfileSettingsPage />} />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/general-dashboard" element={<Dashboard />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </SavedApartmentsProvider>
  );
};
export default App;

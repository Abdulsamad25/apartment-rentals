import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const { user, role, userProfile, loading } = useContext(AppContext);

  useEffect(() => {
    const bookingSuccess = sessionStorage.getItem('bookingSuccess');
    if (bookingSuccess === 'true') {
      toast.success('Booking confirmed! Welcome to your dashboard.');
      sessionStorage.removeItem('bookingSuccess');
    }
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (!['user', 'admin'].includes(role?.trim().toLowerCase())) {
    return (
      <p className="p-6 text-red-500">
        Access denied. Only users and admins can view this page. (Your role: <strong>{role}</strong>)
      </p>
    );
  }

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <ToastContainer />
      <div className="bg-white shadow-md mx-auto p-6 rounded-xl max-w-4xl">
        <h1 className="mb-4 font-bold text-gray-800 text-2xl">
          Welcome, {userProfile?.name || user?.displayName || user?.email || 'User'}!
        </h1>

        <div className="gap-6 grid md:grid-cols-2">
          {/* Saved Apartments */}
          <div className="bg-blue-50 shadow-sm p-4 rounded-lg">
            <h2 className="mb-2 font-semibold text-lg">Saved Apartments</h2>
            <p className="mb-4 text-gray-600 text-sm">View apartments you've liked or saved.</p>
            <Link to="/saved-apartments" className="font-medium text-blue-600">
              View Apartments
            </Link>
          </div>

          {/* Your Rentals */}
          <div className="bg-green-50 shadow-sm p-4 rounded-lg">
            <h2 className="mb-2 font-semibold text-lg">Your Rentals</h2>
            <p className="mb-4 text-gray-600 text-sm">Track your current or past rentals.</p>
            <Link to="/rentals" className="font-medium text-green-600">
              View Rentals
            </Link>
          </div>

          {/* Profile Settings */}
          <div className="bg-yellow-50 shadow-sm p-4 rounded-lg">
            <h2 className="mb-2 font-semibold text-lg">Profile Settings</h2>
            <p className="mb-4 text-gray-600 text-sm">Update your name, email, and password.</p>
            <Link to="/profile-settings" className="font-medium text-yellow-600">
              Go to Settings
            </Link>
          </div>

          {/* Support */}
          <div className="bg-red-50 shadow-sm p-4 rounded-lg">
            <h2 className="mb-2 font-semibold text-lg">Need Help?</h2>
            <p className="mb-4 text-gray-600 text-sm">Contact us for any support.</p>
            <Link to="/contact" className="font-medium text-red-600">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

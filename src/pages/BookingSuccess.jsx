import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 px-4 py-10 min-h-screen text-center">
      <CheckCircle className="mb-4 w-16 h-16 text-green-500" />
      <h1 className="mb-2 font-bold text-gray-800 text-2xl">Booking Confirmed!</h1>
      <p className="mb-6 text-gray-600">
        Thank you! Your apartment has been booked successfully.
      </p>
      <Link
        to="/user-dashboard"
        className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default BookingSuccess;

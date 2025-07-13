import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApartments } from '../context/ApartmentsContext';
import { AppContext } from '../context/AppContext';
import { CreditCard, Home, User } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import { useRentals } from '../context/RentalsContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUsPage = () => {
  const { user } = useContext(AppContext);
  const { apartments, updateApartment } = useApartments();
  const { addRental } = useRentals();
  const location = useLocation();
  const navigate = useNavigate();

  const apartmentId = location.state?.apartmentId;
  const selectedApartment = apartments.find((apt) => apt.id === apartmentId);

  if (!selectedApartment) {
    return (
      <div className="p-8 font-medium text-red-500 text-center">
        Apartment not found. Go back to{' '}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => navigate('/apartments')}
        >
          listings
        </span>.
      </div>
    );
  }

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxx';
  const email = user?.email || 'test@example.com';
  const amount = selectedApartment.price ? Math.round(selectedApartment.price * 100) : 50000;

  const handleSuccess = (reference) => {
    console.log('Payment successful:', reference);
    toast.success('Payment successful! Booking confirmed.');

    // Update availability
    updateApartment(selectedApartment.id, {
      ...selectedApartment,
      available: false,
    });

    // Add rental (for 3 days)
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000); // +3 days

    addRental({
      id: selectedApartment.id,
      title: selectedApartment.name,
      location: selectedApartment.location,
      price: `₦${selectedApartment.price.toLocaleString()}`,
      status: 'active',
      image: selectedApartment.imageUrl,
      startDate,
      endDate,
      reference: reference.reference,
    });

    // Redirect after short delay
    setTimeout(() => navigate('/booking-success'), 1500);
  };

  const handleClose = () => {
    console.log('Payment cancelled');
    toast.info('Payment was cancelled.');
  };

  const paystackProps = {
    email,
    amount,
    publicKey,
    text: 'Pay with Paystack',
    onSuccess: handleSuccess,
    onClose: handleClose,
    currency: 'NGN',
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    metadata: {
      custom_fields: [
        {
          display_name: 'Apartment Name',
          variable_name: 'apartment_name',
          value: selectedApartment.name,
        },
        {
          display_name: 'Customer Name',
          variable_name: 'customer_name',
          value: user?.displayName || 'Guest User',
        },
      ],
    },
  };

  return (
    <div className="bg-gray-50 px-4 sm:px-8 lg:px-16 py-10 min-h-screen">
      <ToastContainer />
      <div className="bg-white shadow-lg mx-auto p-6 sm:p-10 rounded-xl max-w-4xl">
        <h2 className="mb-6 font-bold text-emerald-600 text-xl sm:text-2xl">
          Confirm Booking
        </h2>

        {/* Apartment Info */}
        <div className="bg-slate-50 mb-8 p-4 sm:p-6 border rounded-lg text-sm sm:text-base">
          <div className="flex items-center gap-3 mb-2 font-semibold text-emerald-700">
            <Home className="w-5 h-5" />
            <span>{selectedApartment.name}</span>
          </div>
          <p className="text-gray-600">{selectedApartment.location}</p>
          <p className="mt-2 text-gray-600">
            Price:{' '}
            <span className="font-bold text-emerald-600 text-lg">
              ₦{selectedApartment.price.toLocaleString()}
            </span>
            /month
          </p>
          <p
            className={`mt-1 text-sm font-medium ${
              selectedApartment.available ? 'text-emerald-500' : 'text-red-500'
            }`}
          >
            {selectedApartment.available ? 'Available' : 'Unavailable'}
          </p>
        </div>

        {/* User Info */}
        <div className="bg-slate-50 mb-6 p-4 sm:p-6 border rounded-lg">
          <div className="flex items-center gap-3 mb-2 font-medium text-emerald-600">
            <User className="w-5 h-5" />
            <span>Booking Details</span>
          </div>
          <div className="text-gray-600 text-sm sm:text-base">
            <p>Name: {user?.displayName || 'Guest User'}</p>
            <p>Email: {email}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-slate-50 mb-8 p-4 sm:p-6 border rounded-lg text-sm sm:text-base">
          <div className="flex items-center gap-3 mb-3 font-medium text-emerald-600">
            <CreditCard className="w-5 h-5" />
            <span>Select Payment Option</span>
          </div>

          {/* Test Card Info */}
          <div className="bg-yellow-50 mb-4 p-3 border border-yellow-200 rounded text-xs">
            <p><strong>Test Mode:</strong> Use test card details</p>
            <p><strong>Amount:</strong> ₦{(amount / 100).toLocaleString()}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>

          <div className="flex">
            <PaystackButton
              className="inline-block bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer"
              {...paystackProps}
            />
          </div>

          <div className="bg-blue-50 mt-4 p-3 border border-blue-200 rounded text-xs">
            <p><strong>Test Card:</strong> 4084080000000409</p>
            <p><strong>Expiry:</strong> Any future date | <strong>CVV:</strong> 000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  ArrowRightCircle,
  RefreshCcw,
  XCircle,
  MinusCircle,
} from 'lucide-react';
import { useRentals } from '../context/RentalsContext';
import { toast } from 'react-toastify';
import { useApartments } from '../context/ApartmentsContext';

const YourRentals = () => {
  const { rentals, updateRental } = useRentals();
  const [localRentals, setLocalRentals] = useState([]);
  const navigate = useNavigate();
  const { toggleAvailability } = useApartments();

  useEffect(() => {
    setLocalRentals(rentals || []);
  }, [rentals]);

  const handleViewDetails = (id) => {
    navigate(`/apartments/${id}`);
  };

  const adjustRentalEndDate = (id, value, unit, operation = 'add') => {
    const updated = localRentals.map((rental) => {
      if (rental.id === id) {
        const rawEndDate = new Date(rental.endDate);
        if (isNaN(rawEndDate.getTime())) {
          toast.error('Invalid end date.');
          return rental;
        }

        const newEndDate = new Date(rawEndDate);
        const sign = operation === 'subtract' ? -1 : 1;

        switch (unit) {
          case 'days':
            newEndDate.setDate(newEndDate.getDate() + sign * value);
            break;
          case 'weeks':
            newEndDate.setDate(newEndDate.getDate() + sign * value * 7);
            break;
          case 'months':
            newEndDate.setMonth(newEndDate.getMonth() + sign * value);
            break;
          case 'years':
            newEndDate.setFullYear(newEndDate.getFullYear() + sign * value);
            break;
          default:
            toast.error('Invalid time unit.');
            return rental;
        }

        toast.success(`${operation === 'add' ? 'Renewed' : 'Reduced'} by ${value} ${unit}`);
        return { ...rental, endDate: newEndDate.toISOString() };
      }
      return rental;
    });

    setLocalRentals(updated);
    updateRental(updated);
  };

  const latestRentalsRef = useRef(rentals);
  useEffect(() => {
    latestRentalsRef.current = rentals;
  }, [rentals]);

  const handleCancelRental = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2 text-center">
          <p className="font-medium text-sm">Cancel this booking?</p>
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={() => {
                const updated = latestRentalsRef.current.filter((r) => r.id !== id);
                updateRental(updated);
                toggleAvailability(id, true);
                toast.dismiss();
                toast.success('Booking cancelled successfully!');
              }}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white text-sm"
            >
              Confirm
            </button>
            <button
              onClick={closeToast}
              className="px-4 py-1 border border-gray-400 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="space-y-6 mx-auto px-4 py-6 max-w-7xl">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2">
        <h2 className="font-bold text-emerald-600 text-2xl sm:text-3xl">Your Rentals</h2>
        <span className="text-gray-500 text-sm">{localRentals.length} rental(s)</span>
      </div>

      {localRentals.length === 0 ? (
        <div className="py-12 text-center">
          <Calendar className="mx-auto mb-4 w-12 h-12 text-gray-400" />
          <p className="text-gray-500">No rental history found.</p>
        </div>
      ) : (
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-2">
          {localRentals.map((rental) => (
            <div
              key={rental.id}
              className="flex flex-col bg-white shadow-md hover:shadow-lg p-6 rounded-lg transition-shadow"
            >
              <div className="flex md:flex-row flex-col md:items-start md:space-x-6 space-y-4 md:space-y-0">
                <img
                  src={rental.image}
                  alt={rental.title}
                  className="rounded-lg w-full md:w-40 h-40 object-cover"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-emerald-600 text-lg md:text-xl">
                      {rental.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${rental.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {rental.status === 'active' ? 'Current' : 'Completed'}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="mr-1 w-4 h-4" />
                    {rental.location}
                  </div>

                  <div className="flex flex-wrap justify-between items-center text-gray-500 text-sm">
                    <div className="flex items-center font-semibold text-gray-800 text-base">
                      {rental.price}
                      <span className="ml-1 font-normal text-sm">/rental</span>
                    </div>
                    <div>
                      {new Date(rental.startDate).toLocaleDateString()} -{' '}
                      {new Date(rental.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-gray-500 text-xs">
                    Duration:{' '}
                    {Math.ceil(
                      (new Date(rental.endDate) - new Date(rental.startDate)) /
                      (1000 * 60 * 60 * 24)
                    )}{' '}
                    day(s)
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => handleViewDetails(rental.id)}
                      className="flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded text-emerald-700 text-sm"
                    >
                      <ArrowRightCircle className="w-4 h-4" />
                      View
                    </button>

                    <input
                      type="number"
                      min="1"
                      defaultValue={1}
                      id={`renew-value-${rental.id}`}
                      className="px-2 py-1 border rounded w-20 text-sm"
                    />
                    <select
                      id={`renew-unit-${rental.id}`}
                      className="px-2 py-1 border rounded text-sm"
                      defaultValue="days"
                    >
                      <option value="days">Day(s)</option>
                      <option value="weeks">Week(s)</option>
                      <option value="months">Month(s)</option>
                      <option value="years">Year(s)</option>
                    </select>

                    <button
                      onClick={() => {
                        const val = parseInt(document.getElementById(`renew-value-${rental.id}`).value);
                        const unit = document.getElementById(`renew-unit-${rental.id}`).value;
                        if (!isNaN(val) && val > 0) {
                          adjustRentalEndDate(rental.id, val, unit, 'add');
                        } else {
                          toast.error('Please enter a valid renewal period.');
                        }
                      }}
                      className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded text-blue-700 text-sm"
                    >
                      <RefreshCcw className="w-4 h-4" /> Renew
                    </button>

                    <button
                      onClick={() => {
                        const val = parseInt(document.getElementById(`renew-value-${rental.id}`).value);
                        const unit = document.getElementById(`renew-unit-${rental.id}`).value;
                        if (!isNaN(val) && val > 0) {
                          adjustRentalEndDate(rental.id, val, unit, 'subtract');
                        } else {
                          toast.error('Please enter a valid reduction period.');
                        }
                      }}
                      className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 px-3 py-1.5 rounded text-yellow-700 text-sm"
                    >
                      <MinusCircle className="w-4 h-4" /> Reduce
                    </button>

                    <button
                      onClick={() => handleCancelRental(rental.id)}
                      className="flex items-center gap-1 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded text-red-700 text-sm"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourRentals;

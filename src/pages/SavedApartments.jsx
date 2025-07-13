import React from 'react';
import { Heart, MapPin, DollarSign, Star, Eye, Home } from 'lucide-react';
import { useSavedApartments } from '../context/SavedApartmentContext'; // Adjust path as needed
import { Link } from 'react-router-dom';

const SavedApartments = () => {
  const { savedApartments, removeSavedApartment } = useSavedApartments();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);

  const SavedApartmentCard = ({ apartment }) => {
    return (
      <div className="group relative bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300">
        <div className="relative h-56 overflow-hidden">
          <img
            src={
              apartment.imageUrl ||
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'
            }
            alt={apartment.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Remove button */}
          <button
            onClick={() => removeSavedApartment(apartment.id)}
            className="top-2 right-2 absolute bg-red-500 hover:bg-red-600 p-2 rounded-full text-white hover:scale-110 transition-all duration-200"
            title="Remove from saved"
          >
            <Heart size={16} fill="currentColor" />
          </button>

          {/* Status badges */}
          <div className="top-2 left-2 absolute flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${apartment.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}
            >
              {apartment.available ? 'Available' : 'Rented'}
            </span>
            <span className="bg-blue-100 px-3 py-1 rounded-full font-semibold text-blue-800 text-xs">
              {apartment.type}
            </span>
          </div>

          {/* Rating */}
          <div className="bottom-2 left-2 absolute flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-500" fill="currentColor" />
            <span className="font-semibold text-sm">{apartment.rating}</span>
            <span className="text-gray-600 text-xs">({apartment.reviews})</span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start gap-3 mb-3">
            <h3 className="font-bold text-emerald-600 group-hover:text-emerald-700 text-lg transition-colors">
              {apartment.name}
            </h3>
            <div className="text-right">
              <div className="font-bold text-emerald-600 text-lg md:text-xl lg:text-2xl">
                {formatPrice(apartment.price)}
              </div>
              <div className="text-gray-500 text-sm">/month</div>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-4 text-gray-600">
            <MapPin size={16} />
            <span className="text-sm">{apartment.location}</span>
          </div>

          <div className="flex justify-between items-center mb-4 text-gray-600 text-sm">
            <div className="flex items-center gap-4">
              <span>{apartment.bedrooms} bed</span>
              <span>{apartment.bathrooms} bath</span>
              <span>{apartment.area}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {apartment.amenities?.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs"
                >
                  {amenity}
                </span>
              ))}
              {apartment.amenities?.length > 3 && (
                <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs">
                  +{apartment.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Saved date */}
          <div className="mb-4 text-gray-400 text-xs">
            Saved on {new Date(apartment.savedDate).toLocaleDateString()}
          </div>

          <div className="flex gap-2">
            <Link
              to={`/apartments/${apartment.id}`}
              className="flex flex-1 justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-3 rounded-lg font-semibold text-white transition-colors"
            >
              <Eye size={16} />
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-gray-800 to-emerald-900 py-16 text-white">
        <div className="mx-auto px-6 max-w-7xl text-center">
          <h1 className="mb-4 font-bold text-xl md:text-3xl">
            Your Saved Apartments
          </h1>
          <p className="mb-8 text-[16px] text-gray-400 md:text-lg">
            Keep track of your favorite apartments and revisit them anytime
          </p>
        </div>
      </div>

      <div className="mx-auto px-6 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-emerald-600 text-2xl">Saved Apartments</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">
              {savedApartments.length} saved apartment{savedApartments.length !== 1 ? 's' : ''}
            </span>
            <Link
              to="/apartments"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg font-semibold text-white transition-colors"
            >
              <Home size={16} />
              Browse More
            </Link>
          </div>
        </div>

        {savedApartments.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-6">
              <Heart className="mx-auto mb-4 w-16 h-16 text-gray-400" />
              <h3 className="mb-2 font-semibold text-gray-600 text-xl">
                No saved apartments yet
              </h3>
              <p className="mb-6 text-gray-500">
                Start browsing to save your favorite apartments and they'll appear here!
              </p>
              <Link
                to="/apartments"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
              >
                <Home size={16} />
                Browse Apartments
              </Link>
            </div>
          </div>
        ) : (
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {savedApartments.map((apartment) => (
              <SavedApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedApartments;
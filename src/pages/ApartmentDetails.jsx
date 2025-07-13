import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Star,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useApartments } from '../context/ApartmentsContext';

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApartmentById } = useApartments();

  const apartment = getApartmentById(parseInt(id));

  if (!apartment) {
    return (
      <div className="flex justify-center items-center bg-gray-50 px-4 min-h-screen text-gray-700">
        <h1 className="font-bold text-2xl text-center">Apartment not found</h1>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate('/contact-booking', { state: { apartmentId: apartment.id } });
  };

  return (
    <div className="bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-20 py-10 min-h-screen">
      <div className="bg-white shadow-md mx-auto rounded-xl max-w-6xl overflow-hidden">
        {/* Apartment Image */}
        <img
          src={apartment.imageUrl}
          alt={apartment.name}
          className="w-full h-64 sm:h-80 md:h-[28rem] object-cover"
        />

        {/* Apartment Content */}
        <div className="space-y-6 p-6 sm:p-8 md:p-10">
          {/* Title & Rating */}
          <div className="flex md:flex-row flex-col justify-between md:items-center gap-3">
            <h2 className="font-bold text-gray-800 text-2xl sm:text-3xl">{apartment.name}</h2>
            <div className="flex items-center text-yellow-500">
              <Star className="fill-current w-5 h-5" />
              <span className="ml-1 text-gray-600 text-sm">
                {apartment.rating} ({apartment.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{apartment.description}</p>

          {/* Apartment Info Grid */}
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{apartment.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <BedDouble className="w-5 h-5" />
              <span>{apartment.bedrooms} Bedroom(s)</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5" />
              <span>{apartment.bathrooms} Bathroom(s)</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              <span>{apartment.area}</span>
            </div>
            <div className="flex items-center gap-2">
              {apartment.available ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Available</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span>Unavailable</span>
                </>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="mb-3 font-semibold text-gray-800 text-lg">Amenities</h4>
            <ul className="flex flex-wrap gap-2">
              {apartment.amenities.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-emerald-50 px-3 py-1 border border-emerald-200 rounded-full text-emerald-600 text-xs sm:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Price & Book Button */}
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 pt-4 border-t">
            <div className="font-bold text-emerald-600 text-2xl">
              ₦{apartment.price.toLocaleString()}{' '}
              <span className="font-medium text-gray-500 text-sm">/month</span>
            </div>
            <button
              onClick={handleBookNow}
              className="inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold text-white transition-all cursor-pointer"
            >
              Contact to Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;

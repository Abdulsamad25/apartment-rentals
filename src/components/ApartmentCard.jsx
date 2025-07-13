/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { MapPin, Star, Heart, Eye, Edit, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedApartments } from '../context/SavedApartmentContext';

const ApartmentCard = ({ apartment, isAdmin = false, onUpdatePrice = () => { } }) => {
  if (!apartment) {
    return (
      <div className="bg-white shadow-md p-4 border rounded-2xl overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-gray-200 mb-4 rounded w-full h-48"></div>
          <div className="bg-gray-200 mb-2 rounded w-3/4 h-4"></div>
          <div className="bg-gray-200 rounded w-1/2 h-4"></div>
        </div>
      </div>
    );
  }

  const { isApartmentSaved, toggleSavedApartment } = useSavedApartments();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(apartment.price || 0);

  const isLiked = isApartmentSaved(apartment.id);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);

  const handleSavePrice = () => {
    if (editPrice > 0) {
      onUpdatePrice(apartment.id, editPrice);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditPrice(apartment.price || 0);
    setIsEditing(false);
  };

  const handleLikeToggle = () => {
    toggleSavedApartment(apartment);
  };

  useEffect(() => {
    setEditPrice(apartment.price || 0);
  }, [apartment.price]);

  return (
    <div className="group relative bg-white shadow-md hover:shadow-xl border rounded-2xl overflow-hidden transition-all duration-300">
      {isAdmin && (
        <div className="top-2 left-2 z-10 absolute bg-red-500 px-2 py-1 rounded text-white text-xs">
          ADMIN
        </div>
      )}

      {!imageLoaded && (
        <div className="z-0 absolute inset-0 flex justify-center items-center bg-gray-100 animate-pulse">
          <span className="text-gray-400">Loading...</span>
        </div>
      )}
      <img
        src={
          apartment.imageUrl ||
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'
        }
        alt={apartment.name || 'Apartment'}
        className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="top-2 right-2 z-10 absolute flex items-center space-x-2">
        {isLiked && (
          <span className="bg-red-500 px-2 py-1 rounded-full text-white text-xs animate-pulse">
            SAVED
          </span>
        )}
        <button
          onClick={handleLikeToggle}
          className={`p-2 rounded-full transition-all duration-200 ${isLiked
              ? 'bg-white text-red-500 scale-110'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-105'
            }`}
          title={isLiked ? 'Unsave' : 'Save'}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-emerald-600 text-lg">{apartment.name || 'Apartment'}</h3>
          <div className="text-right">
            {isAdmin && isEditing ? (
              <div className="flex flex-col items-end space-y-1">
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="p-1 border border-gray-300 rounded w-28 text-sm"
                  min="0"
                />
                <div className="flex space-x-1">
                  <button
                    onClick={handleSavePrice}
                    className="bg-green-500 hover:bg-green-600 p-1.5 rounded text-white"
                  >
                    <Save size={14} />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-600 p-1.5 rounded text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div>
                  <div className="font-bold text-emerald-600 text-lg">
                    {formatPrice(apartment.price || 0)}
                  </div>
                  <div className="text-gray-500 text-xs">/month</div>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded text-white"
                    title="Edit price"
                  >
                    <Edit size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <MapPin size={16} />
          <span>{apartment.location || 'Location not specified'}</span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-2 text-gray-700 text-sm">
          <span>{apartment.bedrooms || 0} bed</span>
          <span>{apartment.bathrooms || 0} bath</span>
          <span>{apartment.area || 'N/A'}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-2 text-xs">
          {apartment.amenities?.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="bg-gray-100 px-2 py-1 rounded text-gray-700"
            >
              {amenity}
            </span>
          ))}
          {apartment.amenities?.length > 3 && (
            <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
              +{apartment.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${apartment.available
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
              }`}
          >
            {apartment.available ? 'Available' : 'Rented'}
          </span>

          <div className="flex items-center gap-1 text-yellow-600 text-sm">
            <Star size={14} fill="currentColor" />
            <span>{apartment.rating || 0}</span>
            <span className="text-gray-400">({apartment.reviews || 0})</span>
          </div>
        </div>

        <Link
          to={apartment.available ? `/apartments/${apartment.id}` : '#'}
          onClick={(e) => {
            if (!apartment.available) {
              e.preventDefault();
            }
          }}
          className={`flex justify-center items-center gap-2 ${apartment.available
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-gray-300 cursor-not-allowed'
            } mt-4 px-4 py-2 rounded font-medium text-white text-sm transition`}
        >
          <Eye size={16} />
          {apartment.available ? 'View Details' : 'Not Available'}
        </Link>

      </div>
    </div>
  );
};

export default ApartmentCard;

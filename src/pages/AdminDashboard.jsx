import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useApartments } from '../context/ApartmentsContext';

const AdminDashboard = () => {
  const { 
    apartments, 
    addApartment, 
    updateApartment, 
    deleteApartment, 
    toggleAvailability 
  } = useApartments();

  const [showModal, setShowModal] = useState(false);
  const [editingApartment, setEditingApartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    imageUrl: '',
    available: true,
    type: 'Studio',
    amenities: [],
    rating: 4.5,
    reviews: 0
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenitiesChange = (e) => {
    const amenitiesString = e.target.value;
    const amenitiesArray = amenitiesString.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      amenities: amenitiesArray
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.location || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    const apartmentData = {
      ...formData,
      price: parseInt(formData.price),
      bedrooms: parseInt(formData.bedrooms) || 1,
      bathrooms: parseInt(formData.bathrooms) || 1,
      rating: parseFloat(formData.rating) || 4.5,
      reviews: parseInt(formData.reviews) || 0,
      amenities: formData.amenities.length > 0 ? formData.amenities : ['WiFi', 'AC']
    };

    if (editingApartment) {
      updateApartment(editingApartment.id, apartmentData);
    } else {
      addApartment(apartmentData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      description: '',
      imageUrl: '',
      available: true,
      type: 'Studio',
      amenities: [],
      rating: 4.5,
      reviews: 0
    });
    setEditingApartment(null);
    setShowModal(false);
  };

  const handleEdit = (apartment) => {
    setEditingApartment(apartment);
    setFormData({
      name: apartment.name,
      location: apartment.location,
      price: apartment.price.toString(),
      bedrooms: apartment.bedrooms.toString(),
      bathrooms: apartment.bathrooms.toString(),
      area: apartment.area || '',
      description: apartment.description || '',
      imageUrl: apartment.imageUrl || '',
      available: apartment.available,
      type: apartment.type,
      amenities: apartment.amenities || [],
      rating: apartment.rating || 4.5,
      reviews: apartment.reviews || 0
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this apartment?')) {
      deleteApartment(id);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const propertyTypes = ['Studio', 'Luxury', 'Family', 'Loft', 'Duplex', 'Cottage'];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto p-3 sm:p-4 md:p-6 max-w-7xl">
        {/* Header */}
        <div className="bg-white shadow-sm mb-4 md:mb-6 p-4 sm:p-5 md:p-6 rounded-lg">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="font-bold text-emerald-600 text-xl sm:text-2xl md:text-3xl">Admin Dashboard</h1>
              <p className="mt-1 text-gray-600 text-sm sm:text-base">Manage your apartment listings</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full sm:w-auto font-semibold text-white text-sm sm:text-base transition-colors -700"
            >
              <Plus size={18} className="sm:size-5" />
              <span className="hidden xs:inline">Add New Apartment</span>
              <span className="xs:hidden">Add Apartment</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-4 mb-4 md:mb-6">
          <div className="bg-white shadow-sm p-3 sm:p-4 md:p-6 rounded-lg">
            <div className="font-bold text-blue-600 text-xl sm:text-2xl md:text-3xl">{apartments.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Apartments</div>
          </div>
          <div className="bg-white shadow-sm p-3 sm:p-4 md:p-6 rounded-lg">
            <div className="font-bold text-green-600 text-xl sm:text-2xl md:text-3xl">
              {apartments.filter(apt => apt.available).length}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">Available</div>
          </div>
          <div className="bg-white shadow-sm p-3 sm:p-4 md:p-6 rounded-lg">
            <div className="font-bold text-red-600 text-xl sm:text-2xl md:text-3xl">
              {apartments.filter(apt => !apt.available).length}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">Rented</div>
          </div>
          <div className="col-span-2 lg:col-span-1 bg-white shadow-sm p-3 sm:p-4 md:p-6 rounded-lg">
            <div className="font-bold text-purple-600 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              {apartments.length > 0 ? formatPrice(apartments.reduce((sum, apt) => sum + apt.price, 0) / apartments.length) : '₦0'}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm">Average Price</div>
          </div>
        </div>

        {/* Apartments Grid */}
        <div className="gap-3 sm:gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {apartments.map((apt) => (
            <div key={apt.id} className="bg-white shadow-sm hover:shadow-md rounded-lg overflow-hidden transition-shadow">
              <div className="relative">
                <img 
                  src={apt.imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'} 
                  alt={apt.name} 
                  className="w-full h-36 sm:h-40 md:h-48 object-cover"
                />
                <div className="top-2 sm:top-3 right-2 sm:right-3 absolute">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    apt.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {apt.available ? 'Available' : 'Rented'}
                  </span>
                </div>
                <div className="top-2 sm:top-3 left-2 sm:left-3 absolute">
                  <span className="bg-blue-100 px-2 sm:px-3 py-1 rounded-full font-semibold text-blue-800 text-xs sm:text-sm">
                    {apt.type}
                  </span>
                </div>
              </div>
              
              <div className="p-3 sm:p-4 md:p-5">
                <h3 className="mb-2 font-bold text-gray-800 text-lg sm:text-xl line-clamp-1">{apt.name}</h3>
                <p className="mb-3 text-gray-600 text-sm line-clamp-1">{apt.location}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="font-bold text-blue-600 text-xl sm:text-2xl">
                    {formatPrice(apt.price)}
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">/month</div>
                </div>
                
                <div className="flex justify-between mb-4 text-gray-600 text-xs sm:text-sm">
                  <span>{apt.bedrooms} bed</span>
                  <span>{apt.bathrooms} bath</span>
                  <span className="max-w-16 sm:max-w-none truncate">{apt.area}</span>
                </div>
                
                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {apt.amenities?.slice(0, 2).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {apt.amenities?.length > 2 && (
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-700 text-xs">
                        +{apt.amenities.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="mb-4 text-gray-600 text-xs sm:text-sm line-clamp-2">
                  {apt.description}
                </p>
                
                <div className="flex sm:flex-row flex-col gap-2">
                  <button
                    onClick={() => toggleAvailability(apt.id)}
                    className={`flex-1 px-2 sm:px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-1 ${
                      apt.available 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {apt.available ? <ToggleRight size={14} className="sm:size-4" /> : <ToggleLeft size={14} className="sm:size-4" />}
                    <span className="hidden sm:inline">
                      {apt.available ? 'Mark Rented' : 'Mark Available'}
                    </span>
                    <span className="sm:hidden">
                      {apt.available ? 'Rented' : 'Available'}
                    </span>
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(apt)}
                      className="bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg text-blue-700 transition-colors"
                    >
                      <Edit2 size={14} className="sm:size-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg text-red-700 transition-colors"
                    >
                      <Trash2 size={14} className="sm:size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-2 sm:p-4">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">
                    {editingApartment ? 'Edit Apartment' : 'Add New Apartment'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} className="sm:size-6" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 p-4 sm:p-6">
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Apartment Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Price (₦) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Area (sq ft)
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="e.g., 1200 sq ft"
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700 text-sm">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="1"
                      max="5"
                      step="0.1"
                      className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Amenities (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.amenities.join(', ')}
                    onChange={handleAmenitiesChange}
                    placeholder="e.g., WiFi, AC, Pool, Gym"
                    className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="p-2 sm:p-3 border focus:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                    placeholder="Brief description of the apartment..."
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="border-gray-300 rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
                  />
                  <label className="ml-2 font-semibold text-gray-700 text-sm">
                    Available for rent
                  </label>
                </div>
                
                <div className="flex sm:flex-row flex-col gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-3 rounded-lg font-semibold text-white text-sm sm:text-base transition-colors"
                  >
                    {editingApartment ? 'Update Apartment' : 'Add Apartment'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 hover:bg-gray-300 px-4 sm:px-6 py-3 rounded-lg font-semibold text-gray-800 text-sm sm:text-base transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
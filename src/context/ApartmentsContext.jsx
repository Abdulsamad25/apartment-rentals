/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Apartment images
const apt1 = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop';
const apt2 = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop';
const apt3 = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop';
const apt4 = 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600&h=400&fit=crop';
const apt5 = 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop';
const apt6 = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop';
const apt7 = 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop';
const apt8 = 'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=600&h=400&fit=crop';
const apt9 = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop';

// Initial apartment data
const initialApartmentsData = [
  {
    id: 1,
    name: 'Luxury Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: 750000,
    imageUrl: apt1,
    available: true,
    bedrooms: 3,
    bathrooms: 2,
    area: '1200 sq ft',
    rating: 4.8,
    reviews: 24,
    amenities: ['Swimming Pool', 'Gym', 'Security'],
    type: 'Luxury',
    description: 'Beautiful luxury apartment with stunning views'
  },
  {
    id: 2,
    name: 'Studio Flat',
    location: 'Victoria Island, Lagos',
    price: 450000,
    imageUrl: apt2,
    available: true,
    bedrooms: 1,
    bathrooms: 1,
    area: '450 sq ft',
    rating: 4.5,
    reviews: 18,
    amenities: ['WiFi', 'AC', 'Kitchen'],
    type: 'Studio',
    description: 'Modern studio perfect for young professionals'
  },
  {
    id: 3,
    name: 'Cozy 2-Bedroom',
    location: 'Ikeja, Lagos',
    price: 600000,
    imageUrl: apt3,
    available: true,
    bedrooms: 2,
    bathrooms: 1,
    area: '800 sq ft',
    rating: 4.6,
    reviews: 31,
    amenities: ['Parking', 'Garden', 'Security'],
    type: 'Family',
    description: 'Cozy apartment in a quiet neighborhood'
  },
  {
    id: 4,
    name: 'Modern Loft',
    location: 'Surulere, Lagos',
    price: 500000,
    imageUrl: apt4,
    available: true,
    bedrooms: 1,
    bathrooms: 1,
    area: '600 sq ft',
    rating: 4.7,
    reviews: 15,
    amenities: ['WiFi', 'AC', 'Modern Kitchen'],
    type: 'Loft',
    description: 'Contemporary loft with modern amenities'
  },
  {
    id: 5,
    name: 'Spacious Family Home',
    location: 'Yaba, Lagos',
    price: 800000,
    imageUrl: apt5,
    available: true,
    bedrooms: 4,
    bathrooms: 3,
    area: '1500 sq ft',
    rating: 4.9,
    reviews: 42,
    amenities: ['Garden', 'Parking', 'Security', 'Playground'],
    type: 'Family',
    description: 'Perfect family home with garden'
  },
  {
    id: 6,
    name: 'Penthouse Suite',
    location: 'Ikoyi, Lagos',
    price: 1200000,
    imageUrl: apt6,
    available: true,
    bedrooms: 3,
    bathrooms: 3,
    area: '2000 sq ft',
    rating: 5.0,
    reviews: 8,
    amenities: ['Pool', 'Gym', 'Concierge', 'Rooftop'],
    type: 'Luxury',
    description: 'Luxurious penthouse with premium finishes'
  },
  {
    id: 7,
    name: 'Affordable Studio',
    location: 'Ogba, Lagos',
    price: 300000,
    imageUrl: apt7,
    available: true,
    bedrooms: 1,
    bathrooms: 1,
    area: '400 sq ft',
    rating: 4.3,
    reviews: 22,
    amenities: ['WiFi', 'Kitchen', 'AC'],
    type: 'Studio',
    description: 'Budget-friendly studio apartment'
  },
  {
    id: 8,
    name: 'Elegant Duplex',
    location: 'Lekki Phase 2, Lagos',
    price: 900000,
    imageUrl: apt8,
    available: true,
    bedrooms: 4,
    bathrooms: 3,
    area: '1800 sq ft',
    rating: 4.8,
    reviews: 35,
    amenities: ['Pool', 'Garden', 'Security', 'Parking'],
    type: 'Duplex',
    description: 'Elegant duplex in prime location'
  },
  {
    id: 9,
    name: 'Charming Cottage',
    location: 'Epe, Lagos',
    price: 400000,
    imageUrl: apt9,
    available: true,
    bedrooms: 2,
    bathrooms: 1,
    area: '700 sq ft',
    rating: 4.4,
    reviews: 19,
    amenities: ['Garden', 'Parking', 'Quiet Area'],
    type: 'Cottage',
    description: 'Charming cottage away from city noise'
  }
];

// Create context and export it
export const ApartmentContext = createContext();

// Hook to use the context
export const useApartments = () => {
  const context = useContext(ApartmentContext);
  if (!context) {
    throw new Error('useApartments must be used within an ApartmentProvider');
  }
  return context;
};

// Provider component
export const ApartmentProvider = ({ children }) => {
  const [apartments, setApartments] = useState(() => {
    try {
      const savedApartments = localStorage.getItem('apartments');
      return savedApartments ? JSON.parse(savedApartments) : initialApartmentsData;
    } catch (error) {
      console.error('Error loading apartments from localStorage:', error);
      return initialApartmentsData;
    }
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('apartments', JSON.stringify(apartments));
    } catch (error) {
      console.error('Error saving apartments to localStorage:', error);
      setError('Failed to save data');
    }
  }, [apartments]);

  const validateApartmentData = (data) => {
    const errors = [];
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.location?.trim()) errors.push('Location is required');
    if (!data.price || isNaN(data.price) || data.price <= 0) errors.push('Valid price is required');
    if (!data.bedrooms || isNaN(data.bedrooms) || data.bedrooms <= 0) errors.push('Valid number of bedrooms is required');
    if (!data.bathrooms || isNaN(data.bathrooms) || data.bathrooms <= 0) errors.push('Valid number of bathrooms is required');
    return errors;
  };

  const generateUniqueId = () => Date.now() + Math.random().toString(36).substr(2, 9);

  const addApartment = (apartmentData) => {
    setError(null);
    const errors = validateApartmentData(apartmentData);
    if (errors.length > 0) return setError(errors.join(', ')), false;

    const newApartment = {
      ...apartmentData,
      id: generateUniqueId(),
      imageUrl: apartmentData.imageUrl || 'https://via.placeholder.com/600x400',
      rating: 4.0,
      reviews: 0,
      amenities: apartmentData.amenities || ['WiFi', 'AC'],
      available: apartmentData.available ?? true
    };
    setApartments(prev => [...prev, newApartment]);
    return true;
  };

  const updateApartment = (id, updatedData) => {
    setError(null);
    const errors = validateApartmentData(updatedData);
    if (errors.length > 0) return setError(errors.join(', ')), false;

    setApartments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, ...updatedData } : apt)
    );
    return true;
  };

  const deleteApartment = (id) => {
    setError(null);
    setApartments(prev => prev.filter(apt => apt.id !== id));
    return true;
  };

  const updateApartmentPrice = (id, newPrice) => {
    setError(null);
    if (isNaN(newPrice) || newPrice <= 0) return setError('Valid price is required'), false;

    setApartments(prev => prev.map(apt => apt.id === id ? { ...apt, price: newPrice } : apt));
    return true;
  };

 const toggleAvailability = (id, available = true) => {
  setApartments((prev) =>
    prev.map((apt) =>
      apt.id === id ? { ...apt, available } : apt
    )
  );
};


  const getApartmentById = (id) => apartments.find(apt => apt.id === id);

  const clearError = () => setError(null);

  const value = {
    apartments,
    error,
    addApartment,
    updateApartment,
    deleteApartment,
    updateApartmentPrice,
    toggleAvailability,
    getApartmentById,
    clearError
  };

  return (
    <ApartmentContext.Provider value={value}>
      {children}
    </ApartmentContext.Provider>
  );
};

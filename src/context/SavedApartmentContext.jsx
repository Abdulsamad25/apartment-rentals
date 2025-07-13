/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

const SavedApartmentsContext = createContext();

export const useSavedApartments = () => {
  const context = useContext(SavedApartmentsContext);
  if (!context) {
    throw new Error('useSavedApartments must be used within SavedApartmentsProvider');
  }
  return context;
};

const SavedApartmentsProvider = ({ children }) => {
  // Load from localStorage initially
  const [savedApartments, setSavedApartments] = useState(() => {
    const stored = localStorage.getItem('savedApartments');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to localStorage anytime savedApartments changes
  useEffect(() => {
    localStorage.setItem('savedApartments', JSON.stringify(savedApartments));
  }, [savedApartments]);

  const saveApartment = (apartment) => {
    const savedApartment = {
      ...apartment,
      savedDate: new Date().toISOString().split('T')[0],
    };

    setSavedApartments((prev) => {
      if (prev.some((apt) => apt.id === apartment.id)) {
        return prev;
      }
      return [...prev, savedApartment];
    });
  };

  const removeSavedApartment = (apartmentId) => {
    setSavedApartments((prev) => prev.filter((apt) => apt.id !== apartmentId));
  };

  const isApartmentSaved = (apartmentId) => {
    return savedApartments.some((apt) => apt.id === apartmentId);
  };

  const toggleSavedApartment = (apartment) => {
    if (isApartmentSaved(apartment.id)) {
      removeSavedApartment(apartment.id);
    } else {
      saveApartment(apartment);
    }
  };

  const clearSavedApartments = () => {
    setSavedApartments([]);
    localStorage.removeItem('savedApartments');
  };

  return (
    <SavedApartmentsContext.Provider
      value={{
        savedApartments,
        saveApartment,
        removeSavedApartment,
        isApartmentSaved,
        toggleSavedApartment,
        clearSavedApartments,
      }}
    >
      {children}
    </SavedApartmentsContext.Provider>
  );
};

export { SavedApartmentsProvider, SavedApartmentsContext };

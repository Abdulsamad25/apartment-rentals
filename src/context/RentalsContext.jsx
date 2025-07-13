/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const RentalContext = createContext();

export const RentalProvider = ({ children }) => {
  const [rentals, setRentals] = useState(() => {
    const saved = localStorage.getItem('userRentals');
    return saved ? JSON.parse(saved) : [];
  });

  const addRental = (rental) => {
    setRentals((prev) => [...prev, rental]);
  };

  const removeRental = (id) => {
    setRentals((prev) => prev.filter((rental) => rental.id !== id));
  };

  const clearRentals = () => {
    setRentals([]);
  };

  const updateRental = (updatedList) => {
    setRentals(updatedList); // ✅ Triggers re-render and auto sync via useEffect
  };

  // ✅ Keep this useEffect as-is for syncing to localStorage
  useEffect(() => {
    localStorage.setItem('userRentals', JSON.stringify(rentals));
  }, [rentals]);

  return (
    <RentalContext.Provider
      value={{ rentals, addRental, removeRental, updateRental, clearRentals }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRentals = () => useContext(RentalContext);

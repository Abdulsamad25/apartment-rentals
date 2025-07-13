import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ApartmentProvider } from './context/ApartmentsContext';
import { SavedApartmentsProvider } from './context/SavedApartmentContext';
import { RentalProvider } from './context/RentalsContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ApartmentProvider>
          <SavedApartmentsProvider>
            <RentalProvider>
              <App />
              <ToastContainer position="top-right" autoClose={3000} />
            </RentalProvider>
          </SavedApartmentsProvider>
        </ApartmentProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

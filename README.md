# Apartment Rental Website

A modern, responsive apartment rental website built with React and Tailwind CSS. It features user authentication with Firebase, apartment listings, booking with Paystack payment integration, and rental management.

---

## Features

- Browse available and rented apartments with filtering and sorting options.
- User registration and login with Firebase Authentication.
- Password reset via email.
- Apartment booking with Paystack payment gateway integration (test mode).
- Rental management page to view current and past rentals.
- Rental renewal and cancellation features.
- Responsive design for mobile and desktop.
- Context API for state management of apartments and rentals.
- Toast notifications for user feedback.

---

## Technologies Used

- React
- Tailwind CSS
- Firebase (Authentication and Firestore)
- Paystack (Payment integration)
- React Hook Form
- React Router DOM
- React Toastify
- Lucide React (Icons)
- AOS (Animate on Scroll)

---

## Setup and Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. Install dependencies:
npm install

Setup Firebase:
Create a Firebase project.
Enable Email/Password authentication.
Create Firestore database and setup a users collection.
Copy your Firebase config and add it to your React app.

Setup Paystack:
Create a Paystack test account.
Get your Paystack public test key.
Create a .env file in the root and add:
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_test_public_key
Run the app locally:

npm run dev
Open http://localhost:5173 in your browser.

Usage
Register a new user or login.

Browse apartments under Available or Rented tabs.

Click on an apartment to book it.

Use the Paystack test card 4084080000000409 with any future expiry and CVV 000 to simulate payments.

Manage your rentals in the User Dashboard.

Renew or cancel rentals as needed.

Notes
This project uses React Context API to manage global state for apartments and rentals.

LocalStorage is used to persist apartment and rental data across sessions.

Toast notifications provide feedback for all user actions.

A clear/reset button for localStorage is shown only in development mode for easier testing.

License
This project is open source and available under the MIT License.

Contact
For questions or suggestions, please open an issue or reach out at samadolalekan15@gmail.com.
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-800 py-4 text-white">
      <div className="mx-auto text-center container">
        <p>&copy; {currentYear} StayNest. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

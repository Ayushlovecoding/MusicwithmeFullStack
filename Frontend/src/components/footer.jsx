// src/components/Footer.jsx
import React from 'react';
import meImage from '../assets/frontend-assets/me.jpg'; // Adjusted to your correct path

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center gap-3 p-4 border-t border-gray-800 bg-black text-white text-sm">
      <img
        src={meImage}
        alt="Ayush Sharma"
        className="w-10 h-10 rounded-full object-cover"
      />
      <p>@ 2030 ALl right reseverd Created by Ayush Sharma</p>
    </div>
  );
};

export default Footer;

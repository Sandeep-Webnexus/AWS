// src/components/NotFound.tsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center max-w-lg bg-white rounded-lg shadow-xl p-10">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.FHseQxjyNfV4wHpoPYx0SwHaD2&pid=Api" // Use any image URL for 404
          alt="Not Found"
          className="mx-auto mb-6 w-40 h-40 object-contain"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

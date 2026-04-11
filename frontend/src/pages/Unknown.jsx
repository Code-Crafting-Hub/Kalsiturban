import React from 'react';
import { Link } from 'react-router-dom';

export default function Unknown() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Large 404 Header */}
        <h1 className="text-9xl font-extrabold text-orange-500 animate-bounce">
          404
        </h1>
        
        {/* Icon/Illustration Placeholder */}
        <div className="relative mb-8">
          <p className="relative text-2xl md:text-3xl font-bold text-gray-800">
            Oops! Page not found.
          </p>
        </div>

        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg shadow-orange-200 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-200"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-gray-700 font-bold rounded-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
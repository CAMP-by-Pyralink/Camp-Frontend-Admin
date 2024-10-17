import React from "react";

const SuccessModal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-blue-500 mb-6">
          {/* Use an icon or SVG for success illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Successful</h2>
        <p className="text-gray-600 mb-6">
          Your account has been created successfully
        </p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

import React from "react";

const PhishingDetails: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-6">
        <h1 className="text-gray-500 text-sm font-semibold">
          Phishing / Select target
        </h1>

        <div className="flex justify-between gap-8">
          {/* Left Panel */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Happy Birthday!</h2>
            <p className="text-gray-600">
              Select a department or specific employees to receive this phishing
              simulation exercise
            </p>

            {/* Target Selection */}
            <div className="grid grid-cols-3 gap-4">
              <button className="border border-gray-300 rounded-lg p-4 text-center hover:border-blue-600">
                <span className="block text-lg">🏢</span>
                <span className="text-gray-700">All departments</span>
              </button>
              <button className="border border-gray-300 rounded-lg p-4 text-center hover:border-blue-600">
                <span className="block text-lg">📂</span>
                <span className="text-gray-700">Specific department</span>
              </button>
              <button className="border border-gray-300 rounded-lg p-4 text-center hover:border-blue-600">
                <span className="block text-lg">👥</span>
                <span className="text-gray-700">Specific employees</span>
              </button>
            </div>

            {/* Department Selection */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Select department
              </label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700">
                <option>Choose department</option>
                {/* Add options here */}
              </select>
            </div>

            {/* Simulation Duration */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Select simulation duration
              </label>
              <div className="border border-gray-300 rounded-lg p-4">
                {/* Replace with a date picker component if necessary */}
                <div className="flex justify-between text-gray-500">
                  <div>July 2022</div>
                  <div>August 2022</div>
                  <div>September 2022</div>
                </div>
                {/* Placeholder for dates */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-blue-200 rounded text-center py-2">15</div>
                  <div className="bg-blue-200 rounded text-center py-2">16</div>
                  <div className="bg-blue-200 rounded text-center py-2">17</div>
                  {/* Add more dates as needed */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-64 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recurring delivery
            </h3>
            <p className="text-gray-600">
              Turn this on to repeat this simulation exercise
            </p>

            <div className="flex items-center justify-between">
              <label className="text-gray-600 text-sm font-medium">
                Delivery time
              </label>
              <input
                type="time"
                className="border border-gray-300 rounded px-3 py-1 text-gray-700"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-600 text-sm font-medium">
                Timezone
              </label>
              <select className="border border-gray-300 rounded px-3 py-2 text-gray-700">
                <option>GMT</option>
                {/* Add timezone options here */}
              </select>
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Continue
        </button>
      </div>
    </div>
  );
};

export default PhishingDetails;

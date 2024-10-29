import React from 'react';

const ProfilePhishingSimulations = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Phishing Simulations</h3>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left py-2">Campaign Name</th>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">Fake Invoice</td>
            <td className="py-2">23/04/2023 11:56PM</td>
            <td className="py-2 text-green-500">Passed</td>
          </tr>
          <tr>
            <td className="py-2">Password Expiration Notice</td>
            <td className="py-2">23/04/2023 11:56PM</td>
            <td className="py-2 text-green-500">Passed</td>
          </tr>
          <tr>
            <td className="py-2">Email Account Suspension Alert</td>
            <td className="py-2">23/04/2023 11:56PM</td>
            <td className="py-2 text-red-500">Failed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePhishingSimulations;

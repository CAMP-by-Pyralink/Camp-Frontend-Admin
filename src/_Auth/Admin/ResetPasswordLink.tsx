import React from 'react';

const ResetPasswordLink = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">
          No worries, a verification link has been sent to your email. Click on the link to reset your password.
        </p>
        <a
          href="/reset-password"
          className="text-blue-500 underline mb-6 block"
        >
          Resend link
        </a>
        <p className="text-gray-500">Reset code: 8500</p>
      </div>
    </div>
  );
};

export default ResetPasswordLink;

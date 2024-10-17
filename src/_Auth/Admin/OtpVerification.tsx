import React, { useState } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(otp);
    // Handle OTP verification logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-center text-2xl font-bold mb-4">Enter OTP</h2>
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-6 text-center">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              className="text-center text-2xl p-3 border rounded-lg w-full"
              placeholder="000000"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;

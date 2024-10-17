import React, { useState } from "react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Submit new password logic
    console.log("New password:", formData.newPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full  flex">
        {/* Left side with illustration */}
        {/* <div className="w-1/2 hidden md:block">
          <img
            src="path/to/shield-image.png"
            alt="Security Illustration"
            className="rounded-lg"
          />
        </div> */}

        {/* Right side with form */}
        <div className="w-full pl-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg"
                required
              />
            </div>

            {/* Password requirements */}
            <ul className="text-gray-600 text-sm mb-6">
              <li className="mb-1 flex items-center">
                <span className="text-green-500">✔</span> Be a minimum of 8
                characters long
              </li>
              <li className="mb-1 flex items-center">
                <span className="text-green-500">✔</span> Include at least one
                number
              </li>
              <li className="mb-1 flex items-center">
                <span className="text-green-500">✔</span> Have at least one
                uppercase and one lowercase letter
              </li>
            </ul>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

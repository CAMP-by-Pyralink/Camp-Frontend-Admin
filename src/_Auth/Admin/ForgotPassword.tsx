import React, { useState } from "react";
import checkIcon from "../../assets/svgs/check.svg";
import { Link } from "react-router-dom";

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
    <div className=" w-full">
      <div className="bg-white p-8 rounded-lg  w-full flex items-center">
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
          <h2 className="text-3xl text-[#1E293B] font-medium  mb-4">
            Reset Password
          </h2>
          <p className=" text-[#475569] text-lg mb-4">
            Please enter and confirm your new password. <br /> You will need to
            login after you reset.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-[1.5px] border-[#E2E8F0] text-[#94A3B8] placeholder:text-[#94A3B8] rounded-lg"
                required
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-2 py-3 px-4 border-[1.5px] border-[#E2E8F0] text-[#94A3B8] placeholder:text-[#94A3B8] rounded-lg"
                required
                placeholder="********"
              />
            </div>

            {/* Password requirements */}
            <ul className="text-gray-600 text-sm mb-6">
              <li className=" mb-1 text-[#292626] font-medium flex items-center">
                <img src={checkIcon} alt="" /> Be a minimum of 8 characters long
              </li>
              <li className=" mb-1 text-[#292626] font-medium flex items-center">
                <img src={checkIcon} alt="" /> Include at least one number
              </li>
              <li className=" mb-1 text-[#292626] font-medium flex items-center">
                <img src={checkIcon} alt="" /> Have at least one uppercase and
                one lowercase letter
              </li>
            </ul>

            <Link to="/reset-password">
              <button
                type="submit"
                className="w-full bg-primary500 text-white py-3 rounded-lg "
              >
                Reset Password
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic
  };

  return (
    <div className=" flex items-center max-h-[621px] max-w-[454px] ">
      <div className=" w-full h-full">
        {/*  */}
        <div>
          <h2 className="text-3xl text-[#1B1818] font-bold">Create account</h2>
          <p className=" mb-4 text-[#645D5D] text-sm">
            Have an account ? <span className=" text-primary900">Sign in</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#101928] text-sm">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full mt-2 p-4 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#101928] text-sm">
              Company Email Address
            </label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#101928] text-sm">Company size</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#101928] text-sm">Password</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#101928] text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary500 text-white py-3 rounded-lg font-bold"
          >
            Sign Up
          </button>
        </form>
        <p className=" text-center my-4">or</p>
        <div className=" flex gap-4">
          <button className="w-full  border-[1.5px] border-[#D0D5DD] py-3 rounded-lg font-semibold text-[#344054] ">
            Google
          </button>
          <button className="w-full  border-[1.5px] border-[#D0D5DD] py-3 rounded-lg font-semibold text-[#344054] ">
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

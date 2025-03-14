import React, { useState } from "react";
import checkIcon from "../../assets/svgs/check.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const { forgotPassword, isLoading } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const response = await forgotPassword(formData);

    if (response) {
      navigate("/reset-password-link");
    }

    console.log("New password:", formData.email);
  };

  console.log("isLoading state:", isLoading);

  return (
    <div className=" w-full">
      <div className="bg-white p-8 rounded-lg  w-full flex items-center">
        <div className="w-full pl-6">
          <h2 className="text-4xl text-[#1B1818] font-semibold  mb-2">
            Forgot Password
          </h2>
          <p className=" text-[#645D5D] text-sm mb-4">
            Input your registered email
          </p>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium text-sm text-[#101928]">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-[1.5px] border-[#E2E8F0] text-[#1B1818] placeholder:text-[#94A3B8] rounded-lg"
                required
                placeholder=""
              />
            </div>

            <button
              disabled={!!isLoading}
              type="submit"
              className={`w-full bg-primary500 text-white py-3 rounded-lg mt-2 flex items-center justify-center ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className=" size-6 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

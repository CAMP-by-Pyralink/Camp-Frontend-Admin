import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";

type ChangePasswordData = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { changepassword, isLoading } = useAuthStore();

  const email = sessionStorage.getItem("email") || "";

  const [formData, setFormData] = useState<ChangePasswordData>({
    email,
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    isLongEnough: false,
    hasUpperCase: false,
    hasSpecialChar: false,
  });

  // Function to validate password
  const validatePassword = (password: string) => {
    return {
      isLongEnough: password.length >= 12,
      hasUpperCase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  // Update password validation dynamically
  useEffect(() => {
    setPasswordValidation(validatePassword(formData.newPassword));
  }, [formData.newPassword]); // ✅ Runs when newPassword changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (formData.newPassword !== formData.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    const response = await changepassword(formData);
    if (response) {
      navigate("/signin");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white p-8 rounded-lg w-full flex items-center">
        <div className="w-full">
          <h2 className="text-3xl text-[#1E293B] font-medium mb-4">
            Reset Password
          </h2>
          <p className="text-[#475569] text-md mb-4">
            Please enter and confirm your new password. <br /> You will need to
            login after you reset.
          </p>
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-4 relative">
              <label className="block font-medium">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-[1.5px] border-[#E2E8F0] text-[#1E293B] placeholder:text-[#94A3B8] rounded-lg"
                required
                placeholder="********"
              />
              <div
                className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className="text-gray-400" />
                ) : (
                  <FaEyeSlash className="text-gray-400 transition-all" />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <label className="block font-medium">Confirm New Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-2 py-3 px-4 border-[1.5px] border-[#E2E8F0] text-[#1E293B] placeholder:text-[#94A3B8] rounded-lg"
                required
                placeholder="********"
              />
              <div
                className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEye className="text-gray-400" />
                ) : (
                  <FaEyeSlash className="text-gray-400 transition-all" />
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="mb-4">
              <ul className="text-sm flex flex-col gap-1 text-gray-600">
                <li className="flex items-center">
                  <div
                    className={`size-5 ${
                      passwordValidation.isLongEnough
                        ? "bg-[#15B097]"
                        : "bg-red-500"
                    } rounded-full flex items-center justify-center mr-2`}
                  >
                    ✓
                  </div>
                  <span
                    className={
                      passwordValidation.isLongEnough
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    Password must be at least 12 characters long
                  </span>
                </li>
                <li className="flex items-center">
                  <div
                    className={`size-5 ${
                      passwordValidation.hasUpperCase
                        ? "bg-[#15B097]"
                        : "bg-red-500"
                    } rounded-full flex items-center justify-center mr-2`}
                  >
                    ✓
                  </div>
                  <span
                    className={
                      passwordValidation.hasUpperCase
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    Password must contain an uppercase letter
                  </span>
                </li>
                <li className="flex items-center">
                  <div
                    className={`size-5 ${
                      passwordValidation.hasSpecialChar
                        ? "bg-[#15B097]"
                        : "bg-red-500"
                    } rounded-full flex items-center justify-center mr-2`}
                  >
                    ✓
                  </div>
                  <span
                    className={
                      passwordValidation.hasSpecialChar
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    Password must contain a special character
                  </span>
                </li>
              </ul>
            </div>

            {/* Submit Button*/}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-primary500 text-white py-3 rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

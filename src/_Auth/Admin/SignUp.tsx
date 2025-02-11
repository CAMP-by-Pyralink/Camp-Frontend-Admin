// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import googleIcon from "../../assets/svgs/google-icon.svg";
// import miscrosoftIcon from "../../assets/svgs/microsoft-icon.svg";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyEmail: "",
//     companySize: "",
//     companyPassword: "",
//     companyConfirmPassword: "",
//   });

//   const companySizeRanges = [
//     "1-10 employees",
//     "11-50 employees",
//     "51-200 employees",
//     "201-500 employees",
//     "501-1000 employees",
//     "1000+ employees",
//   ];

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="flex items-center max-h-[621px] max-w-[480px]">
//       <div className="w-full h-full">
//         <div>
//           <h2 className="text-3xl text-[#1B1818] font-bold">Create account</h2>
//           <p className="mb-2 text-[#645D5D] text-sm">
//             Have an account?{" "}
//             <Link to="/signin">
//               <span className="text-primary900">Sign in</span>
//             </Link>
//           </p>
//         </div>
//         <form>
//           <div className="mb-2">
//             <label className="block text-[#101928] text-sm font-medium">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none"
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block text-[#101928] text-sm font-medium">
//               Company Email Address
//             </label>
//             <input
//               type="email"
//               name="companyEmail"
//               value={formData.companyEmail}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none"
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block text-[#101928] text-sm font-medium">
//               Company size
//             </label>
//             <select
//               name="companySize"
//               value={formData.companySize}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none bg-white"
//             >
//               <option value="">Select company size</option>
//               {companySizeRanges.map((range) => (
//                 <option key={range} value={range}>
//                   {range}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-2">
//             <label className="block text-[#101928] text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               name="companyPassword"
//               value={formData.companyPassword}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none"
//             />
//           </div>
//           <div className="mb-2">
//             <label className="block text-[#101928] text-sm font-medium">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="companyConfirmPassword"
//               value={formData.companyConfirmPassword}
//               onChange={handleChange}
//               className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none"
//             />
//           </div>

//           <Link to="/signin">
//             <button
//               type="submit"
//               className="w-full bg-primary500 text-white py-2 rounded-lg font-bold"
//             >
//               Sign Up
//             </button>
//           </Link>
//         </form>
//         <p className="text-center my-2">or</p>
//         <div className="flex gap-4">
//           <button className="w-full border-[1.5px] border-[#D0D5DD] py-2 rounded-lg font-semibold text-[#344054] flex items-center justify-center gap-2 px-4">
//             <img src={googleIcon} alt="" />
//             Google
//           </button>
//           <button className="w-full border-[1.5px] border-[#D0D5DD] py-2 rounded-lg font-semibold text-[#344054] flex items-center justify-center gap-2 px-4">
//             <img src={miscrosoftIcon} alt="" />
//             Microsoft
//           </button>
//         </div>
//         <div className="flex items-start gap-2 mt-4">
//           <input type="checkbox" className="mt-2" />
//           <p className="text-greyText text-sm">
//             I agree to
//             <span className="text-[#001E88]">
//               {" "}
//               Pyralink Terms of Service, Payment Terms of Service{" "}
//             </span>
//             <br />
//             and I acknowledge{" "}
//             <span className="text-[#001E88]">Policy Privacy</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import googleIcon from "../../assets/svgs/google-icon.svg";
import miscrosoftIcon from "../../assets/svgs/microsoft-icon.svg";
import { ChevronDown, Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore, RegisterCompanyData } from "../../store/useAuthStore";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerCompany, isSigningUp } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    companySize: "",
    password: "",
    confirmPassword: "",
  });

  const companySizeRanges = [
    "1-50",
    "50-100",
    "100-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerCompanyData: RegisterCompanyData = {
      companyName: formData.companyName,
      email: formData.email,
      companySize: formData.companySize,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      authProvider: "manual",
      type: "company",
    };
    console.log(formData, formData);
    console.log(registerCompanyData);

    // Await the response returned from registerCompany
    const response = await registerCompany(registerCompanyData);
    if (response && response.status === 201) {
      navigate("/otp");
    }
  };

  const validatePassword = (password: string) => {
    const isLongEnough = password.length >= 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return { isLongEnough, hasUpperCase, hasSpecialChar };
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="flex items-center max-h-[621px] max-w-[480px]">
      <div className="w-full h-full">
        <div>
          <h2 className="text-3xl text-[#1B1818] font-bold">Create account</h2>
          <p className="mb-2 text-[#645D5D] text-sm">
            Have an account?{" "}
            <Link to="/signin">
              <span className="text-primary900">Sign in</span>
            </Link>
          </p>
        </div>
        <form>
          <div className="mb-2">
            <label className="block text-[#101928] text-sm font-medium">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
            />
          </div>
          <div className="mb-2">
            <label className="block text-[#101928] text-sm font-medium">
              Company Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
            />
          </div>
          {/* company size */}
          <div className="mb-2">
            <label className="block text-[#101928] text-sm font-medium">
              Company size
            </label>
            <div className="relative">
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500 bg-white appearance-none cursor-pointer pr-10"
              >
                <option value="" className="text-gray-500">
                  Select company size
                </option>
                {companySizeRanges.map((range) => (
                  <option
                    key={range}
                    value={range}
                    className="text-gray-900 bg-white hover:bg-gray-100"
                  >
                    {range}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          <div className="mb-2 relative">
            <label className="block text-[#101928] text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
            />
            <div
              className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEye className=" text-gray-400" />
              ) : (
                <FaEyeSlash className=" text-gray-400 transition-all" />
              )}
            </div>
          </div>
          {/*Confirm Password */}

          <div className="mb-2 relative">
            <label className="block text-[#101928] text-sm font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
            />
            <div
              className="absolute right-3 top-[70%] transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEye className=" text-gray-400" />
              ) : (
                <FaEyeSlash className=" text-gray-400" />
              )}
            </div>
          </div>
          {/*  */}
          <div className="mb-4">
            <ul className="text-sm text-gray-600">
              <li className="flex items-center">
                <input
                  type="checkbox"
                  checked={passwordValidation.isLongEnough}
                  readOnly
                  className={`mr-2 ${
                    passwordValidation.isLongEnough
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
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
                <input
                  type="checkbox"
                  checked={passwordValidation.hasUpperCase}
                  readOnly
                  className={`mr-2 ${
                    passwordValidation.hasUpperCase
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
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
                <input
                  type="checkbox"
                  checked={passwordValidation.hasSpecialChar}
                  readOnly
                  className={`mr-2 ${
                    passwordValidation.hasSpecialChar
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
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
          {/*  */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-primary500 text-white py-2 rounded-lg font-bold hover:bg-primary600 transition-colors    disabled:opacity-70 disabled:cursor-not-allowed     flex items-center justify-center"
            onClick={handleSignUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className=" size-6 mr-2 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <p className="text-center my-2">or</p>
        <div className="flex gap-4">
          <button className="w-full border-[1.5px] border-[#D0D5DD] py-2 rounded-lg font-semibold text-[#344054] flex items-center justify-center gap-2 px-4 hover:bg-gray-50 transition-colors">
            <img src={googleIcon} alt="" />
            Google
          </button>
          <button className="w-full border-[1.5px] border-[#D0D5DD] py-2 rounded-lg font-semibold text-[#344054] flex items-center justify-center gap-2 px-4 hover:bg-gray-50 transition-colors">
            <img src={miscrosoftIcon} alt="" />
            Microsoft
          </button>
        </div>
        <div className="flex items-start gap-2 mt-4">
          <input type="checkbox" className="mt-2" />
          <p className="text-greyText text-sm">
            I agree to
            <span className="text-[#001E88]">
              {" "}
              Pyralink Terms of Service, Payment Terms of Service{" "}
            </span>
            <br />
            and I acknowledge{" "}
            <span className="text-[#001E88]">Policy Privacy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthStore, LoginData } from "../../store/useAuthStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Loader, Loader2 } from "lucide-react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData: LoginData = {
      email: formData.email,
      password: formData.password,
      authProvider: "manual",
    };
    // console.log(loginData);

    const response = await login(loginData);

    if (response) {
      navigate("/");
    }
  };

  return (
    <div className=" flex items-center max-h-[621px] max-w-[454px] ">
      <div className=" w-full h-full">
        {/*  */}
        <div>
          <h2 className="text-3xl text-[#1B1818] font-semibold mb-2">
            Welcome back!
          </h2>
          <p className=" mb-4 text-[#645D5D] text-sm">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className=" text-[#C7C7CC] font-semibold">Sign up</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#101928] font-medium text-sm">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-[#101928] text-sm">Company size</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="w-full mt-2 p-1 border rounded-lg"
              required
            />
          </div> */}
          <div className="mb-4 relative">
            <label className="block text-[#101928] font-medium text-sm">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary500/20 focus:border-primary500"
              required
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

          <button
            disabled={!!isLoggingIn}
            type="submit"
            className={`w-full bg-primary500 text-white py-3 rounded-lg font-bold flex items-center justify-center 
              ${isLoggingIn ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className=" size-6 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <p className=" text-center text-sm mt-4 text-[#645D5D]">
            Forgot Password?{" "}
            <Link to="/forgot-password">
              <span className=" text-[#C7C7CC] font-semibold">Recover</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

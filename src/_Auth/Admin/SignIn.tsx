import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    login();
    navigate("/");
  };

  return (
    <div className=" flex items-center max-h-[621px] max-w-[454px] ">
      <div className=" w-full h-full">
        {/*  */}
        <div>
          <h2 className="text-3xl text-[#1B1818] font-bold">Welcome back</h2>
          <p className=" mb-4 text-[#645D5D] text-sm">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className=" text-primary900">Sign up</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#101928] text-sm">
              Email Address
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              // required
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
          <div className="mb-4">
            <label className="block text-[#101928] text-sm">Password</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full mt-2 p-3 border rounded-lg"
              // required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary500 text-white py-3 rounded-lg font-bold"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

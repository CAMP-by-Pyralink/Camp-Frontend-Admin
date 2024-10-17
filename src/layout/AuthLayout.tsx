import { Outlet } from "react-router-dom";
import authBanner from "../assets/authimage.png";

// interface AuthLayoutProps {
//   children: React.ReactNode;
// }

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 flex">
        {/* Left side with illustration */}
        <div className="w-1/2 hidden md:block">
          <img
            src={authBanner}
            alt="Security Illustration"
            className="rounded-lg"
          />
        </div>
        {/* Right side - dynamic content */}
        <div className="w-full md:w-1/2 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

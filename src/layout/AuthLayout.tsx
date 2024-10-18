import { Outlet } from "react-router-dom";
import authBanner from "../assets/authimage.png";

const AuthLayout = () => {
  return (
    <div className=" h-full bg-white w-full flex items-center gap-32 p-12 rounded-lg">
      {/* Left side with illustration */}
      <div className="basis-1/2 w-[50%] h-screen">
        <img
          src={authBanner}
          alt="Security Illustration"
          className="rounded-lg w-full h-[901px] object-cover"
          style={{ maxHeight: "100vh" }}
        />
      </div>
      {/* Right side - dynamic content */}
      <div className="w-full basis-1/2">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

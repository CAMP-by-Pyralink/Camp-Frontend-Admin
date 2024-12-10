import authBanner from "../../assets/authimage.png";
import logo from "../../assets/svgs/camp-logo.svg";
import StepForm from "./StepForm";
const Onboarding = () => {
  return (
    <div className=" h-full bg-white w-full flex items-center gap-32 py-12 px-24 rounded-lg">
      {/* Left side with illustration */}
      <div className=" basis-1/2 h-screen relative">
        <img
          src={authBanner}
          alt="Security Illustration"
          className="rounded-lg w-[665px] h-[901px] object-cover"
          style={{ maxHeight: "100vh" }}
        />
        <div className=" absolute top-[8%] left-[10%] text-white flex flex-col m-0">
          <img src={logo} alt="" />
        </div>
      </div>
      {/* Right side - dynamic content */}
      <div className="w-full basis-1/2">
        <StepForm />
      </div>
    </div>
  );
};

export default Onboarding;

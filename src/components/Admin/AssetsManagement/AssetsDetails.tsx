import { Link } from "react-router-dom";

import AssetsDetailsTab from "./AssetsDetailsTab";
// import AssetsDetailsTab from "../../components/charts/AssetsDetailsTab";

const AssetsDetails = () => {
  const handleScrollTo = (section: string) => {
    // Scroll to the specified section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <h1 className=" mb-4">View Asset</h1>
      <div className="flex items-center gap-2 font-poppins mb-12">
        <Link to={"/"} className="text-sm font-medium text-[#282EFF]">
          Dashboard
        </Link>
        <p className=" text-[#98A2B3] font-medium h-5">/</p>
        <Link
          to={"/asset-management"}
          className="text-sm font-medium text-[#282EFF]"
        >
          Assets
        </Link>
        <p className=" text-[#98A2B3] font-medium h-5">/</p>
        <p className="text-sm font-medium text-[#898384]">Assets Details</p>
      </div>

      {/* tabs */}
      <div className=" mb-6">
        <AssetsDetailsTab />
      </div>

      <div className="shadow-[5px_5px_40px_rgba(107,151,255,0.3)] w-full p-[20px] bg-white">
        {/* <h1 className="text-[#333333] font-medium text-[24px]">
          Asset Name: Dell XPS 13 Plus (Py-MF-2031)
        </h1> */}
      </div>
    </div>
  );
};

export default AssetsDetails;

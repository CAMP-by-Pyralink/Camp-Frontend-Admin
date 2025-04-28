import { useEffect, useState } from "react";
import GeneralTab from "./GeneralTab";
import Warranty from "./Warranty";
import Parts from "./Parts";
import Logs from "./Logs";
import { useAssetsStore } from "../../../store/useAssetsStore";
import Loader from "../../../shared/Loader";
import TechnicalSpecs from "./TechnicalSpecs";

interface AssetsDetailsTabProps {
  id: string;
}

const AssetsDetailsTab = ({ id }: AssetsDetailsTabProps) => {
  const [activeTab, setActiveTab] = useState(0); // Start from 0 now
  const { getSingleAsset, singleAsset, isLoading } = useAssetsStore();

  useEffect(() => {
    const fetchAsset = async () => {
      await getSingleAsset(id);
    };
    fetchAsset();
  }, [getSingleAsset, id]);

  const steps = [
    "General",
    "Technical Specifications",
    "Warranty",
    "Parts/Boms",
    "Log",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <GeneralTab singleAsset={singleAsset} id={id} />;
      case 1:
        return <TechnicalSpecs singleAsset={singleAsset} />;
      case 2:
        return <Warranty singleAsset={singleAsset} />;
      case 3:
        return <Parts />;
      case 4:
        return <Logs singleAsset={singleAsset} />;
      default:
        return null;
    }
  };

  if (isLoading || !singleAsset) return <Loader />;

  return (
    <div className="bg-white py-10 font-poppins pr-40">
      {/* Stepper Tabs */}
      <div className="flex w-fit whitespace-nowrap rounded-lg overflow-hidden bg-white border border-[#E4E7EC] mb-6">
        {steps.map((label, idx) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === idx
                ? "bg-[#F0F2F5] text-[#344054] font-semibold shadow-sm"
                : "bg-white text-[#475367] hover:bg-gray-50 font-medium"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>

      {/* Tech Specification Section (if you still want it separately) */}
      <div id="specification" className="mt-10">
        {/* your tech specs content here (same as you had it) */}
      </div>
    </div>
  );
};

export default AssetsDetailsTab;

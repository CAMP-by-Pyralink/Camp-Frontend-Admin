import { useState } from "react";
import ScanNetwork from "../../../shared/ScanNetwork";
import UploadSuccessful from "./UploadSuccessful";
import Loader from "../../../shared/Loader";
import SuccessModal from "../../../_Auth/Admin/SucessModal";

const UserFlow = ({ onClose }) => {
  const [flowStage, setFlowStage] = useState("scanNetwork"); // Controls the flow stage

  const startScan = () => {
    setFlowStage("loading");
    console.log("loading");
    // Simulate network scan delay
    setTimeout(() => {
      setFlowStage("scanResults");
    }, 3000); // Adjust as needed
  };

  const uploadData = () => {
    setFlowStage("uploadSuccessful");
  };

  return (
    <>
      <div className=" absolute top-2 p-6 w-[532px] rounded-lg  text-center">
        <div className=" flex items-center justify-center mb-6">
          {flowStage === "scanNetwork" && <ScanNetwork startScan={startScan} />}
          {flowStage === "loading" && <Loader />}
          {flowStage === "scanResults" && (
            <SuccessModal onUpload={uploadData} />
          )}
          {flowStage === "uploadSuccessful" && <UploadSuccessful />}
        </div>
      </div>
    </>
  );
};

export default UserFlow;

import { useState } from "react";
import { Check, Network, FileUp } from "lucide-react";
import Loader from "../../../shared/Loader";
import scanIcon from "../../../assets/svgs/scan-network-icon.svg";
import closeIcon from "../../../assets/svgs/close.svg";
import uploadEmployeeIcon from "../../../assets/svgs/employees.svg";
import successIcon from "../.././../assets/svgs/successIcon.svg";

type ScanState = "initial" | "scanning" | "complete" | "upload-success";

const NetworkScanFlow = ({ onClose }: any) => {
  const [scanState, setScanState] = useState<ScanState>("initial");
  const [employeeCount, setEmployeeCount] = useState(0);

  const handleScan = () => {
    setScanState("scanning");
    // Simulate network scan
    setTimeout(() => {
      setEmployeeCount(880);
      setScanState("complete");
    }, 2000);
  };

  const handleUpload = () => {
    setScanState("upload-success");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-[#344054B2] flex items-center justify-center"
        style={{ backdropFilter: "blur(7px)" }}
      >
        {/* Modal Container */}
        <div className="bg-[#F7F9FC] w-fit px-12 py-8 rounded-lg shadow-lg relative">
          {/* Close Button */}
          <img
            src={closeIcon}
            className=" absolute  z-50 right-4 top-4 cursor-pointer"
            alt=""
            onClick={onClose}
          />

          {scanState === "initial" && (
            <>
              <div className="text-center flex flex-col items-center gap-4">
                <img src={scanIcon} alt="" />
                <h2 className="text-2xl font-semibold">Scan Network</h2>
                <p className="text-[#04012D] mb-4">
                  Scan through company’s network to add users
                </p>
              </div>
              <button
                onClick={handleScan}
                className="w-full min-w-[431px] bg-primary500  text-white py-4 rounded-lg font-semibold "
              >
                Scan
              </button>
            </>
          )}

          {scanState === "scanning" && (
            <div className="py-8 flex flex-col items-center justify-center">
              {/* <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" /> */}
              <Loader />
              <p className="text-2xl text-center font-medium mt-2">
                Scanning the network, <br /> please wait
              </p>
            </div>
          )}

          {scanState === "complete" && (
            <>
              <div className="pt-4 text-[#333333] mb-4 flex items-center flex-col justify-center ">
                <img src={uploadEmployeeIcon} alt="" />

                <h3 className="text-2xl font-semibold mt-4">{employeeCount}</h3>
                <p className="text-xl">employees found</p>
              </div>
              <button
                onClick={handleUpload}
                className="w-full min-w-[431px] bg-primary500 text-white py-4 rounded-lg font-semibold "
              >
                Upload
              </button>
            </>
          )}

          {scanState === "upload-success" && (
            <>
              <div className="mb-4 flex flex-col items-center ">
                <img
                  src={successIcon}
                  alt=""
                  className="  w-[60px] h-[60px] mb-4"
                />
                <h2 className="text-3xl text-[#454545] font-medium mb-2">
                  Upload successful
                </h2>
                <p className="text-[#04012D] font-medium mb-4">
                  You have Successfully added 128 users
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full min-w-[431px] bg-primary500 text-white py-4 rounded-lg font-semibold "
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkScanFlow;

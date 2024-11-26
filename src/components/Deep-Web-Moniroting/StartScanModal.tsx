import scanIcon from "../../assets/svgs/deep-search-data.svg";
import closeIcon from "../../assets/svgs/closeicongrey.svg";
import { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import { useNavigate } from "react-router-dom";
// const StartScanModal = () => {
// const [scanStarted, setScanStarted] = useState(false);
const StartScanModal: React.FC = () => {
  const [scanStarted, setScanStarted] = useState<boolean>(false); // Explicitly typed
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    let timer: number | undefined;

    if (scanStarted) {
      // Navigate after 5 seconds
      timer = setTimeout(() => {
        navigate("/scan-details"); // Replace "/next-page" with your desired route
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer); // Clean up the timer
      }
    };
  }, [scanStarted, navigate]);
  return (
    <div className="relative bg-white min-w-[476px] min-h-[372px] flex items-center justify-center  rounded-md p-8 ">
      {!scanStarted ? (
        <div className=" flex flex-col items-center gap-4">
          <img src={closeIcon} alt="" className=" absolute right-4 top-4" />
          <div className=" bg-blue50 w-[92px] h-[92px] rounded-full flex items-center justify-center">
            <img src={scanIcon} alt="" width={40} />
          </div>
          <h1 className=" text-2xl text-greyText">New Scan</h1>
          <input
            type="text"
            placeholder="Search"
            className=" border border-[#D0D5DD] rounded-md w-[374px] py-2 px-[16px] placeholder:text-sm placeholder:text-[#454545]"
          />
          <button
            className=" bg-primary500 py-2 px-6 rounded-lg text-white"
            onClick={() => setScanStarted(true)}
          >
            Start scanning
          </button>
        </div>
      ) : (
        <div className=" flex items-center justify-center w-full h-full ">
          <div className=" flex flex-col items-center gap-8">
            <div className=" bg-blue50 p-8 rounded-full">
              <Loader />
            </div>
            <h1>System is scanning, please wait</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartScanModal;

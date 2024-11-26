import { useState } from "react";
import scanIcon from "../../assets/svgs/deep-search-data.svg";
import ModalLayout from "../../shared/ModalLayout";
import StartScanModal from "./StartScanModal";

const ScanSearch = () => {
  const [startScan, setStartScan] = useState(false);
  return (
    <>
      {!startScan ? (
        <div className=" flex flex-col items-center gap-4">
          <div className=" bg-blue50 w-[288.25px] h-[288.25px] rounded-full flex items-center justify-center">
            <img src={scanIcon} alt="" />
          </div>
          <h1 className=" text-greyText">
            No scan yet, initiate your first scan
          </h1>
          <button
            className=" bg-primary500 py-2 px-6 rounded-lg text-white"
            onClick={() => setStartScan(true)}
          >
            Start scanning
          </button>
        </div>
      ) : (
        <div>
          <ModalLayout>
            <StartScanModal />
          </ModalLayout>
        </div>
      )}
    </>
  );
};

export default ScanSearch;

import { useState } from "react";
import RiskList from "../../components/Admin/RiskAssessment/RiskList";
import downArr from "../../assets/svgs/import-arr.svg";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import RiskRegisterForm from "../../components/Admin/RiskAssessment/RiskRegisterForm";
import ModalLayout from "../../shared/ModalLayout";
import UploadCsvModal from "../../shared/UploadCsvModal";
import AssestList from "../../components/Admin/AssetsManagement/AssetsList";
import downArrowIcon from "../../assets/svgs/downArrWhiteSolid.svg";
import QrCodeScan from "../../components/Admin/AssetsManagement/QrCodeScan";
import OnboardAssets from "../../components/Admin/AssetsManagement/OnboardAssets";

const AssetManagement = () => {
  const [riskRegisterModal, setRiskRegisterModal] = useState<boolean>(false);
  const [importCsv, setImportCsv] = useState(false);
  const [exportCsv, setExportCsv] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [manualAdd, setManualAdd] = useState(false);
  const [scanQr, setScanQr] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAdd = () => {
    // console.log("first");
    setRiskRegisterModal(true);
  };
  const handleFilterClick = () => {
    // Filter logic based on id
  };
  const handleClose = () => {
    setScanQr(false);
    setManualAdd(false);
  };

  const handleExportClick = () => {
    setImportCsv((prev) => !prev);
    setExportCsv((prev) => !prev);
  };
  return (
    <div>
      <div className=" flex justify-between mb-4">
        <div className=" text-greyText">
          <h1 className=" text-2xl  font-medium tracking-[-2%] leading-[28.8px]">
            Assets Management
          </h1>
          <p className=" text-sm">
            Create assets and assign to department/employee
          </p>
        </div>
        <div className=" flex items-center gap-4 ">
          <button className=" border border-black text-textColor font-medium py-2 px-4 flex items-center gap-1 rounded-lg">
            <img src={downArr} alt="" />
            Import csv
          </button>
          {/* Dropdown Button Wrapper */}
          <div className="relative">
            <button
              className="bg-primary500 py-[10px] text-center rounded-lg text-white w-[140px] cursor-pointer flex items-center justify-center gap-2"
              // onClick={handleAdd}
              onClick={toggleDropdown}
            >
              Add new
              <img src={downArrowIcon} alt="" />
            </button>
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-[82%] right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  className="w-full text-left px-4 py-2 border-b text-gray-700 hover:bg-blue50"
                  onClick={() => {
                    setIsOpen(false);
                    // handleManual();
                    setManualAdd(true);
                  }}
                >
                  Manual add
                </button>
                <button
                  className="w-full text-left px-4 py-2 border-b text-gray-700 hover:bg-blue50"
                  onClick={() => {
                    setIsOpen(false);
                    // setUploadCsv(true);
                    setScanQr(true);
                  }}
                >
                  Scan barcode
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={true}
      >
        {/* <RiskList /> */}
        <AssestList />

        {/* Your content */}
      </PagesHomeLayout>
      {/*  */}

      {/*  */}
      {manualAdd && (
        <ModalLayout>
          <OnboardAssets onClick={handleClose} />
        </ModalLayout>
      )}
      {scanQr && (
        <ModalLayout>
          <QrCodeScan onClose={handleClose} />
        </ModalLayout>
      )}
    </div>
  );
};

export default AssetManagement;

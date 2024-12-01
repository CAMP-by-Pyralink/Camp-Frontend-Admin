import { useState } from "react";
import RiskList from "../../components/Admin/RiskAssessment/RiskList";
import downArr from "../../assets/svgs/import-arr.svg";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import RiskRegisterForm from "../../components/Admin/RiskAssessment/RiskRegisterForm";
import ModalLayout from "../../shared/ModalLayout";
import UploadCsvModal from "../../shared/UploadCsvModal";
import HeaderTitle from "../../shared/HeaderTitle";

const RiskAssessment = () => {
  const [riskRegisterModal, setRiskRegisterModal] = useState<boolean>(false);
  const [importCsv, setImportCsv] = useState(false);
  const [exportCsv, setExportCsv] = useState(false);
  const handleAdd = () => {
    // console.log("first");
    setRiskRegisterModal(true);
  };
  const handleFilterClick = () => {
    // Filter logic based on id
  };

  const handleExportClick = () => {
    setImportCsv((prev) => !prev);
    setExportCsv((prev) => !prev);
  };
  return (
    <div>
      <div className=" flex justify-between mb-">
        {/* <div className=" text-greyText">
          <h1 className=" text-2xl  font-medium tracking-[-2%] leading-[28.8px]">
            Risk Assessment
          </h1>
          <p className=" text-sm">Register and assign risk</p>
        </div> */}
        <HeaderTitle
          title="Risk Assessment"
          subTitle="Register and assign risk"
        ></HeaderTitle>
        <div className=" flex items-center gap-4 ">
          <button className=" border border-black text-textColor font-medium py-2 px-4 flex items-center gap-1 rounded-lg">
            <img src={downArr} alt="" />
            Import csv
          </button>
          <button
            className=" text-white rounded bg-primary500  py-2 px-8"
            onClick={handleAdd}
          >
            Add new
          </button>
          {/* <Button onClick={handleAdd} label="Add New" /> */}
        </div>
      </div>
      {/*  */}
      <PagesHomeLayout
        onFilterClick={handleFilterClick}
        onExportClick={handleExportClick}
        showFilter={true}
        showExport={true}
      >
        <RiskList />

        {/* Your content */}
      </PagesHomeLayout>
      {/*  */}
      {riskRegisterModal && (
        <ModalLayout>
          <RiskRegisterForm setRiskRegisterModal={setRiskRegisterModal} />
        </ModalLayout>
      )}
      {/*  */}
      {importCsv && (
        <ModalLayout>
          <UploadCsvModal onClose={handleExportClick} />
        </ModalLayout>
      )}
      {exportCsv && (
        <ModalLayout>
          <UploadCsvModal onClose={handleExportClick} />
        </ModalLayout>
      )}
    </div>
  );
};

export default RiskAssessment;

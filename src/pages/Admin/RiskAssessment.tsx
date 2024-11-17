import { useState } from "react";
import RiskList from "../../components/Admin/RiskAssessment/RiskList";
import Button from "../../shared/Button";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import RiskRegisterForm from "../../components/Admin/RiskAssessment/RiskRegisterForm";
import ModalLayout from "../../shared/ModalLayout";
import UploadCsvModal from "../../shared/UploadCsvModal";

const RiskAssessment = () => {
  const [riskRegisterModal, setRiskRegisterModal] = useState<boolean>(false);
  const [importCsv, setImportCsv] = useState(false);
  const handleAdd = () => {
    // console.log("first");
    setRiskRegisterModal(true);
  };
  const handleFilterClick = () => {
    // Filter logic based on id
  };

  const handleExportClick = () => {
    setImportCsv(true);
  };
  return (
    <div>
      <div className=" flex justify-between mb-4">
        <div className=" text-greyText">
          <h1 className=" text-2xl  font-medium tracking-[-2%] leading-[28.8px]">
            Risk Assessment
          </h1>
          <p className=" text-sm">Register and assign risk</p>
        </div>
        <div className=" flex items-center gap-4 ">
          <button className=" border border-black rounded  py-2 px-4">
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
        showExport={false}
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
          <UploadCsvModal />
        </ModalLayout>
      )}
    </div>
  );
};

export default RiskAssessment;

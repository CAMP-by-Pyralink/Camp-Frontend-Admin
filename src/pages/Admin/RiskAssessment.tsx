import { useState } from "react";
import RiskList from "../../components/Admin/RiskAssessment/RiskList";
import downArr from "../../assets/svgs/import-arr.svg";
import PagesHomeLayout from "../../shared/PagesHomeLayout";
import RiskRegisterForm from "../../components/Admin/RiskAssessment/RiskRegisterForm";
import ModalLayout from "../../shared/ModalLayout";
import UploadCsvModal from "../../shared/UploadCsvModal";
import HeaderTitle from "../../shared/HeaderTitle";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";
import LockedPage from "../../shared/LockedPage";

// Define FilterConfig interface
interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: { label: string; value: string }[]; // Only for "select" type
}

interface SelectedFilters {
  category: string;
  department: string;
  status: string;
}

const RiskAssessment = () => {
  const [riskRegisterModal, setRiskRegisterModal] = useState<boolean>(false);
  const [importCsv, setImportCsv] = useState(false);
  const [exportCsv, setExportCsv] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const locked = false;

  // State to hold the selected filter values
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    department: "",
    status: "",
  });

  // Define your filters array
  const filters: FilterConfig[] = [
    {
      key: "department",
      label: "Department",
      type: "select", // Correct type here
      options: [
        { label: "IT", value: "it" },
        { label: "Management", value: "management" },
        // { label: "Marketing", value: "marketing" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Mitigated", value: "mitigated" },
        // { label: "Not Started", value: "not_started" },
      ],
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "Operational", value: "operational" },
        { label: "Cybersecurity", value: "cybersecurity" },
        // { label: "Not Started", value: "not_started" },
      ],
    },
    // {
    //   key: "dateAdded",
    //   label: "Date Added",
    //   type: "date",
    // },
  ];

  const handleAdd = () => {
    // console.log("first");
    setRiskRegisterModal(true);
  };
  const handleFilterClick = () => {
    setIsFilterModalOpen((prev) => !prev);
    console.log("Filter button clicked");
  };

  const handleFilterChange = (key: string, value: string) => {
    // Update selected filter value based on key (filter)
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleExportClick = () => {
    setImportCsv((prev) => !prev);
    setExportCsv((prev) => !prev);
  };

  if (locked) {
    return <LockedPage />;
  }
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
        searchTerm=""
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
          <UploadCsvModal
            onClose={handleExportClick}
            type={""}
            onCreate={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </ModalLayout>
      )}
      {exportCsv && (
        <ModalLayout>
          <UploadCsvModal
            onClose={handleExportClick}
            type={""}
            onCreate={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </ModalLayout>
      )}
      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          handleFilterClick={() => setIsFilterModalOpen(false)} // Close filter modal
          onApplyFilters={(filters) => console.log(filters)} // Log selected filters
          selectedFilters={selectedFilters} // Pass selected filters
          handleFilterChange={handleFilterChange} // Handle filter value changes
        />
      )}
    </div>
  );
};

export default RiskAssessment;

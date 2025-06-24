import { useEffect, useState } from "react";
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
import HeaderTitle from "../../shared/HeaderTitle";
import FilterModal from "../../components/Admin/UserManagement/FilterModal";
import LockedPage from "../../shared/LockedPage";
import { Link } from "react-router-dom";
import { useAssetsStore } from "../../store/useAssetsStore";

// Define FilterConfig interface
interface FilterConfig {
  key: string;
  label: string;
  type: "select" | "date" | "text"; // Only allow these types
  options?: { label: string; value: string }[]; // Only for "select" type
}

interface SelectedFilters {
  department: string;
  status: string;
}

const AssetManagement = () => {
  const [riskRegisterModal, setRiskRegisterModal] = useState<boolean>(false);
  const [importCsv, setImportCsv] = useState(false);
  const [exportCsv, setExportCsv] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [manualAdd, setManualAdd] = useState(false);
  const [scanQr, setScanQr] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const locked = false;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // State to hold the selected filter values
  const [selectedFilters, setSelectedFilters] = useState({
    department: "",
    status: "",
  });

  const { getAllAsset, assets } = useAssetsStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    getAllAsset("1", debouncedSearch);
  }, [debouncedSearch]);

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
  const handleClose = () => {
    setScanQr(false);
    setManualAdd(false);
  };

  const handleExportClick = () => {
    setImportCsv((prev) => !prev);
    setExportCsv((prev) => !prev);
  };

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

  if (locked) {
    return <LockedPage />;
  }
  return (
    <div>
      <div className=" flex justify-between mb-">
        {/* <div className=" text-greyText">
          <h1 className=" text-2xl  font-medium tracking-[-2%] leading-[28.8px]">
            Assets Management
          </h1>
          <p className=" text-sm">
            Create assets and assign to department/employee
          </p>
        </div> */}
        <HeaderTitle
          title="Assets Management"
          subTitle="Create assets and assign to department/employee"
        ></HeaderTitle>
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
                <Link to="/assets/add-asset">
                  <button
                    className="w-full text-left px-4 py-2 border-b text-gray-700 hover:bg-blue50"
                    onClick={() => {
                      setIsOpen(false);
                      // handleManual();
                      // setManualAdd(true);
                    }}
                  >
                    Manual add
                  </button>
                </Link>
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
        searchTerm={searchTerm} // Add this missing prop
        onSearch={(value) => setSearchTerm(value)}
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
      {/*  */}
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

export default AssetManagement;
